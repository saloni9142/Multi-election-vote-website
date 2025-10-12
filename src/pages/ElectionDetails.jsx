import React from 'react'
import{elections} from '../data'

import { candidates } from '../data'
import { voters } from '../data'
import {useParams} from 'react-router-dom'
import ElectionCandidate from '../components/ElectionCandidate'

const ElectionDetails=()=> {
  const {id} =useParams()
  const currentElection = elections.find(election => election.id==id)
  const electionCandidates= candidates.filter(candidate=>candidate.elections==id)
  return (
  <section className='electionDetails'>
    <div className='container electionDetails_container'>
      <h2>{currentElection.title}</h2>
      <p>{currentElection.description}</p>
      <div className='electionDetails_image'>
        <img src={currentElection.thumbnail} alt={currentElection.title} />
      </div>
      <menu className='electionDetails_candidates'>
        {
          electionCandidates.map(candidate=><ElectionCandidate key={candidate.id} {...candidate}/>)
        }
      </menu>
      <menu className='voters'>
        <h2>Voters</h2>
        <table className='voters_table'>
          <thead>
            <tr>
              <th>full name</th>
              <th>Email Address</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>{
          voters.map(voter=><tr>
              <td><h5>{voter.fullName}</h5></td>
              <td>{voter.email}</td>
              <td>14:43:34</td>
            </tr>)
}
          </tbody>
        </table>
      </menu>

    </div>
  </section>
  )
}

export default ElectionDetails