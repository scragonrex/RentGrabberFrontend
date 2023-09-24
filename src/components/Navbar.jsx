import React, { useEffect, useState } from 'react'
import '../styles/Navbar.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../store/authSlice';
import { Avatar, ClickAwayListener, Divider, Menu, MenuItem, useMediaQuery } from '@mui/material'
import { Bolt } from '@mui/icons-material';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  // const score = useSelector((state)=>state.auth.score); 
  const mobileView = useMediaQuery('(max-width:730px)');
  const handleLogout = () => {
    dispatch(setLogout())
    navigate('/login')
  }
  const [isScrolled, setIsScrolled] = useState(false);

  //Navbar profile dropdown
  const handleMenu = () => {
    const id = document.getElementById("drop");
    console.log("open", id);
    id.classList.toggle("active");
  }
  const handleClickAway = () => {
    const id = document.getElementById("drop");
    console.log("close", id);
    id.classList.remove("active");
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (

    <div className={`navbarContainer ${isScrolled ? 'blur' : ''}`}>
      <div className='display-flex-row align-item-center font-subHeading'> <img style={{ width: "2.5rem" }} src="/assets/logo.png" alt="logo" /><span >Tutor</span><span className='font-blue'> Grabber</span>
        {location.pathname !== "/teacher/profile" && 
        <div className="links">
        <ul className='font-blue'>
          <li className={`font-para ${location.pathname === "/" && "active"}`} onClick={() => navigate('/')}> Home</li>

          <li className={`font-para ${location.pathname === "/workout" && "active"}`}>About Us</li>
        </ul>
        </div>}
      </div>

      {mobileView ? "" : 
        <>
          {user ?
            <ClickAwayListener onClickAway={handleClickAway}>
              <div className='userProfile' onClick={handleMenu}>
                <Avatar sx={{ bgcolor: "#2196f3" }}>{user?.name[0]}</Avatar>
                <div className="display-flex-col">
                  <p >{user?.name}</p>
                  <p className='font-grey font-small'>{user?.email}</p>
                </div>
                <div id="drop" className="dropdown" >
                  <div onClick={() => navigate('/student/profile')}>Profile</div>
                  <Divider />
                  <div onClick={handleLogout}>Logout</div>
                </div>
              </div>
            </ClickAwayListener>
            :
            <div className='display-flex-row gap-2'>
              <button className='btn1' onClick={() => navigate('/login')}>Login</button>
              <button className='btn' onClick={() => navigate('/signup')}>Signup</button>
            </div>}
        </>
     
      }
    </div>
  )
}

export default Navbar
