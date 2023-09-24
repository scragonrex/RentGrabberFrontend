import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const tableStyles = {
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
};

const TStudents = () => {
    const students = [
        { studentName: "Student A", course: "Course 1", mobileNo: "123-456-7890" },
        { studentName: "Student B", course: "Course 1", mobileNo: "987-654-3210" },
        { studentName: "Student C", course: "Course 2", mobileNo: "555-555-5555" },
        { studentName: "Student D", course: "Course 2", mobileNo: "999-999-9999" },
      ];
  return (
    <div className='dashCont'>
     <p className="font-subHeading margin-bottom-1">Students Enrolled</p>
     <div>
     <TableContainer component={Paper} style={tableStyles}>
      <Table >
        <TableHead>
          <TableRow >
            <TableCell sx={{fontWeight:"bold"}}>S.No</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>Student's Name</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>Course</TableCell>
            <TableCell sx={{fontWeight:"bold"}}>Mobile No.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student, index) => (
            <TableRow key={student.studentName}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{student.studentName}</TableCell>
              <TableCell>{student.course}</TableCell>
              <TableCell>{student.mobileNo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     </div>
    </div>
  )
}

export default TStudents
