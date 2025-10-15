//  Add candidate
// POST: api/candidates
// protected (only admin)
const addCandidate= (req, res,next)=>{
    res.json("add candidate")
}


//  get candidate
// GET: api/candidates/:id
// protected 
const getCandidate= (req, res,next)=>{
    res.json("get candidate")
}


// delete candidate
// DELETE: api/candidates/:id
// protected (only admin)
const removeCandidate= (req, res,next)=>{
    res.json("delete candidate")
}


//  vote candidate
// PATCH: api/candidates
// protected 
const voteCandidate= (req, res,next)=>{
    res.json("vote candidate")
}

module.exports ={addCandidate,getCandidate,removeCandidate,voteCandidate}