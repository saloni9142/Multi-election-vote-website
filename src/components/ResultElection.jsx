import React, { useState } from 'react'

const ResultElection= ({id, thumbnail,title})=>{
    const[totalVotes, setTotalVotes ] = useState(521)

    // get candidates that belong to this election iteration
    const electionCandidates=candidates.filter(candidate=>{
        return candidate.election==id
    })

}
  return (
   <article className='result'>
    <header className='result_header'>
        <h4>{title}</h4>
        <div className='result_header-image'>
            <img src="{thumbnail}" alt="{title}" />
        </div>
        <ul className='result_list' >
            {
              eletionCandidates.map(candidate=><CandidateRating key={candidate.id}{...candidate}/>)
            }
        </ul>

    </header>
   </article>
    
  )

export default ResultElection