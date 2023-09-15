import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user:null,
    token:null,
    url:"http://localhost:5000",
}

export const authSlice = createSlice({
    name:"auth", 
    initialState,
    reducers:{
        setLogin : (state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.score = action.payload.user.score;
        },
        setLogout : (state,action)=>{
            state.user = null;
            state.token = null;
        },
     
    }
})

export const { setLogin, setLogout} = authSlice.actions;
export default authSlice.reducer;