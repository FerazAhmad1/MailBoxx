import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import emailReducer from "../features/EmailSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    email: emailReducer,
  },
});
export default store;
