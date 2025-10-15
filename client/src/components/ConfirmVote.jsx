import React, { useEffect, useState } from 'react'
import {candidates} from '../data'
import Candidate from './Candidate'
import {useDispatch, useSelector} from "react-redux"
import {uiActions} from '../store/ui-slice'

const ConfirmVote=()=> {
    const [modalCandidate, setModalCandidate]= useState({})

    const dispatch = useDispatch();
// close confirm vote modal
    const closeCandidateModal=() =>{
      dispatch(uiActions.closeVoteCandidateModal())
    }
// get selected candidate id from redux store
const selectedVoteCandidate=useSelector(state=> state.vote.selectedVoteCandidate)


    // get the selected candidate
    const fetchCandidate=()=>{
      candidates.find(candidate =>{
        if(candidate.id==selectedVoteCandidate){
          setModalCandidate(candidate)
        }
      })
    }

useEffect(()=>{
  fetchCandidate()
},[])

  return (
    <section className='modal'>
      <div className='modal_content confirm_vote-content'>
        <h5>Plaese confirm your vote</h5>
        <div className='confirm_vote-image'>
          <img src={modalCandidate.image} alt={modalCandidate.fullName} />
        </div>
        <h2>{modalCandidate?.fullName?.length > 17 ? modalCandidate.fullName?.substring(0,17)+ "..." : modalCandidate?.fullName}</h2>
        <p>{modalCandidate?.motto?.length > 45 ? modalCandidate.motto?.substring(0,45)+ "..." : modalCandidate?.motto}</p>
        <div className='confirm_vote-cta'>
          <button className='btn' onClick={closeCandidateModal}>cancel</button>
         
            <button className='btn primary'>confirm</button>
        </div>
      </div>
    </section>
   
  )
}

export default ConfirmVote