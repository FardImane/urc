// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
 name : 'authetif',
 initialState : {
  users: []
},
 reducers : {
 
  setUsers : (state,action) => {
      state.users = action.payload
  }

 }
});

export const {setUsers} = authSlice.actions;
export default authSlice.reducer;










