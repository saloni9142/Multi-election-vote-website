import React,{useEffect, useState} from 'react'

import Election from '../components/Election'
import AddElectionModal from '../components/AddElectionModal'
import {useDispatch, useSelector} from 'react-redux'
import { uiActions } from '../store/ui-slice'
import UpdateElectionModal from '../components/UpdateElectionModal'
import axios from 'axios' 
import Loader from '../components/Loader'

const Elections=()=> {
  const [elections, setElections] = useState([])
  const [isLoading, setIsLoading] =useState(false);
   const dispatch = useDispatch()
   
  // open add election modal
  const openModal= ()=>{
    dispatch(uiActions.openElectionModal())

  }
   const token = useSelector(state => state?.vote?.currentVoter?.token)
   const isAdmin = useSelector(state => state?.vote?.currentVoter?.isAdmin)
  const electionModalShowing= useSelector(state=> state.ui.electionModalShowing)
   const updateElectionModalShowing= useSelector(state=> state.ui.updateElectionModalShowing)

   const getElections = async () =>{
setIsLoading(true)
  

   try{
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/elections`,{withCredentials: true,
          headers: {Authorization :`Bearer ${token}`} })
          setElections(response.data)

   } catch(error){
    console.log(error);
    

   }
   setIsLoading(false)
    }
    useEffect(()=>{
      getElections()
    },[])
  return (
    <>
    <section className='elections'>
      <div className='container elections_container'>
        <header className='elections_header'>
          <h1>Ongoing elections</h1>
      <button className='btn primary' onClick={openModal}>create new elections</button>
        </header>
     {isLoading ? <Loader/> : <menu className='election_menu'>
          {
            elections.map(election => <Election key={election._id} {...election}/>)
          }
        </menu>}
      </div>
    </section>
   {electionModalShowing && <AddElectionModal/>
    } 
    {updateElectionModalShowing && <UpdateElectionModal/>
    } 
    </>
  )
}

export default Elections