const bcrypt =require('bcryptjs')
const jwt = require('jsonwebtoken')
const VoterModel= require('../models/voterModel')
const HttpError= require('../models/ErrorModel')

// register new voter

// POST: api/voters/register
// unprotected
const registerVoter = async(req, res,next)=>{
    try{
        const {fullName, email, password, password2}= req.body;
        if(!fullName || !email || !password || !password2){
            return next(new HttpError('fill in all fields', 422))
        }
        // make all emails lowercased
        const newEmail = email.toLowerCase()
        // /check if the email alraedy exits in db
        const emailExits = await VoterModel.findOne({email: newEmail})
if(emailExits){
            return next(new HttpError ("Email already exist.", 422))
        }
//  make sure password 6+ characters
if((password.trim().length) <6){
    return next(new HttpError("password should be at least 6 charcters.",422))
}

// make sure paswords match
if(password  !== password2){
      return next(new HttpError("password do not match.",422))
}
// hash password
const salt= await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

// no user/voter should be admin except for one with email "achiever@gmail.com"
  let isAdmin = false;
  if(newEmail=== "saloni@gmail.com"){
    isAdmin = true
  }
//   save new voter to db
const newVoter = await VoterModel.create({fullName, email: newEmail, password: hashedPassword, isAdmin})
res.status(201).json(`New voter ${fullName} created.`)


    } catch (error){
        console.log("error details: error");
        console.log("Error message:", error.message); 
return next(new HttpError("voter registration failed.",422))
}

}


// function to generate token
const generateToken =(payload) =>{
    const token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:"2d"})
    return token;
}

// login  voter
// POST: api/voters/login
// unprotected
const loginVoter = async(req, res,next)=>{
   try{
    const{email, password} =req.body;
    if(!email || !password){
        return next(new HttpError("fill in all fields", 422))
    }
    const newEmail = email.toLowerCase()
    const voter= await VoterModel.findOne({email: newEmail})
    if(!voter){
        return next(new HttpError("invalid credentials",422))
    }
    // compare passwords
    const comparePass= await bcrypt.compare(password, voter.password)
    if(!comparePass){
        return next(new HttpError("Invalid credentials",422))
    }
    const {_id: id, isAdmin, votedElection}=voter;
    const token= generateToken({id, isAdmin})
    res.json({token, id, votedElection, isAdmin})


   } catch(error){
    return next(new HttpError("login failed. Please check your credentials or try again later.",422))
   }
}




// get voter
// GET: api/voters/:id 
// protected
const getVoter = async(req, res,next)=>{
    try{
        const {id} =req.params;
        const voter = await VoterModel.findById(id).select("-password")
        res.json(voter)

    } catch(error){
        return next (HttpError("could not get the voter"))
    }
}



module.exports= {registerVoter,loginVoter,getVoter}