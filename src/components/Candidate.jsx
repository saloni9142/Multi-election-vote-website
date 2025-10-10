import React from 'react'

const Candidate = ({ image, id, fullName, motto }) => {
  return (
    <article className='candidate'>
      <div className='candidate_image'>
        <img src={image} alt={fullName} />
      </div>
      <h5>
        {fullName?.length > 20 
          ? fullName.substring(0, 20) + "..." 
          : fullName}
      </h5>
      <small>
        {motto?.length > 25 
          ? motto.substring(0, 25) + "..."  
          : motto}
      </small>
      <button className='btn primary'>Vote</button>
    </article>
  )
}

export default Candidate  