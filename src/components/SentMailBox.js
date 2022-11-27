import React, { useEffect } from "react";
import MailInbox from "./MailInbox";
import { sentMail } from "../features/EmailSlice";
import { loginMethod } from "../features/authSlice";
import { deleteSent } from "../features/EmailSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const SentMailBox = () => {
  const allmail = useSelector((state) => state.email.sentmails);
  const dispatch = useDispatch();
  const composeState = useSelector((state) => state.email.composeState);
  const authState = useSelector((state) => state.auth);
  const yourEmail = useSelector((state) => state.auth.email).replace(
    /[^a-zA-Z0-9]/g,
    ""
  );
  const url = "https://mailbox-9dd04-default-rtdb.firebaseio.com/sentmails";

  useEffect(() => {
    const getsentBox = async () => {
      if (!yourEmail) return;
      const response = await axios.get(
        `https://mailbox-9dd04-default-rtdb.firebaseio.com/sentmails/${yourEmail}.json`
      );
      const data = await response.data;
      if (data) {
        var ob = Object.keys(data);
        console.log("i am if data");
      } else {
        ob = null;
        console.log("inside else");
        dispatch(sentMail([]));
      }
      if (ob) {
        const data = response.data;
        console.log(data);
        const keyarr = Object.keys(data);
        const newdata = keyarr.map((key) => ({ ...data[key], id: key }));
        console.log(newdata);
        dispatch(sentMail(newdata));
      }
    };
    getsentBox();
  }, [authState, composeState]);

  useEffect(() => {
    dispatch(
      loginMethod({
        token: localStorage.getItem("token"),
        email: localStorage.getItem("email"),
      })
    );
  }, []);

  return (
    <div>
      <MailInbox
        allmail={allmail}
        composeState={composeState}
        url={url}
        yourEmail={yourEmail}
        deletefunction={deleteSent}
      />
    </div>
  );
};

export default SentMailBox;
