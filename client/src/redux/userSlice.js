import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  isAuthenticated:false
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {  
    signinStart: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
    },
    signinSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    signinFailure: (state, action) => {
      state.error = action.payload;
      state.isAuthenticated = false;
      state.loading = true;
    },
    updateStart: (state) => {
      state.loading = true;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteStart: (state) => {
      state.loading = true;
    },
    deleteSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutStart: (state) => {
      state.loading = true;
      state.isAuthenticated = true;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    signOutFailure: (state, action) => {
      state.error = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    }
  },
});

// Action creators are generated for each case reducer function
export const { signinStart, signinSuccess, signinFailure,
  updateStart,updateSuccess,updateFailure,
  deleteStart,deleteSuccess,deleteFailure,
  signOutStart,signOutSuccess,signOutFailure } = userSlice.actions;

export default userSlice.reducer;