import React, { useEffect, useRef, useState } from "react";
import "./EmailCompose.css";
import { Editor, EditorState } from "react-draft-wysiwyg";

import "draft-js/dist/Draft.css";
import { useDispatch, useSelector } from "react-redux";
import { sentMail, allrcvHandler } from "../features/EmailSlice";
import axios from "axios";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TextEditor from "./TextEditor";

const EmailCompose = () => {
  const [editorState, setEditorState] = useState();
  const subjectRef = useRef();
  const reciverRef = useRef();
  const sentmails = useSelector((state) => state.email.sentmails);

  const sender = useSelector((state) => state.auth.email);

  const dispatch = useDispatch();
  const clickHandler = async () => {
    const reciver = reciverRef.current.value.replace(/[^a-zA-Z0-9]/g, "");
    console.log(reciver);
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDay();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    const mailItem = {
      subject: subjectRef.current.value,
      reciever: reciverRef.current.value,
      message: editorState,
      sender: sender,
      month,
      day,
      year,
      hour,
      minute,
      second,
      read: false,
    };

    const response = await fetch(
      `https://mailbox-9dd04-default-rtdb.firebaseio.com/${reciver}.json`,
      {
        method: "POST",
        body: JSON.stringify(mailItem),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log(response, data);
      dispatch(sentMail(mailItem));
    }
  };

  useEffect(() => {
    const allsentemails = async () => {
      axios.put(
        "https://mailbox-9dd04-default-rtdb.firebaseio.com/sentmails.json",
        sentmails
      );
    };
    allsentemails();
  }, [sentmails]);

  // useEffect(() => {
  //   const identifire = setTimeout((event) => {
  //     console.log(editorState);
  //     setEditorState(event.blocks[0].text);
  //   }, 1000);

  //   return clearTimeout(identifire);
  // }, editorState);
  const changeHandler = (event) => {
    console.log("yes");
    setEditorState(event.blocks[0].text);
    console.log(event.blocks[0].text);
  };
  return (
    <div className="wrapperEditor">
      <div className="Editor__container">
        <div className="Editor__container__torciver">
          <label className="labelto">To</label>
          <input
            placeholder="@example.com"
            className="Editor__container__input__rciver"
            ref={reciverRef}
          />
        </div>
        <div className="Editor__container__subject">
          <label className="labelSubject">subject</label>
          <input
            className="Editor__container__input__subject"
            type="text"
            placeholder="subject"
            ref={subjectRef}
          />
        </div>
        <Editor
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onChange={changeHandler}
          value={editorState}
        />
        {/* <TextEditor /> */}
      </div>
      <button className="senderbutton" onClick={clickHandler}>
        Send
      </button>
    </div>
  );
};

export default EmailCompose;
