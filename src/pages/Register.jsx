import React, { useState } from 'react'
import { Link } from "react-router-dom";

const Register=()=> {
  const [userData, setUserData]=useState({fullname: "", email: "",password:"",password2:""})
  // function to change controlled inputs
  const changeInputHandler=(e)=>{
    setUserData(prevState=>{
      return {...prevState, [e.target.name]:e.target.value}
    })
  }
  console.log(userData);
  

  
  return (
    <section className='register'>
      <div className='container register_container'>
        <h2>sign up</h2>
        <form action="">
          <p className='form_error-message'>Any error from the backend</p>
          <input type="text" name='fullname' placeholder='full Name' onChange={changeInputHandler} autoComplete='true' autoFocus />
          <input type="email" name='email' placeholder='Email Address' onChange={changeInputHandler} autoComplete='true'  />
          <input type="password" name='password' placeholder='Password'onChange={changeInputHandler}  autoComplete='true'  />
          <input type="password" name='password2' placeholder='Confirm Password' onChange={changeInputHandler} autoComplete='true'  />
          <p>Already have an account? <Link to='/'>sign in</Link></p>
          <button  type='submit' className="btn primary">Register</button>
        </form>
      </div>
    </section>
  )
}

export default Register