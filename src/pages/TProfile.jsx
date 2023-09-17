import React, { useState } from 'react'
import '../styles/TProfile.css'
import { AddCircle } from '@mui/icons-material';
import { Box, Modal, useMediaQuery } from '@mui/material';
import { SelectMod } from '../components/Utils';
const TProfile = () => {
  const mobileView = useMediaQuery('(max-width:720px)')
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryList, setCategoryList] = useState(['Science', 'Mathematics','Social Science', 'English', 'Computer Science', 'Hindi', 'Commerce']);
  const [classList, setClassList] = useState(['6','7','8','9','10','11','12'])
  const [categoryValue, setCategoryValue] = useState();
  const [classValue, setClassValue] = useState();
  const [courseName, setCourseName] = useState();
  const handleCourseSubmit = async()=>{
    console.log(courseName, classValue, categoryValue);
    setModalOpen(false)
  }
  const handleCategoryChange = (e)=>{
   setCategoryValue(e);
  }
  const handleModalClose = ()=>{
    setModalOpen(false)
  }
  const handleClassChange = (e)=>{
    setClassValue(e);
  }
  const handleCourseName = (e)=>{
    setCourseName(e.target.value)
  }
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
        <div className="addBtn" onClick={()=>setModalOpen(true)}>
        <AddCircle sx={{ color: "rgb(6, 207, 106)", fontSize: "4rem" }}/>
        <Modal
        open={modalOpen}
        onClose={handleModalClose}>
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
