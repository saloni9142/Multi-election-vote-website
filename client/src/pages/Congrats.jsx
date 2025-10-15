import React from 'react'
import {Link} from 'react-router-dom'
const Congrats=()=> {
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