// add new election
// POST: api/elections
// protected (only admin)
const addElection= (req, res,next)=>{
    res.json("Add Election")
}

// get elections election
// POST: api/elections
// protected (only admin)
const getElections= (req, res,next)=>{
    res.json("get all Elections")
}


// get single election
// GET: api/elections/:id
// protected (only admin)
const getElection= (req, res,next)=>{
    res.json("get single Election")
}

// get election candiadte
// GET: api/elections/id/candidates
// protected (only admin)
const getCandidatesOfElection= (req, res,next)=>{
    res.json("get candidates of election")
}

// get voters of election
// GET: api/elections/:id/voters
// protected (only admin)
const getElectionVoters= (req, res,next)=>{
    res.json("get election voter")
}
// delete candiadte
// DELETE: api/elections/:id
// protected (only admin)
const removeElection= (req, res,next)=>{
    res.json("Delete election")
}

// update election
// PATCH: api/elections/:id
// protected (only admin)
const updateElection= (req, res,next)=>{
    res.json("Update election")
}

module.exports ={addElection,getElection,getElections,updateElection,removeElection,getCandidatesOfElection,getElectionVoters}