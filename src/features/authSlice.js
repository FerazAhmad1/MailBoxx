import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedin: false,
  token: "",
  email: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginMethod: (state, action) => {
      console.log(action);
      state.token = action.payload;
      state.isLoggedin = !!state.token;
    },

    logoutMethod: (state, action) => {
      state.token = action.payload;
      state.isLoggedin = !!state.token;
    },
    emailSetupMethod: (state, action) => {
      state.email = action.payload;
      console.log(state.email);
    },
  },
});
export default authSlice.reducer;
export const { loginMethod, logoutMethod, emailSetupMethod } =
  authSlice.actions;
