import React,{useEffect, useState} from 'react'
import { Link,NavLink } from 'react-router-dom'
import {IoMoon} from "react-icons/io5";
import {IoMdSunny} from "react-icons/io";
import {HiOutlineBars3} from "react-icons/hi2";
import {AiOutlineClose} from "react-icons/ai";

const Navbar=()=> {
  const [showNav, setShowNav]= useState(window.innerWidth< 600?false:true)
  const [darkTheme, setDarkTheme] =useState(localStorage.getItem('voting-app-theme')||'')

  //! function to close nav menu on small screen when menu is clicked
  const closeNavMenu=()=>{
    if(window.innerWidth< 600){
      setShowNav(false);
    }else{
      setShowNav(true)
    }
  }

  // functtion to change /toggle theme
  const changeThemehandler=()=>{
    if(localStorage.getItem('voting-app-theme')=='dark'){
      localStorage.setItem('voting-app-theme','')
    }else{
      localStorage.setItem('voting-app-theme','dark')
    }
    setDarkTheme(localStorage.getItem('voting-app-theme'))
  }

useEffect(()=>{
  document.body.className=localStorage.getItem('voting-app-theme');
},[darkTheme])


  return (
    <nav>
      <div className='container nav_container'>
        <Link to="/" className='nav_logo'>VOTER
        </Link>
        <div>
         {showNav && <menu>
              <NavLink to ="/elections" onClick={closeNavMenu}>Elections</NavLink>
               <NavLink to ="/results" onClick={closeNavMenu}>Results</NavLink>
                <NavLink to ="/logouts" onClick={closeNavMenu}>Logout</NavLink>
          </menu>}
<button className='theme_toggle-btn' onClick={changeThemehandler}><IoMoon/></button>
<button className='theme_toggle-btn' onClick={()=> setShowNav(!showNav)}> {showNav ? <AiOutlineClose/>:<HiOutlineBars3/>}</button>
        </div>

      </div>
    </nav>
  )
}

export default Navbar