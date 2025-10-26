import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios  from 'axios'

const Register=()=> {
  const [userData, setUserData]=useState({fullName: "", email: "",password:"",password2:""})
  const [error, setError] = useState("")
  const navigate = useNavigate()
  // function to change controlled inputs
  const changeInputHandler=(e)=>{
    setUserData(prevState=>{
      return {...prevState, [e.target.name]:e.target.value}
    })
  }
  
const registerVoter= async(e)=>{
  e.preventDefault();
  try{
          await axios.post(`${process.env.REACT_APP_API_URL}/voters/register`,userData)
          navigate('/')
  } catch(error){
    setError(error.response.data.message)

  }
}
  
  return (
    <section className='register'>
      <div className='container register_container'>
        <h2>sign up</h2>
        <form onSubmit={registerVoter}>
        {error && <p className='form_error-message'>{error}</p>}
          <input type="text" name='fullName' placeholder='full Name' onChange={changeInputHandler} autoComplete='true'  />
          <input type="email" name='email' placeholder='Email Address' onChange={changeInputHandler} autoComplete='true' autoFocus />
          <input type="password" name='password' placeholder='Password'onChange={changeInputHandler}  autoComplete='true'  />
          <input type="password" name='password2' placeholder='Confirm Password' onChange={changeInputHandler} autoComplete='true'  />
          <p>Already have an account? <Link to='/login'>sign in</Link></p>
          <button  type='submit' className="btn primary">Register</button>
        </form>
      </div>
    </section>
  )
}

export default Register