import React from "react";
import MailInbox from "./MailInbox";
import { useEffect } from "react";
import axios from "axios";
import { deleteMail } from "../features/EmailSlice";
import { useSelector, useDispatch } from "react-redux";
import { loginMethod, emailSetupMethod } from "../features/authSlice";
import { InboxHandler } from "../features/EmailSlice";

const InboxList = () => {
  const allmail = useSelector((state) => state.email.Inboxmail);
  const composeState = useSelector((state) => state.email.composeState);
  const authState = useSelector((state) => state.auth);
  const yourEmail = useSelector((state) => state.auth.email).replace(
    /[^a-zA-Z0-9]/g,
    ""
  );
  const dispatch = useDispatch();
  const url = " https://mailbox-9dd04-default-rtdb.firebaseio.com";

  useEffect(() => {
    console.log("i have call");
    if (!yourEmail) return;

    getallmail();
    //
  }, [authState]);

  const getallmail = async () => {
    const response = await axios.get(
      `https://mailbox-9dd04-default-rtdb.firebaseio.com/${yourEmail}.json`
    );
    const data = await response.data;
    if (data) {
      var ob = Object.keys(data);
      console.log("i am if data");
    } else {
      ob = null;
      console.log("inside else");
      dispatch(InboxHandler([]));
    }
    if (ob) {
      const data = response.data;
      console.log(data);
      const keyarr = Object.keys(data);
      const newdata = keyarr.map((key) => ({ ...data[key], id: key }));
      console.log(newdata);
      dispatch(InboxHandler(newdata));
    }
  };

  // setInterval(getallmail, 5000);

  useEffect(() => {
    dispatch(emailSetupMethod(localStorage.getItem("email")));
    dispatch(
      loginMethod({
        token: localStorage.getItem("token"),
        email: localStorage.getItem("email"),
      })
    );
  }, []);

  return (
    <MailInbox
      allmail={allmail}
      composeState={composeState}
      url={url}
      yourEmail={yourEmail}
      deletefunction={deleteMail}
    />
  );
};

export default InboxList;
