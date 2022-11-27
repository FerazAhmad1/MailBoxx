import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sentmails: [],
  allrcv: [],
  Inboxmail: [],
  composeState: false,
};
const EmailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    sentMail: (state, action) => {
      state.sentmails = action.payload;
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
    markRead: (state, action) => {
      state.Inboxmail[action.payload].read = true;
    },
    deleteMail: (state, action) => {
      state.Inboxmail = state.Inboxmail.filter(
        (mail) => mail.id !== action.payload
      );
    },
    deleteSent: (state, action) => {
      state.sentmails = state.sentmails.filter(
        (mail) => mail.id !== action.payload
      );
    },
  },
});

console.log("I am EmailSlice");
export default EmailSlice.reducer;

export const {
  sentMail,
  allrcvHandler,
  InboxHandler,
  composeHandler,
  markRead,
  deleteMail,
  deleteSent,
} = EmailSlice.actions;
