import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { IoMoon } from "react-icons/io5";
import { IoMdSunny } from "react-icons/io";
import { HiOutlineBars3 } from "react-icons/hi2";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [showNav, setShowNav] = useState(window.innerWidth >= 600)
  const [darkTheme, setDarkTheme] = useState(
    localStorage.getItem('voting-app-theme') === 'dark'
  )
  const token = useSelector(state=> state?.vote?.currentVoter?.token)

  //! function to close nav menu on small screen when menu is clicked
  const closeNavMenu = () => {
    if (window.innerWidth < 600) {
      setShowNav(false);
    } else {
      setShowNav(true)
    }
  }

  // function to change/toggle theme
  const changeThemeHandler = () => {
    const newTheme = !darkTheme;
    setDarkTheme(newTheme);
    localStorage.setItem('voting-app-theme', newTheme ? 'dark' : '');
  }

  // Apply theme on mount and when darkTheme changes
  useEffect(() => {
    document.body.className = darkTheme ? 'dark' : '';
  }, [darkTheme])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 600) {
        setShowNav(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  return (
    <nav>
      <div className='container nav_container'>
        <Link to="/" className='nav_logo'>VOTER</Link>
        <div>
          {token && showNav && (
            <menu>
              <NavLink to="/elections" onClick={closeNavMenu}>Elections</NavLink>
              <NavLink to="/results" onClick={closeNavMenu}>Results</NavLink>
              <NavLink to="/logout" onClick={closeNavMenu}>Logout</NavLink>
            </menu>
          )}
          <button className='theme_toggle-btn' onClick={changeThemeHandler}>
            {darkTheme ? <IoMdSunny /> : <IoMoon />}
          </button>
          <button className='theme_toggle-btn' onClick={() => setShowNav(!showNav)}>
            {showNav ? <AiOutlineClose /> : <HiOutlineBars3 />}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar