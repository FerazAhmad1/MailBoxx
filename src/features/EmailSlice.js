import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subject: "",
  reciever: "",
  message: "",
};
const EmailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    inbox: (state, action) => {
      state.message = action.payload.message;
      state.reciever = action.payload.reciever;
      state.subject = action.payload.subject;
    },
  },
});

export default EmailSlice.reducer;

export const { inbox } = EmailSlice.actions;
