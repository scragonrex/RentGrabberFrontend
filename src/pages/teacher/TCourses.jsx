import React, { useEffect, useState } from 'react'
import '../../styles/TProfile.css'
import { AccountCircleOutlined, AddCircle, AutoStoriesOutlined, Home, HomeOutlined, LogoutOutlined, PeopleAltOutlined } from '@mui/icons-material';
import { Box, Checkbox, Modal, useMediaQuery } from '@mui/material';
import { SelectMod } from '../../components/Utils';
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const tableStyles = {
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
};

const TCourses = () => {
    const user = useSelector((state) => state.auth.user);
    const url = useSelector((state) => state.auth.url);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const mobileView = useMediaQuery('(max-width:720px)')
    const [modalOpen, setModalOpen] = useState(false);
    const [categoryList, setCategoryList] = useState(['Science', 'Mathematics', 'Social Science', 'English', 'Computer Science', 'Hindi', 'Commerce']);
    const [classList, setClassList] = useState(['6', '7', '8', '9', '10', '11', '12'])
    const [categoryValue, setCategoryValue] = useState();
    const [classValue, setClassValue] = useState(1);
    const [courseName, setCourseName] = useState();
    const [courseDesc, setCourseDesc] = useState();
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [isSend, setIsSend] = useState(true);
    const courses = [
      { courseName: 'Course 1', studentsEnrolled: ['Raju', 'Ram', 'Sita']},
      { courseName: 'Course 2', studentsEnrolled: ['Vivek','Eren']},
      { courseName: 'Course 3', studentsEnrolled: ['Radhe', 'Logan','Rex','Erwin','scragon'] },
    ];
    
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
    const handleCourseDesc = (e) => {
      setCourseDesc(e.target.value)
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

    //Showing the names of students in table
    const [expandedCell, setExpandedCell] = useState(null);

  const handleCellClick = (courseName) => {
    if (expandedCell === courseName) {
      // If the cell is already expanded, close it
      setExpandedCell(null);
    } else {
      // Expand the clicked cell
      setExpandedCell(courseName);
    }
  };
  
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
    <div>
        <div className="dashCont display-flex-row align-item-center margin-bottom-2">
            <p className='font-subHeading'>Create your Course</p>
            <div className="addBtn" >
                <AddCircle onClick={() => setModalOpen(true)} sx={{fontSize: "4rem" }} />
            </div>
        </div>
        <div className='dashCont'>
          <p className="font-subHeading margin-bottom-1">Courses published</p>
        <TableContainer component={Paper} style={tableStyles}>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight:"bold"}}>S.No</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>Course Name</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>Students Enrolled</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {courses.map((course, index) => (
            <TableRow key={course.courseName}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{course.courseName}</TableCell>
              <TableCell
                style={{ cursor: 'pointer'}}
                onClick={() => handleCellClick(course.courseName)}
              >
                {expandedCell === course.courseName
                  ? 
                   // Display student names if cell is expanded
                   <ul style={{listStyle:"none"}}>
                    {
                      course?.studentsEnrolled.length>0 && course.studentsEnrolled.map((item)=>(<li >{item}</li>))
                    }
                   </ul>
                  : `${course.studentsEnrolled.length} Students`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}>
            <div className="modalContainer">
              <div className="font-subHeading margin-bottom-1" >Create your course</div>
              <input type="text" placeholder='Enter course name' className="inputCont" value={courseName} onChange={handleCourseName} />
              <textarea type="text" placeholder='Enter course description' rows='6' className="inputCont" value={courseDesc} onChange={handleCourseDesc} />
              <Box sx={{ minWidth: 120}}>
                <SelectMod
                  title="Class"
                  options={classList}
                  ide="sm2"
                  onChange={handleClassChange}
                >
                </SelectMod>
              </Box>
              <button className="btn" onClick={handleCourseSubmit}>Create</button>
            </div>
          </Modal>

        
    </div>
  )
}

export default TCourses
