import React from 'react'
import {  candidates as dummyCandidates } from '../data'
import { useParams } from 'react-router-dom'
import Candidate from '../components/Candidate'
import ConfirmVote from '../components/ConfirmVote'
import { useSelector } from 'react-redux'

const Candidates=()=> {
  const {id} =useParams()

  const voteCandidateModalShowing= useSelector(state=> state.ui.voteCandidateModalShowing)
  // get candidtes that belong to the elctions
  const candidates = dummyCandidates.filter(candidate =>candidate.elections===id)
  return (
    <>
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
  { voteCandidateModalShowing &&<ConfirmVote/>} 
   </>
  )
}

export default Candidates