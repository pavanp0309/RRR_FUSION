import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user:null, // user data from firebase;
    isAuthenticated:false,
    role:null // user admin superadmin
  }

  const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        // 1.setting the user (register and login)
        setUser:(state,action)=>{
            // destructing the neccessary values form the payload
          const {uid,displayName,email,phoneNumber,photoURL}=action.payload;
          state.user={uid,displayName,email,phoneNumber,photoURL};
          state.isAuthenticated=true
          
          // check the weather user details (optional)
          console.log(state.user)

        },
        // logout reducer 
        logout:(state)=>{
            state.user=null, 
            state.isAuthenticated=false,
            state.role=null 
        },
        // user Role updating reducer 
        setRole:(state,action)=>{
             state.role=action.payload
        }
    }
  })

  export const {setUser,logout,setRole}=authSlice.actions;
  export default authSlice.reducer