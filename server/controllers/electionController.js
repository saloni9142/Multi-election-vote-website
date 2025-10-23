const {v4 : uuid} =require("uuid")
const cloudinary = require('../utils/cloudinary')
const path = require("path")
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
    console.log("========= DEBUG START =========");
        console.log("req.body:", req.body);
        console.log("req.files:", req.files);
        console.log("Content-Type:", req.headers['content-type']);
        console.log("========= DEBUG END =========");

    const {title ,description} = req.body;
   console.log("req.body:", req.body);
    if(!title || !description){
        return next(new HttpError("fill al fields", 422))
    }
    if(!req.files || !req.files.thumbnail){
        return next(new HttpError("choose a thumbnail",422))
    }
    const {thumbnail} = req.files;
    // image should be less than 1mb
    if(thumbnail.size > 2000000){
        return next(new HttpError("file size too big. should be less than 1mb"))
    }
    // rename the image
    let fileName = thumbnail.name;
    fileName = fileName.split(".")
    fileName= fileName[0] + uuid() +"." +fileName[fileName.length - 1]
    // upload file  to uploads folder in project
 thumbnail.mv(path.join(__dirname, ".", 'uploads', fileName), 
    async (err) =>{
        if(err){
            return next(new HttpError(err))
        }
        // store image on cloudinary
        const result = await cloudinary.uploader.upload(path.join(__dirname, ".",
            "uploads", fileName),{resource_type:"image"})
            if(!result.secure_url){
                return next(new HttpError("could upload image to cloudinary",422))
            }
            // save election to db
            const newElection = await ElectionModel.create({title, description,
                thumbnail: result.secure_url})
                res.json(newElection)
            })
    



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
        const election = await ElectionModel.findById(id)
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
        const response = await ElectionModel.findById(id).populate('voters')
        res.status(200).json(response.voters)
    } catch(error){
        return next(new HttpError(error))
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
        await ElectionModel.findByIdAndUpdate(id);
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
   if(req.files.thumbnail){
    const {thumbnail} =req.files;
    // image size should be less than 1mb
    if(thumbnail.size > 1000000){
        return next (new HttpError("image size too big.should be less than 1mb",422))
    }
    // rename the image
    let fileName = thumbnail.name;
    fileName = fileName.split(".")
    fileName= fileName[0] + uuid() +"." +fileName[fileName.length - 1]
    thumbnail.mv(path.join(__dirname, "..", 'uploads', fileName), async (err) =>{
        if(err){
            return next(new HttpError(err))
        }
        // store image on cloudinary
        const result = await cloudinary.uploader.upload(path.join(__dirname, "..",
            "uploads", fileName), {resource_type:"image"})
            // check if cloudinary storage was succesfully
            if(!result.secure_url){
                return next(new HttpError("image upload to cloudinary was not found",422))
            }

            await ElectionModel.findByIdAndUpdate(id,{title, description,thumbnail:result.secure_url})
            res.json("election upload successfully",200)

    })
   }
 } catch(error){
    return next(new HttpError(error))
 }
}


module.exports ={addElection,getElection,getElections,updateElection,removeElection,getCandidatesOfElection,getElectionVoters}
