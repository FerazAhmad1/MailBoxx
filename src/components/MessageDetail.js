import React, { useEffect } from "react";
import "./MessageDetail.css";
import { markRead } from "../features/EmailSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import { useParams } from "react-router";

const MessageDetail = () => {
  console.log("before inbox mail");
  const dispatch = useDispatch();
  const InboxMail = useSelector((state) => state.email.Inboxmail);
  console.log("after inbox mail");
  console.log(InboxMail);
  const { mailId } = useParams();

  const yourEmail = useSelector((state) => state.auth.email).replace(
    /[^a-zA-Z0-9]/g,
    ""
  );
  console.log(yourEmail);
  const index = InboxMail.findIndex((mail) => mail.id === mailId);
  const mail = InboxMail[index];
  useEffect(() => {
    if (mail.read) return;
    dispatch(markRead(index));
  }, []);

  useEffect(() => {
    if (mail.read) return;
    const updateData = async () => {
      const response = await axios.patch(
        `https://mailbox-9dd04-default-rtdb.firebaseio.com/${yourEmail}/${mailId}.json`,
        { read: true }
      );
      // const inboxresponse=  await axios.get(
      //     `https://mailbox-9dd04-default-rtdb.firebaseio.com/${yourEmail}.json`
      //   );
      //   const data = inboxresponse.data
      //   if (inboxresponse.statusText === 'ok')
      //   {
      //     const keyarr = Object.keys(data);
      //     const newdata = keyarr.map((key) => ({ ...data[key], id: key }));
      //     console.log(newdata);
      //     dispatch(InboxHandler(newdata));
      //   }
    };
    updateData();
  }, []);
  return (
    <div className="messageDetail">
      <div className="messageDetail__subject">
        <p>{mail.subject}</p>
        <LabelImportantIcon className="messageDetail__labelImportantIcon" />
      </div>
      <div className="messageDetail__sender">
        <p>{mail.sender}</p>
        <p>{mail.time}</p>
      </div>
      <div className="messageDetail__message">
        <p>{mail.message}</p>
      </div>
    </div>
  );
};

export default MessageDetail;
