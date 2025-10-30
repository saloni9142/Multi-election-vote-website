
import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
const Congrats=()=> {
  const token = useSelector(state=> state?.vote?.currentVoter?.token)
  const navigate = useNavigate
  // access control
  useEffect(()=>{
    if(!token){
      navigate('/')
    }
  },[])
  return (
  <section className='congrats'>
    <div className='container congrats_container'>
      <h2>Thanks for your vote!</h2>
      <p>your vote is now added to your candidate's vote count.</p>
      <Link to='/results' className='btn sm primary'>See Results</Link>
    </div>
     </section>
  )
}

export default Congrats