import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/users/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  // middleware-redux-thunk(rtk-query)
});

export default store;
