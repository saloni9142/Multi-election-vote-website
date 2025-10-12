import React,{useState} from 'react'
import {elections as dummyElections} from '../data'
import Election from '../components/Election'
import AddElectionModal from '../components/AddElectionModal'
import {useDispatch, useSelector} from 'react-redux'
import { uiActions } from '../store/ui-slice'

const Elections=()=> {
  const [elections, setElection] = useState(dummyElections)
   const dispatch = useDispatch()
  // open election modal
  const openModal= ()=>{
    dispatch(uiActions.openElectionModal())

  }

  const electionModalShowing= useSelector(state=> state.ui.electionModalShowing)
  return (
    <>
    <section className='elections'>
      <div className='container elections_container'>
        <header className='elections_header'>
          <h1>Ongoing elections</h1>
          <button className='btn primary' onClick={openModal}>create new elections</button>
        </header>
        <menu className='election_menu'>
          {
            elections.map(election => <Election key={election.id} {...election}/>)
          }
        </menu>
      </div>
    </section>
   {electionModalShowing && <AddElectionModal/>
    } 
    </>
  )
}

export default Elections