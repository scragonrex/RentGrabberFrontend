import React, { useEffect, useState } from 'react'
import '../../styles/TProfile.css'
import { AccountCircleOutlined, AddCircle, AutoStoriesOutlined, Home, HomeOutlined, LogoutOutlined, PeopleAltOutlined } from '@mui/icons-material';
import { Box, Checkbox, Modal, useMediaQuery } from '@mui/material';
import { SelectMod } from '../../components/Utils';
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import THome from './THome';
import TCourses from './TCourses';
import TStudents from './TStudents';

const TAdmin = () => {
  const user = useSelector((state) => state.auth.user);
  const url = useSelector((state) => state.auth.url);
  const token = useSelector((state) => state.auth.token);
  const mobileView = useMediaQuery('(max-width:720px)')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [categoryList, setCategoryList] = useState(['Science', 'Mathematics', 'Social Science', 'English', 'Computer Science', 'Hindi', 'Commerce']);
  const [categoryValue, setCategoryValue] = useState();
  const [isSend, setIsSend] = useState(true);

  const handleLogout = () => {
    dispatch(setLogout())
    navigate('/login')
  }



  //Changing the sidetabs
  const [tabs, setTabs] = useState('Home');
  const handleTabs=(value)=>{
    setTabs(value);
  }
  useEffect(() => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }

    function success(position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }

    function error() {
      console.log("Unable to retrieve your location");
    }
  }, [])


  return (
    <div className='tProfile'>
      <div className="sidebar">
        <p className={`sideTabs ${tabs==="Home" && "active"}`} onClick={()=>handleTabs('Home')}><HomeOutlined/> Home</p>
        <p className={`sideTabs ${tabs==="Courses" && "active"}`} onClick={()=>handleTabs('Courses')}><AutoStoriesOutlined/> Courses</p>
        <p className={`sideTabs ${tabs==="Students" && "active"}`} onClick={()=>handleTabs('Students')}><PeopleAltOutlined/> Students</p>
        <p className="sideTabs" style={{ cursor: "pointer" }} onClick={handleLogout}> <LogoutOutlined/> Logout </p>
      </div>
      <div className="overview">
        {tabs==="Home" && <THome/>}
        {tabs==="Courses" && <TCourses/>}
        {tabs==="Students" && <TStudents/>}
      </div>
      
    </div>
  )
}

export default TAdmin;
