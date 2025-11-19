const {v4 : uuid} =require("uuid")
const cloudinary = require('../utils/cloudinary')
const path = require("path")
const fs = require("fs")
const ElectionModel = require('../models/electionModel')
const CandidateModel = require('../models/candidateModel')

const HttpError =require("../models/ErrorModel")
// add new election
// POST: api/elections
// protected (only admin)
const addElection= async(req, res,next)=>{
   
    try{
        // only admin cand add  eletion
    if(!req.user.isAdmin){
        return next(new HttpError("only admin can perform this action.",403))
    }

    const {title ,description} = req.body;
    if(!title || !description){
        return next(new HttpError("fill al fields", 422))
    }
    if(!req.files || !req.files.thumbnail){
        return next(new HttpError("choose a thumbnail",422))
    }
    const {thumbnail} = req.files;
    // image should be less than 2MB
    if(thumbnail.size > 2_000_000){
        return next(new HttpError("file size too big. should be less than 2MB",422))
    }
    
    let fileName = thumbnail.name;
    fileName = fileName.split(".")
    fileName= fileName[0] + uuid() +"." +fileName[fileName.length - 1]
    const uploadPath = path.join(__dirname, "..", 'uploads', fileName)
    
    try {
        // Save file to uploads folder
        await new Promise((resolve, reject) => {
            thumbnail.mv(uploadPath, (err) => {
                if(err) return reject(err)
                resolve()
            })
        })
        
        // Upload to cloudinary
        const result = await cloudinary.uploader.upload(uploadPath, {
            folder: "elections",
            resource_type: "auto"
        });
        
        console.log('Cloudinary upload result:', result);
        
        if(!result || !result.secure_url){
            return next(new HttpError("couldn't upload image to cloudinary",422))
        }
        
        // Clean up local file
        fs.unlinkSync(uploadPath);

        // save election to db
        const newElection = await ElectionModel.create({title, description, thumbnail: result.secure_url})
        return res.status(201).json(newElection)
    } catch(err){
        return next(new HttpError(err.message || err, 500))
    }
    
      } catch(error){
        return next(new HttpError(error))

}
}

    
// get all  election
// POST: api/elections
// protected (only admin)
const getElections= async(req, res,next)=>{
    try{
        const elections = await ElectionModel.find();
        res.status(200).json(elections)
    } catch(error){
        return next(new HttpError(error))
    }
}

 
// get single election
// GET: api/elections/:id
// protected (only admin)
const getElection= async(req, res,next)=>{
    try{
        const {id} = req.params;
        const election = await ElectionModel.findById(id);
        res.status(200).json(election)
    } catch(error){
        return next(new HttpError(error))
    }

    
}

// get election candiadte
// GET: api/elections/id/candidates
// protected (only admin)
const getCandidatesOfElection= async(req, res,next)=>{
    try{
        const {id} =req.params;
        const candidates = await CandidateModel.find({election: id})
        res.status(200).json(candidates)
    } catch(error){
        return next(new HttpError(error))
    }
   
}

// get voters of election
// GET: api/elections/:id/voters
// protected (only admin)
const getElectionVoters= async(req, res,next)=>{
    try{
        const {id} =req.params;
        console.log("getElectionVoters called with id:", id);
        
        // Validate if id is a valid MongoDB ObjectId
        if(!id.match(/^[0-9a-fA-F]{24}$/)){
            console.log("Invalid ObjectId format");
            return next(new HttpError("Invalid election ID", 400));
        }
        
        console.log("Finding election with id:", id);
        const election = await ElectionModel.findById(id).populate('voters');
        console.log("Election found:", election ? "yes" : "no");
        
        if(!election){
            console.log("Election not found");
            return next(new HttpError("Election not found", 404));
        }
        
        const voters = election.voters || [];
        console.log("Voters count:", voters.length);
        res.status(200).json(voters);
    } catch(error){
        console.error("Error in getElectionVoters:", error.message);
        console.error("Stack:", error.stack);
        return next(new HttpError(error.message || "Failed to fetch voters", 500));
    }
}
// delete candiadte
// DELETE: api/elections/:id
// protected (only admin)
const removeElection= async(req, res,next)=>{
    try{
        // only admin cand add  eletion
    if(!req.user.isAdmin){
        return next(new HttpError("only admin can perform this action.",403))
    }
        const {id} =req.params;
        // actually delete the election document
        await ElectionModel.findByIdAndDelete(id);
        // delete candidates that belong to this election
        await CandidateModel.deleteMany({election:id})
        res.status(200).json("Election deleted successfully")
    } catch(error){
        return next(new HttpError(error))
    }
}

// update election
// PATCH: api/elections/:id
// protected (only admin)
const updateElection= async(req, res,next)=>{
    try{
        // only admin cand add  eletion
    if(!req.user.isAdmin){
        return next(new HttpError("only admin can perform this action.",403))
    }
   const {id} =req.params;
   const {title,description} = req.body;
   if(!title || !description){
    return next(new HttpError("fill in all fields",422))
   }
   // if a new thumbnail is provided, upload it and update thumbnail url
   if(req.files && req.files.thumbnail){
    const {thumbnail} = req.files;
    if(thumbnail.size > 2_000_000){
        return next (new HttpError("image size too big. should be less than 2MB",422))
    }
    let fileName = thumbnail.name;
    fileName = fileName.split(".")
    fileName= fileName[0] + uuid() +"." +fileName[fileName.length - 1]
    const uploadPath = path.join(__dirname, "..", 'uploads', fileName)
    try{
        await new Promise((resolve, reject) => {
            thumbnail.mv(uploadPath, (err) => {
                if(err) return reject(err)
                resolve()
            })
        })
        const result = await cloudinary.uploader.upload(uploadPath, {resource_type:"image"})
        if(!result || !result.secure_url){
            return next(new HttpError("image upload to cloudinary failed",422))
        }
        const updated = await ElectionModel.findByIdAndUpdate(id, {title, description, thumbnail: result.secure_url}, {new: true})
        return res.status(200).json(updated)
    } catch(err){
        return next(new HttpError(err.message || err, 500))
    }
   }

   // no thumbnail provided, just update title and description
   const updated = await ElectionModel.findByIdAndUpdate(id, {title, description}, {new: true})
   return res.status(200).json(updated)
 } catch(error){
    return next(new HttpError(error))
 }
}


module.exports ={addElection,getElection,getElections,updateElection,removeElection,getCandidatesOfElection,getElectionVoters}
