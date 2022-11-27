import React, { useEffect } from "react";
import "./MessageDetail.css";
import { markRead } from "../features/EmailSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import { useLocation, useParams } from "react-router";

const MessageDetail = () => {
  const location = useLocation();
  const type = location.state.type;
  const dispatch = useDispatch();
  const InboxMail = useSelector((state) => state.email.Inboxmail);
  const sentboxMail = useSelector((state) => state.email.sentmails);
  console.log("after inbox mail");
  console.log(InboxMail);
  const { mailId } = useParams();

  const yourEmail = useSelector((state) => state.auth.email).replace(
    /[^a-zA-Z0-9]/g,
    ""
  );
  console.log(yourEmail);
  const Inboxindex = InboxMail.findIndex((mail) => mail.id === mailId);
  const sentBoxindex = sentboxMail.findIndex((mail) => mail.id === mailId);
  const mail =
    type === "sent" ? sentboxMail[sentBoxindex] : InboxMail[Inboxindex];
  console.log(mail, Inboxindex);
  useEffect(() => {
    if (type === "sent") return;
    if (mail.read) return;
    dispatch(markRead(Inboxindex));
  }, []);

  useEffect(() => {
    if (type === "sent") return;
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
