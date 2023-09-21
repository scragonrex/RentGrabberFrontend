import React, { useEffect, useState } from 'react'
import  "../styles/Home.css"
import CourseMiniCard from '../components/CourseMiniCard'
import { useDispatch, useSelector } from "react-redux";
import { setCourses, setTeachers } from '../store/authSlice';
import ViewTeacher from './ViewTeachers';
const Home = () => {
  const url = useSelector((state)=>state.auth.url); 
  const token = useSelector((state)=>state.auth.token);
  const dispatch = useDispatch();
  const [categoryList, setCategoryList] = useState([]);
  const [categoryValue, setCategoryValue] = useState();

  //Fetching all courses
  const getCourses = async()=>{
    const response = await fetch(`${url}/course/getCourses`,{
      method:"GET",
      headers:{Authorization:`Bearer ${token}`, "Content-type":"application/json"}
    });
    const data = await response.json();
    //Retrieving categories(unique) from courses
    const temp =  data.courses?.map((item)=>item.category);
    const categories = [...new Set(temp)]
    setCategoryList(categories);
    dispatch(setCourses({
      courses:data.courses,
      categories:categories
    }))
  }

  //Fetching all teachers
  const getTeachers = async () => {
    const response = await fetch(`${url}/teacher/getTeachers`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`, "Content-type": "application/json" }
      });

    const data = await response.json();
    if(data.status==="success") dispatch(setTeachers(data.teacherArray));
  }

  const handleCategory = (item)=>{
    setCategoryValue(item)
  }
  useEffect(()=>{
    getCourses(); 
    getTeachers();
  },[]);

  return (
    <div className='Home'>
      <div className="landingCont">
        <img src="/assets/landingBg.png" alt="landingBg" />
        <div className="landingText">
          <p className="font-big">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
          <p className="font-para font-grey margin-top-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus reiciendis numquam nobis iste nisi dolorem inventore quaerat recusandae?</p>
          <div className="btnGroup margin-top-2">
            <button className="btn">Get Started</button>
            <button className="btn1">SignUp</button>
          </div>
        </div>
      </div>
      <div className="coursesCont">
        <p className="font-heading font-bold">Explore Teachers by Category</p>
        <div className='display-flex-row flexWrap justify-content-between margin-top-2'>
          {
            categoryList?.length>0 && categoryList.map((item,key)=>(
              <div onClick={()=>handleCategory(item)}>
                <CourseMiniCard id={key} name={item} />
              </div>
            ))
          }
        </div>
        {categoryValue && <button className="btn margin-top-1" onClick={()=>setCategoryValue('')}>Collapse</button>}
      <div className="viewTeacher">
        {categoryValue && <ViewTeacher defaultCategory={categoryValue}/>}
      </div>
      </div>
    </div>
  )
}

export default Home
