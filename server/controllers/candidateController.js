const {v4 : uuid} = require("uuid")
const cloudinary = require('../utils/cloudinary')
const path = require("path")
const fs = require("fs")
const ElectionModel = require('../models/electionModel')
const CandidateModel = require('../models/candidateModel')
const VoterModel = require('../models/voterModel')
const HttpError = require("../models/ErrorModel")
const mongoose = require("mongoose")

//  Add candidate
// POST: api/candidates
// protected (only admin)
const addCandidate = async(req, res, next) => {
    try {
        // only admin can add candidate
        if(!req.user.isAdmin) {
            return next(new HttpError("only admin can perform this action.", 403))
        }
        
        const {fullName, motto, currentElection} = req.body;
        
        // Validate all required fields
        if(!fullName || !motto || !currentElection) {
            return next(new HttpError("fill in all fields", 422))
        }
        
        // Check if files exist
        if(!req.files || !req.files.image) {
            return next(new HttpError("choose an image", 422))
        }
        
        const {image} = req.files;
        
        // check file size
        if(image.size > 1000000) {
            return next(new HttpError("image size should be less than 1mb", 422))
        }
        
        // Verify election exists
        const electionExists = await ElectionModel.findById(currentElection);
        if(!electionExists) {
            return next(new HttpError("Election not found", 404))
        }
        
        // rename the image
        let fileName = image.name;
        fileName = fileName.split(".")
        fileName = fileName[0] + uuid() + "." + fileName[fileName.length - 1]
        
        // upload file to uploads folder in project
        image.mv(path.join(__dirname, "..", 'uploads', fileName), async(err) => {
            if(err) {
                return next(new HttpError(err))
            }
            
            let sess;
            try {
                // store image on cloudinary
                const result = await cloudinary.uploader.upload(
                    path.join(__dirname, "..", 'uploads', fileName), 
                    {resource_type: "image"}
                )
                
                if(!result.secure_url) {
                    return next(new HttpError("could not upload image to cloudinary"))
                }
                
                // Delete local file after cloudinary upload (optional cleanup)
                const localFilePath = path.join(__dirname, "..", 'uploads', fileName);
                if(fs.existsSync(localFilePath)) {
                    fs.unlinkSync(localFilePath);
                }
                
                // START TRANSACTION BEFORE creating anything
                sess = await mongoose.startSession();
                sess.startTransaction();
                
                // Create candidate within transaction
                const newCandidate = await CandidateModel.create([{
                    fullName,
                    motto,
                    image: result.secure_url, 
                    election: currentElection
                }], {session: sess});  // Pass session during create
                
                // Get election and push candidate ID (not whole object)
                const election = await ElectionModel.findById(currentElection).session(sess);
                election.candidates.push(newCandidate[0]._id);  // Push only the ID
                await election.save({session: sess});
                
                // Commit transaction
                await sess.commitTransaction();
                sess.endSession();
                
                res.status(201).json({
                    message: "Candidate added successfully",
                    candidate: newCandidate[0]
                });
                
            } catch(error) {
                // Abort transaction on error
                if(sess) {
                    await sess.abortTransaction();
                    sess.endSession();
                }
                return next(new HttpError(error))
            }
        })
        
    } catch(error) {
        return next(new HttpError(error))
    }
}



//  get candidate
// GET: api/candidates/:id
// protected 
const getCandidate= async(req, res,next)=>{
    try{
        const {id} =req.params;
        const candiadte= await CandidateModel.findById(id)
         res.json("get candidate")
    } catch(error) {
        return next(new HttpError(error))
    }
   
}


// delete candidate
// DELETE: api/candidates/:id
// protected (only admin)
const removeCandidate= async(req, res,next)=>{
    try{
    // only admin can add candidate
        if(!req.user.isAdmin) {
            return next(new HttpError("only admin can perform this action.", 403))
        }
    const {id} =req.params;
    let currentCandidate= await CandidateModel.findById(id).populate('election')
    if(!currentCandidate){
        return next(new HttpError("could not delete candidate",422))
    } else{
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await currentCandidate.deleteOne({session:sess})
        currentCandidate.election.candidates.pull(currentCandidate);
        await currentCandidate.election.save({session:sess})
        await sess.commitTransaction()
        res.status(200).json("Candidate deletd succesfully")

    }
} catch (error){
    return next(new HttpError(error))
}
}



//  vote candidate
// PATCH: api/candidates
// protected 
const voteCandidate= async(req, res,next)=>{
    try{
        const {id: candidateId} =req.params;
        const {currentVoterId, selectedElection} = req.body;
        // get the candidate
        const candiadte= await CandidateModel.findById(newCandidateId);
        const newVoteCount =candiadte.voteCount +1;
        // update candiate votes
        await CandidateModel.findByIdAndUpdate(candidateId,{voteCount: newVoteCount}, {new:true})
        // start session for relationship
        const sess= await mongoose.startSession()
        sess.startTransaction();
        // get the current voter
        let voter = await VoterModel.finedById(currentVoterId)
        await voter.save({session: sess})
        // get selected eelction
        let election = await ElectionModel.findById(selectedElection);
        election.voters.push(voter);
        voter.votedElections.push(election);

    } catch{
        return next(new HttpError(error))
    }
    
}

module.exports ={addCandidate,getCandidate,removeCandidate,voteCandidate}