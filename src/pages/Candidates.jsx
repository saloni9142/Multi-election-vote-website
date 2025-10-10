import React from 'react'
import {  candidates as dummyCandidates } from '../data'
import { useParams } from 'react-router-dom'
import Candidate from '../components/Candidate'

const Candidates=()=> {
  const {id} =useParams()
  // get candidtes that belong to the elctions
  const candidates = dummyCandidates.filter(candidate =>candidate.elections===id)
  return (
   <section className='candidates'>
    <header className='candidates_header'>
      <h1>vote your candidtes</h1>
      <p>these are the candidates for the selected elction. please vote once and wisely,</p>
    </header>
    <div className='container candidates_container'>
      {
        candidates.map(candidate=> <Candidate key={candidate.id} {...candidate}/>)
      }
    </div>
   </section>
  )
}

export default Candidates