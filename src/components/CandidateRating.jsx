import React from 'react'

const CandidateRating=({fullName, image, voteCount, totalVotes})=> {
  return (
    <li className='result_candidate'>
        <div className='result_candidate-image'>
            <img src={image} alt={fullName} />
        </div>
        <div className='result_candidate-info'>
            <h5>{fullName}</h5>
            <small>{`${voteCount} ${voteCount==1? "vote": "votes"}`}</small>
        </div>
    </li>
  )
}

export default CandidateRating