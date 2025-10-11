import React,{useState} from 'react'
import {elections as dummyElections} from '../data'
import Election from '../components/Election'

const Elections=()=> {
  const [elections, setElection] = useState(dummyElections)
  return (
    <section className='elections'>
      <div className='container elections_container'>
        <header className='elections_header'>
          <h1>Ongoing elections</h1>
          <button className='btn primary'>create new elections</button>
        </header>
        <menu className='election_menu'>
          {
            elections.map(election => <Election key={election.id} {...election}/>)
          }
        </menu>
      </div>
    </section>
  )
}

export default Elections