import React from 'react'
import  "../styles/Home.css"
import CourseMiniCard from '../components/CourseMiniCard'
const Home = () => {
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
          <CourseMiniCard/>
          <CourseMiniCard/>
          <CourseMiniCard/>
          <CourseMiniCard/>
          <CourseMiniCard/>
        </div>
      </div>
    </div>
  )
}

export default Home
