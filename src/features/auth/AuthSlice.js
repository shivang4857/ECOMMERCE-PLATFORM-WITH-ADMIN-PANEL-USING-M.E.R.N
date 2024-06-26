import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  createUser ,checkUser , updateUser} from './AuthApi';


const initialState = {
    value: 0,
    loggedInUser: null,
    status: 'idle',
    error:null
  };

  export const createUserAsync = createAsyncThunk(
    'user/createUser',
    async (userData) => {
      const response = await createUser(userData);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );
   

  export const updateUserAsync = createAsyncThunk(
    'user/updateUser',
    async (update) => {
      const response = await updateUser(update);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );

  export const checkUserAsync = createAsyncThunk(
    'user/checkUser',
    async (loginInfo) => {
      const response = await checkUser(loginInfo);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );


  export const counterSlice = createSlice({
    name: 'user',
    initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
    })
    .addCase(checkUserAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.loggedInUser = action.payload;
    })
    .addCase(checkUserAsync.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error;
    })


    .addCase(updateUserAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(updateUserAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.loggedInUser = action.payload;
    })
},
});
export const { increment } = counterSlice.actions;

export const selectError = (state)=>state.auth.error;

export const selectLoggedInUser = (state)=>state.auth.loggedInUser;  
export default counterSlice.reducer;