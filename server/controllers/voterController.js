// register new voter
// POST: api/voters/register
// unprotected
const registerVoter = async(req, res,next)=>{
    res.json("Register Voter")
}


// login  voter
// POST: api/voters/login
// unprotected
const loginVoter = async(req, res,next)=>{
    res.json("login Voter")
}

// get voter
// GET: api/voters/:id 
// protected
const getVoter = async(req, res,next)=>{
    res.json("get Voter")
}



module.exports= {registerVoter,loginVoter,getVoter}