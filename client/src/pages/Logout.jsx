import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { voteActions } from '../store/vote-slice'

const Logout=()=> {

const dispatch = useDispatch()
const navigate = useNavigate()

useEffect(()=>{
  dispatch(voteActions.changeCurrentVoter(null))
  localStorage.removeItem("currentUser")
  navigate('/')
},[])

  return (
   <>

   </>
  )
}

export default Logout