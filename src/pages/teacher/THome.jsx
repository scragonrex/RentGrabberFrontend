import React, { useEffect, useState } from 'react'
import '../../styles/TProfile.css'
import { AccountCircleOutlined, AddCircle, AutoStoriesOutlined, Home, HomeOutlined, LogoutOutlined, PeopleAltOutlined } from '@mui/icons-material';
import { Box, Checkbox, Modal, useMediaQuery } from '@mui/material';
import { SelectMod } from '../../components/Utils';
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const THome = () => {
  const user = useSelector((state) => state.auth.user);
  const url = useSelector((state) => state.auth.url);
  const token = useSelector((state) => state.auth.token);
  const [categoryList, setCategoryList] = useState(['Science', 'Mathematics', 'Social Science', 'English', 'Computer Science', 'Hindi', 'Commerce']);
  const [categoryValue, setCategoryValue] = useState();
  const [isSend, setIsSend] = useState(true);
  const mobileView = useMediaQuery('(max-width:720px)')
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

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
  
    const handleCategoryChange = (e) => {
      setCategoryValue(e);
    }
  
    const handleLocationChange = (e) => {
      if (e.target.checked)
        setIsSend(true);
      else
        setIsSend(false);
      console.log(isSend)
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
    <div >
        <div className="display-flex-row justify-content-between">
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
        {/* <div>Location: {user.longitude && Object?.values(user.longitude)}, {user.latitude && Object?.values(user.latitude)}</div> */}
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
      </div>
  )
}

export default THome
