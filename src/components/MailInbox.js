import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InboxHandler } from "../features/EmailSlice";
import { loginMethod, emailSetupMethod } from "../features/authSlice";
import EmailCompose from "./EmailCompose";
import axios from "axios";
import "./MailInbox.css";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const MailInbox = () => {
  const authState = useSelector((state) => state.auth);
  const yourEmail = useSelector((state) => state.auth.email).replace(
    /[^a-zA-Z0-9]/g,
    ""
  );
  const allmail = useSelector((state) => state.email.Inboxmail);
  const composeState = useSelector((state) => state.email.composeState);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("i have call");
    if (!yourEmail) return;
    const getallmail = async () => {
      const response = await axios.get(
        `https://mailbox-9dd04-default-rtdb.firebaseio.com/${yourEmail}.json`
      );
      const data = response.data;
      console.log(yourEmail);
      if (Object.keys(data)) {
        const keyarr = Object.keys(data);
        const newdata = keyarr.map((key) => ({ ...data[key], id: key }));
        console.log(newdata);
        dispatch(InboxHandler(newdata));
      }
    };
    getallmail();
  }, [authState]);

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
    <div className="mailInbox__container">
      {console.log("yes")}
      {allmail.map((mail) => {
        return (
          <div className="mailInox__Container__foroneMail">
            <div className="mailInbox__container__prefixIcon">
              <CheckBoxOutlineBlankIcon />
              <StarOutlineIcon />
              <LabelImportantIcon />
              <p className="sender">{mail.sender}</p>
            </div>
            <div className="mailSubject">
              <p>{mail.message}</p>
            </div>
            <div>
              <ArchiveIcon />
              <DeleteOutlineIcon />
            </div>
          </div>
        );
      })}
      {composeState && <EmailCompose />}
    </div>
  );
};

export default MailInbox;
