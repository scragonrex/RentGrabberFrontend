import React, { useEffect, useState } from 'react'
import '../styles/TProfile.css'
import { AddCircle } from '@mui/icons-material';
import { Box, Checkbox, Modal, useMediaQuery } from '@mui/material';
import { SelectMod } from '../components/Utils';
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const TProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const url = useSelector((state) => state.auth.url);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(); //Teacher info from backend
  const mobileView = useMediaQuery('(max-width:720px)')
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryList, setCategoryList] = useState(['Science', 'Mathematics', 'Social Science', 'English', 'Computer Science', 'Hindi', 'Commerce']);
  const [classList, setClassList] = useState(['6', '7', '8', '9', '10', '11', '12'])
  const [categoryValue, setCategoryValue] = useState();
  const [classValue, setClassValue] = useState(1);
  const [courseName, setCourseName] = useState();
  const [category, setCategory] = useState();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [isSend, setIsSend] = useState(true);
  //Completing/Edit the profile
  const handleEditProfile = async () => {
    console.log(categoryValue, longitude, latitude, isSend);
    const response = await fetch(`${url}/teacher/editProfile/${user._id}`,
      {
        method: "POST",
        body: JSON.stringify({ categoryValue, latitude: latitude, longitude: longitude }),
        headers: { Authorization: `Bearer ${token}`, "Content-type": "application/json" }
      });

    const data = response.json();
  }

  //Creating course
  const handleCourseSubmit = async () => {
    console.log(courseName, classValue);
    console.log(user, token);

    const response = await fetch(`${url}/teacher/addCourse/${user._id}`, {
      method: "POST",
      body: JSON.stringify({ courseName, classValue }),
      headers: { Authorization: `Bearer ${token}`, "Content-type": "application/json" }
    });

    setModalOpen(false);
    const data = await response.json();
  }
  const handleCategoryChange = (e) => {
    setCategoryValue(e);
  }

  const handleClassChange = (e) => {
    setClassValue(e);
  }
  const handleCourseName = (e) => {
    setCourseName(e.target.value)
  }

  const handleLocationChange = (e) => {
    if (e.target.checked)
      setIsSend(true);
    else
      setIsSend(false);
    console.log(isSend)
  }

  const handleLogout = () => {
    dispatch(setLogout())
    navigate('/login')
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
        <p className="sideTags">Dashboard</p>
        <p className="sideTags">About Us</p>
        <p className="sideTags" style={{ cursor: "pointer" }} onClick={handleLogout}>Logout </p>
        <p className="sideTags">Settings</p>
      </div>
      <div className="overview">
        <p className="font-heading">Home </p>
        <div className="display-flex-row margin-top-2 justify-content-between">
          <div className="box">
            <p className='font-para font-grey'>Courses</p>
            <p className='font-heading margin-top-0'>{user ? user.coursesTaught?.length : "null"}</p>
          </div>

          <div className="box">
            <p className='font-para font-grey'>Student enrolled</p>
            <p className='font-heading margin-top-0'>35</p>
          </div>

          <div className="box">
            <p className='font-para font-grey'>Average rating</p>
            <p className='font-heading margin-top-0'>7/10</p>
          </div>

          <div className="box">
            <p className='font-para font-grey'>Category</p>
            <p className='font-heading margin-top-0'>{user?.category}</p>
          </div>
         </div>
        <div>Location: {user.longitude && Object?.values(user.longitude)}, {user.latitude && Object?.values(user.latitude)}</div>
        <div className="addBtn" >
          <AddCircle onClick={() => setModalOpen(true)} sx={{ color: "rgb(6, 207, 106)", fontSize: "4rem" }} />
          <div className="formContainer margin-top-2" >
            <Box sx={{ minWidth: 120, margin: mobileView ? "1rem 0" : "2rem 0" }}>
              <SelectMod
                title="Category"
                options={categoryList}
                ide="sm1"
                onChange={handleCategoryChange}
              >
              </SelectMod>
            </Box>
            <div className='font-white'>
              Use my current location <Checkbox onChange={handleLocationChange} />
            </div>
            <button className="btn" onClick={handleEditProfile}>Submit</button>
          </div>
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}>
            <div className="modalContainer">
              <div className="font-white font-subHeading" >Create your course</div>
              <input type="text" placeholder='Enter course name' className="inputCont" value={courseName} onChange={handleCourseName} />
              <Box sx={{ minWidth: 120, margin: mobileView ? "1rem 0" : "2rem 0" }}>
                <SelectMod
                  title="Class"
                  options={classList}
                  ide="sm2"
                  onChange={handleClassChange}
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
