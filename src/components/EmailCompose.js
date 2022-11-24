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
  const email = useSelector((state) => state.email);

  const reciver = useSelector((state) => state.email.reciever).replace(
    /[^a-zA-Z0-9]/g,
    ""
  );
  const sender = useSelector((state) => state.auth.email);
  console.log(reciver);
  const dispatch = useDispatch();
  const clickHandler = () => {
    const dateAndTime = new Date().toLocaleString().split(" ");
    dispatch(
      sentMail({
        subject: subjectRef.current.value,
        reciever: reciverRef.current.value,
        message: editorState,
        sender: sender,
        time: dateAndTime[1] + " " + dateAndTime[2],
        date: dateAndTime[0],
      })
    );
  };

  useEffect(() => {
    const allsentemails = async () => {
      const response = await fetch(
        `https://mailbox-9dd04-default-rtdb.firebaseio.com/${reciver}.json`,
        {
          method: "POST",
          body: JSON.stringify(email),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        dispatch(allrcvHandler(reciver));
      }
    };
    allsentemails();
  }, [email]);

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
