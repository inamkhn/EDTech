import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  subscriptionId:"",
  message:""
};

export const subscribeSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    buySubscriptionRequest: state => {
        state.loading = true;
      },
      buySubscriptionSuccess: (state, action) => {
        state.loading = false;
        state.subscriptionId = action.payload;
      },
      buySubscriptionFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      cancelSubscriptionRequest: state => {
        state.loading = true;
      },
      cancelSubscriptionSuccess: (state, action) => {
        state.loading = false;   
        state.message = action.payload;
      },
      cancelSubscriptionFail: (state, action) => {
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
export const { buySubscriptionRequest,buySubscriptionSuccess,buySubscriptionFail,cancelSubscriptionRequest,
    cancelSubscriptionSuccess,cancelSubscriptionFail,clearError,clearMessage
} = subscribeSlice.actions;

export default subscribeSlice.reducer;