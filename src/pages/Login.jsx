import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogin } from '../store/authSlice';
import { Alert, CircularProgress, Snackbar, useMediaQuery } from '@mui/material';
import { VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';
import "../styles/Login.css"
const Login = () => {
    const url = useSelector((state) => state.auth.url);
    const mobileView = useMediaQuery('(max-width:720px)');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(true);
    const [userType, setUserType] = useState('');
    //-------------------Alert----------------------------//
    const [alert, setAlert] = useState({ open: false, message: "" });
    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlert({ ...alert, open: false });
    };


    const login = async (e) => {
        e.preventDefault();
        if(userType===''){
            setAlert({ open: true, message: "Select User Type" }); 
            return;
        }
        setIsLoading(true);
        const response = await fetch(`${url}/${userType}/login`,
            {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: { "Content-Type": "application/json" }
            });

        const loggedIn = await response.json();
        setIsLoading(false);
        console.log(loggedIn);
        if (loggedIn.status && loggedIn.status === "error") {
            setAlert({ open: true, message: loggedIn.msg });
        }
        else if (loggedIn.user && loggedIn.token) {
            // setOpen(true);
            dispatch(setLogin(
                {
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            )
            if (userType === "teacher")
                navigate('/teacher');
            else
                navigate('/');
        }
    }

    const handleBlur = (e) => {
        if (e.target.value === "")
            setAlert({ open: true, message: "Email required" })
        else {
            // eslint-disable-next-line
            let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
            if (!regex.test(e.target.value)) {
                setAlert({ open: true, message: "Invalid email" })
            }
        }
    }
    return (
        <div className="pageContainer">
            <img src="/assets/loginBg.jpg" alt="login" />
            <Snackbar open={alert.open} autoHideDuration={4000} onClose={handleAlertClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleAlertClose} severity="error" variant='filled' sx={{ width: '100%' }}>
                    {alert.message}
                </Alert>
            </Snackbar>
            <div className="loginSignupCont">
                
            <div className="formContainer">
            <div className='display-flex-row align-item-center font-heading'> <img style={{width:"3rem"}} src="/assets/logo.png" alt="logo" /><span>Tutor</span><span className='font-blue'> Grabber</span></div>
                <div className="display-flex-row gap-3 align-item-center">
                <h1 className={`${mobileView ? "font-para" : "font-subHeading"}`}>Login as</h1>
                <div className="display-flex-row gap-2">
                    <div className={`userTag  font-subHeading ${userType === "student" && "active"}`} onClick={() => setUserType('student')}>Student</div>
                    <div className={`userTag  font-subHeading ${userType === "teacher" && "active"}`} onClick={() => setUserType('teacher')}>Teacher</div>
                </div>
                </div>
                <form onSubmit={login}  className='display-flex-col gap-3'>
                    <div className=' display-flex-col gap-1'>
                        <label >Email</label>
                        <input className='inputCont '
                            name='email'
                            value={email}
                            onBlur={handleBlur}
                            onChange={(e) => setEmail(e.target.value)}
                            required placeholder="Enter your email"
                        />

                    </div>
                    <div className=" display-flex-col gap-1" style={{ position: "relative" }}>
                        <label>Password</label>
                        <input className='inputCont' required
                            name='password' value={password}
                            type={hidePassword ? "password" : "text"}
                            placeholder='Enter you password'
                            onChange={(e) => setPassword(e.target.value)}

                        />
                        <div className='passwordIcon' onClick={() => setHidePassword(!hidePassword)}>{hidePassword ? <VisibilityOffRounded sx={{ color: "black" }} /> : <VisibilityRounded sx={{ color: "black" }} />}</div>
                    </div>
                    <button className='btn margin-top-1'
                        type='submit'>{isLoading ? <CircularProgress style={{ color: "black", width: "20px", height: "20px" }} /> : "Login"}</button>
                    <div className='margin-top-1'>Dont have an Account?. <p className='font-link' onClick={() => navigate('/signup')}> SignUp</p>here!</div>
                </form>
            </div>
            </div>
            
        </div>
    )
}

export default Login
