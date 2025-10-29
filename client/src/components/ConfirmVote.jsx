import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import {uiActions} from '../store/ui-slice'
import axios from 'axios'
import { voteActions } from '../store/vote-slice'
import {useNavigate} from 'react-router-dom'

const ConfirmVote = ({ selectedElection }) => {  
    const [modalCandidate, setModalCandidate] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    // close confirm vote modal
    const closeCandidateModal = () => {
      dispatch(uiActions.closeVoteCandidateModal())
    }
    
    // get selected candidate id from redux store
    const selectedVoteCandidate = useSelector(state => state.vote.selectedVoteCandidate)
    const token = useSelector(state => state?.vote?.currentVoter?.token)
    const currentVoter = useSelector(state => state?.vote?.currentVoter)

    console.log('Selected Candidate:', selectedVoteCandidate)
    console.log('Selected Election:', selectedElection)  // ← Now this will work

    // get the candidate selected to be vote
    const fetchCandidate = async() => {
      try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/candidates/${selectedVoteCandidate}`,
           {withCredentials:true, headers:{Authorization: `Bearer ${token}`}} )
           setModalCandidate(response.data)

      } catch(error) {
        console.log(error);
        setError("Failed to fetch candidate details")
      }
    }
    
    // confirm vote for selected candidate
    const confirmVote = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Validate required data
        if (!selectedElection) {
          setError("Election information is missing. Please try again.")
          return;
        }
        
        console.log('Confirming vote for candidate:', selectedVoteCandidate)
        console.log('For election:', selectedElection)
        console.log('Token:', token)
        
        const response = await axios.patch(
          `${process.env.REACT_APP_API_URL}/candidates/${selectedVoteCandidate}`,
          { 
            candidateId: selectedVoteCandidate,
            selectedElection: selectedElection,  
            currentVoterId: currentVoter?.id
          },
          {
            withCredentials: true, 
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        
        const voteResult = response.data;
        console.log('Vote result:', voteResult)
        
        dispatch(voteActions.changeCurrentVoter({
          ...currentVoter, 
          votedElections: voteResult
        }))
        
        dispatch(uiActions.closeVoteCandidateModal())
        navigate('/congrats')
        
      } catch(error) {
        console.error('Vote confirmation error:', error)
        console.error('Error response:', error.response?.data)
        console.error('Error status:', error.response?.status)
        
        setError(
          error.response?.data?.message || 
          error.response?.data?.error ||
          'Failed to confirm vote. Please try again.'
        )
      } finally {
        setLoading(false)
      }
    }

    useEffect(() => {
      if(selectedVoteCandidate) {
        fetchCandidate();
      }
    }, [selectedVoteCandidate])

  return (
    <section className='modal'>
      <div className='modal_content confirm_vote-content'>
        <h5>Please confirm your vote</h5>
        <div className='confirm_vote-image'>
          <img src={modalCandidate.image} alt={modalCandidate.fullName} />
        </div>
        <h2>{modalCandidate?.fullName?.length > 17 ? modalCandidate.fullName?.substring(0,17)+ "..." : modalCandidate?.fullName}</h2>
        <p>{modalCandidate?.motto?.length > 45 ? modalCandidate.motto?.substring(0,45)+ "..." : modalCandidate?.motto}</p>
        
        {error && (
          <div style={{color: 'red', padding: '10px', marginBottom: '10px'}}>
            {error}
          </div>
        )}
        
        <div className='confirm_vote-cta'>
          <button className='btn' onClick={closeCandidateModal} disabled={loading}>
            cancel
          </button>
          <button 
            className='btn primary' 
            onClick={confirmVote}
            disabled={loading}
          >
            {loading ? 'Confirming...' : 'confirm'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default ConfirmVote