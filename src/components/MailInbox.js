import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InboxHandler } from "../features/EmailSlice";
import { deleteMail } from "../features/EmailSlice";
import { loginMethod, emailSetupMethod } from "../features/authSlice";
import EmailCompose from "./EmailCompose";
import { Link } from "react-router-dom";
import axios from "axios";
import "./MailInbox.css";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const MailInbox = () => {
  const [deleteid, setdeleteId] = useState("");
  const authState = useSelector((state) => state.auth);
  const yourEmail = useSelector((state) => state.auth.email).replace(
    /[^a-zA-Z0-9]/g,
    ""
  );
  const emailState = useSelector((state) => state.email);
  const allmail = useSelector((state) => state.email.Inboxmail);
  const composeState = useSelector((state) => state.email.composeState);
  const dispatch = useDispatch();
  const deleteHandler = async (id) => {
    const response = await axios.delete(
      `https://mailbox-9dd04-default-rtdb.firebaseio.com/${yourEmail}/${id}.json`
    );

    if (response.statusText === "OK") {
      dispatch(deleteMail(id));
      console.log("i am inside of status text");
      setdeleteId(id);
    }
  };
  useEffect(() => {
    console.log("i have call");
    if (!yourEmail) return;
    const getallmail = async () => {
      const response = await axios.get(
        `https://mailbox-9dd04-default-rtdb.firebaseio.com/${yourEmail}.json`
      );

      console.log(yourEmail);
      if (response.statusText === "OK" && response.data) {
        const data = response.data;
        const keyarr = Object.keys(data);
        const newdata = keyarr.map((key) => ({ ...data[key], id: key }));
        console.log(newdata);
        dispatch(InboxHandler(newdata));
      }
    };
    getallmail();
  }, [authState, deleteid]);

  useEffect(() => {
    dispatch(emailSetupMethod(localStorage.getItem("email")));
    dispatch(
      loginMethod({
        token: localStorage.getItem("token"),
        email: localStorage.getItem("email"),
      })
    );
  }, []);
  console.log("i am mailInbox ");
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
            </div>

            <Link to={`/mail/${mail.id}`}>
              <div className="mailList">
                <div>
                  <p className="sender">
                    {!mail.read && (
                      <span className="markasread">
                        <RadioButtonUncheckedIcon className="radiobutton" />
                      </span>
                    )}
                    {mail.sender}
                  </p>
                </div>
                <div className="mailSubject">
                  <p>{mail.message}</p>
                </div>
              </div>
            </Link>

            <div>
              <ArchiveIcon />
              <button
                onClick={(e) => {
                  deleteHandler(mail.id);
                }}>
                <DeleteOutlineIcon />
              </button>
            </div>
          </div>
        );
      })}
      {composeState && <EmailCompose />}
    </div>
  );
};

export default MailInbox;
