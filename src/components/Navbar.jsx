import React from 'react'
import { Link,NavLink } from 'react-router-dom'
import {IoMoon} from "react-icons/io5";
import {IoMdSunny} from "react-icons/io";
import {HiOutlineBars3} from "react-icons/hi2";
import {AiOutlineClose} from "react-icons/ai";
const Navbar=()=> {
  return (
    <nav>
      <div className='container nav_container'>
        <Link to="/" className='nav_logo'>VOTER
        </Link>
        <div>
          <menu>
              <NavLink to ="/elections">Elections</NavLink>
               <NavLink to ="/results">Results</NavLink>
                <NavLink to ="/logouts">Logout</NavLink>
          </menu>
<button className='theme_toggle-btn'><IoMoon/></button>
<button className='theme_toggle-btn'><HiOutlineBars3/></button>
        </div>

      </div>
    </nav>
  )
}

export default Navbar