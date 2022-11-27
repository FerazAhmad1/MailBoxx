import React from "react";
import { useDispatch } from "react-redux";

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

const MailInbox = ({
  allmail,
  composeState,
  url,
  yourEmail,
  deletefunction,
}) => {
  const dispatch = useDispatch();
  const deleteHandler = async (id) => {
    const response = await axios.delete(`${url}/${yourEmail}/${id}.json`);

    if (response.statusText === "OK") {
      dispatch(deletefunction(id));
      console.log("i am inside of status text");
    }
  };

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

            <Link to={`/mail/${mail.id}`} state={{ type: mail.mailType }}>
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
