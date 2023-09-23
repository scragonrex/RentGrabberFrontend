import React, { useState } from 'react'
import { VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material'
import { Alert, CircularProgress, Snackbar, useMediaQuery, } from '@mui/material'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
const SignUp = () => {
  const mobileView = useMediaQuery('(max-width:720px)');
  const url = useSelector((state)=>state.auth.url);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [userType, setUserType] = useState('');
  //-------------------Alert----------------------------//
  const [alert, setAlert] = useState({ open: false, message: "" });
  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert({ ...alert, open: false });
  };

  const handleBlur = (e) => {
     // eslint-disable-next-line
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if (!regex.test(e.target.value)) {
      setAlert({ open:true, status: "error", message: "Not a valid email" });
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }
  const register = async (e) => {
    e.preventDefault();
    if(userType===''){
      setAlert({ open: true, message: "Select User Type" }); 
      return;
  }
    setIsLoading(true);
    const response = await fetch(`${url}/${userType}/signup`,
      {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" }
      });

    const registered = await response.json();
    setIsLoading(false);
    setAlert({open:true,status:registered.status,message:registered.msg})
    if (registered.status==="success") {
      navigate('/login');
    }
  }

  return (

    <div className="pageContainer">
      <img src="/assets/loginBg.jpg" alt="login" />
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleAlertClose} severity="error" variant='filled' sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
      <div className="loginSignupCont">
      <div className="formContainer ">
      <div className='display-flex-row align-item-center font-heading'> <img style={{width:"3rem"}} src="/assets/logo.png" alt="logo" /><span>Tutor</span><span className='font-blue'> Grabber</span></div>
      <div className="display-flex-row gap-3 align-item-center">
                <h1 className={` ${mobileView ? "font-para" : "font-subHeading"}`}>Register as</h1>
                <div className="display-flex-row gap-2">
                    <div className={`userTag  font-subHeading ${userType === "student" && "active"}`} onClick={() => setUserType('student')}>Student</div>
                    <div className={`userTag  font-subHeading ${userType === "teacher" && "active"}`} onClick={() => setUserType('teacher')}>Teacher</div>
                </div>
                </div>
        <form onSubmit={register} className='display-flex-col gap-3'>

          <div className='display-flex-col gap-1'>
            <label htmlFor="" className="">Name</label>
            <input className='inputCont' name='name'
              value={user.name}
              required
              onChange={handleChange}
              placeholder='Enter your name'
            />
          </div>

          <div className='display-flex-col gap-1'>
            <label htmlFor="" className="">Email</label>
            <input className='inputCont' name='email'
              value={user.email}
              required
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder='Enter your email'
            />
          </div>

          <div className='display-flex-col gap-1'  style={{ position: "relative" }}>
            <label >Password</label>
            <input className='inputCont'
              name='password' value={user.password}
              type={hidePassword ? 'password' : 'text'}
              onChange={handleChange}
              placeholder='Enter your password'
              minLength='6'
            />
            <div className='passwordIcon' onClick={() => setHidePassword(!hidePassword)}>{hidePassword ? <VisibilityOffRounded sx={{ color: "black" }} /> : <VisibilityRounded sx={{ color: "black" }} />}</div>
          </div>

          <button className='btn'
            type='submit'>{isLoading ? <CircularProgress style={{ color: "black", width: "20px", height: "20px" }} /> : "SignUp"}</button>
          <div className=''>
            Already have an Account?. <p className=' font-link' onClick={() => navigate('/login')}> Login</p>here!
          </div>
        </form>
      </div>
      </div>
    </div>
  )
}

export default SignUp
