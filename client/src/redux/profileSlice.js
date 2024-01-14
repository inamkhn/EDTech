import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfile: null,
  error: null,
  loading: false,
  message:""
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {   
    updateProfileRequest: state => {   
        state.loading = true;
      },
      updateProfileSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      updateProfileFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
  
      updateProfilePictureRequest: state => {
        state.loading = true;
      },
      updateProfilePictureSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      updateProfilePictureFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
  
      changePasswordRequest: state => {
        state.loading = true;
      },
      changePasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      changePasswordFail: (state, action) => {   
        state.loading = false;
        state.error = action.payload;
      },
  
      forgetPasswordRequest: state => {
        state.loading = true;
      },
      forgetPasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      forgetPasswordFail: (state, action) => {  
        state.loading = false;                   
        state.error = action.payload;
      },
  
      resetPasswordRequest: state => {
        state.loading = true;
      },
      resetPasswordSuccess: (state, action) => {  resetPasswordSuccess
        state.loading = false;
        state.message = action.payload;
      },
      resetPasswordFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
  
      removeFromPlaylistRequest: state => {
        state.loading = true;
      },
      removeFromPlaylistSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      removeFromPlaylistFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
  
      clearError: state => {
        state.error = null;
      },
      clearMessage: state => {
        state.message = null;
      },
  },
});

// Action creators are generated for each case reducer function
export const { updateProfileRequest,updateProfileSuccess,updateProfileFail,updateProfilePictureRequest,
    updateProfilePictureSuccess,updateProfilePictureFail,changePasswordRequest,changePasswordSuccess,
    changePasswordFail,forgetPasswordRequest,forgetPasswordSuccess,forgetPasswordFail,resetPasswordSuccess,
    resetPasswordRequest,resetPasswordFail,removeFromPlaylistRequest,removeFromPlaylistSuccess,removeFromPlaylistFail,
    clearError,clearMessage
} = profileSlice.actions;

export default profileSlice.reducer;