import React, { useEffect, useState } from 'react'
import '../styles/TProfile.css'
import { AddCircle } from '@mui/icons-material';
import { Box, Modal, useMediaQuery } from '@mui/material';
import { SelectMod } from '../components/Utils';
import { useSelector } from "react-redux";

const TProfile = () => {
  const user = useSelector((state)=>state.auth.user);
  const url = useSelector((state)=>state.auth.url);
  const token = useSelector((state)=>state.auth.token);
  const mobileView = useMediaQuery('(max-width:720px)')
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryList, setCategoryList] = useState(['Science', 'Mathematics','Social Science', 'English', 'Computer Science', 'Hindi', 'Commerce']);
  const [classList, setClassList] = useState(['6','7','8','9','10','11','12'])
  const [categoryValue, setCategoryValue] = useState();
  const [classValue, setClassValue] = useState(1);
  const [courseName, setCourseName] = useState();
  const [degree, setDegree] = useState();
  const [latitude,setLatitude]=useState(0);
  const [longitude,setLongitude]=useState(0);

  const handleEditProfile = async()=>{   
    console.log(degree, longitude, latitude);
    const response = await fetch(`${url}/teacher/editProfile/${user._id}`,
    {
      method:"POST",
      body:JSON.stringify({degree, latitude, longitude}),
      headers:{Authorization:`Bearer ${token}`, "Content-type":"application/json"}
    });

    const data = response.json(); 
  }
  const handleCourseSubmit = async()=>{
    console.log(courseName, classValue, categoryValue);
    console.log(user, token);

    const response = await fetch(`${url}/teacher/addCourse/${user._id}`,{
      method:"POST",
      body:JSON.stringify({courseName, classValue, categoryValue}),
      headers:{Authorization:`Bearer ${token}`, "Content-type":"application/json"}
    });

    setModalOpen(false);
    const data = await response.json();
  }
  const handleCategoryChange = (e)=>{
   setCategoryValue(e);
  }

  const handleClassChange = (e)=>{
    setClassValue(e);
  }
  const handleCourseName = (e)=>{
    setCourseName(e.target.value)
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
        <p className="font-subHeading margin-bottom-2">MuscleGrabber</p>
        <p className="sideTags">Dashboard</p>
        <p className="sideTags">About Us</p>
        <p className="sideTags">Logout </p>
        <p className="sideTags">Settings</p>
      </div>
      <div className="overview">
        <p className="font-subHeading">Your overview</p>
        <div className="display-flex-row margin-top-2 justify-content-between">
          <div className="box">Courses: 5</div>
          <div className="box">Student enrolled: 35</div>
          <div className="box">Average rating: 7/10</div>
        </div>
        <div className="addBtn" >
        <AddCircle onClick={()=>setModalOpen(true)} sx={{ color: "rgb(6, 207, 106)", fontSize: "4rem" }}/>
        <div className="formContainer margin-top-2" >
          <input type="text" className="inputCont" placeholder='Degree' value={degree} onChange={(e)=>setDegree(e.target.value)}/>
          <button className="btn" onClick={handleEditProfile}>Submit</button>
        </div>
        <Modal
        open={modalOpen}
        onClose={()=>setModalOpen(false)}>
        <div className="modalContainer">
          <div className="font-white font-subHeading" >Create your course</div>
          <input type="text" placeholder='Enter course name' className="inputCont" value={courseName} onChange={handleCourseName}/>
          <Box sx={{ minWidth: 120, margin: mobileView ? "1rem 0" : "2rem 0" }}>
              <SelectMod
                title="Class"
                options={classList}
                ide="sm2"
                onChange={handleClassChange}
              >
              </SelectMod>
          </Box>
          <Box sx={{ minWidth: 120, margin: mobileView ? "1rem 0" : "2rem 0" }}>
              <SelectMod
                title="Category"
                options={categoryList}
                ide="sm1"
                onChange={handleCategoryChange}
              >
              </SelectMod>
          </Box>
          <button className="btn" style={{ marginTop: "1rem" }} onClick={handleCourseSubmit}>Create</button>
        </div>
      </Modal>
    
        </div>
      </div>
    </div>
  )
}

export default TProfile
