import React, { useState } from 'react'
import ResultElection from '../components/ResultElection'

const Results=()=> {
  const [elections, setElections] =useState(dummyElections)
  return (
    <section className='results'>
      <div className='container results_container'>
        {
          elections.map(election=> <ResultElection key={election.id} {...element}/>)
        }

      </div>

    </section>
  )
}

export default Results