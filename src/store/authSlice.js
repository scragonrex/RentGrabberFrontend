import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user:null,
    token:null,
    url:"http://localhost:5000",
    courses:[],
    categories:[],
    teachers:[]
}

export const authSlice = createSlice({
    name:"auth", 
    initialState,
    reducers:{
        setLogin : (state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout : (state,action)=>{
            state.user = null;
            state.token = null;
        },
        setCourses : (state,action)=>{
            state.courses = action.payload.courses;
            state.categories = action.payload.categories;
        },
        setTeachers : (state,action)=>{
            state.teachers = action.payload;
        }
     
    }
})
 
export const { setLogin, setLogout, setCourses, setTeachers} = authSlice.actions;
export default authSlice.reducer;