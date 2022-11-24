import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subject: "",
  reciever: "",
  message: "",
  time: "",
  date: "",
  allrcv: [],
  Inboxmail: [],
  composeState: false,
};
const EmailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    sentMail: (state, action) => {
      state.message = action.payload.message;
      state.reciever = action.payload.reciever;
      state.subject = action.payload.subject;
      state.time = action.payload.time;
      state.date = action.payload.date;
    },

    allrcvHandler: (state, action) => {
      const rcv = action.payload;
      const index = state.allrcv.findIndex((emailid) => emailid === rcv);
      if (index < 0) {
        state.allrcv.push(rcv);
      }
    },
    InboxHandler: (state, action) => {
      state.Inboxmail = action.payload;
    },
    composeHandler: (state, action) => {
      state.composeState = !state.composeState;
    },
  },
});

export default EmailSlice.reducer;

export const { sentMail, allrcvHandler, InboxHandler, composeHandler } =
  EmailSlice.actions;
