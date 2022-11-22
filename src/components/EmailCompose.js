import React, { useEffect, useRef, useState } from "react";
import "./EmailCompose.css";
import { Editor, EditorState } from "react-draft-wysiwyg";
import { useDispatch, useSelector } from "react-redux";
import { inbox } from "../features/EmailSlice";
import axios from "axios";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EmailCompose = () => {
  const [editorState, setEditorState] = useState("");
  const subjectRef = useRef();
  const reciverRef = useRef();
  const email = useSelector((state) => state.email);
  const reciver = useSelector((state) => state.email.reciever).replace(
    /[^a-zA-Z0-9]/g,
    ""
  );
  console.log(reciver);
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(
      inbox({
        subject: subjectRef.current.value,
        reciever: reciverRef.current.value,
        message: editorState,
      })
    );
  };

  useEffect(() => {
    axios.post(
      `https://mailbox-9dd04-default-rtdb.firebaseio.com/${reciver}.json`,
      email
    );
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
  };
  return (
    <div className="Editor__container">
      <div>
        <label>To</label>
        <input className="Editor__container__input" ref={reciverRef} />
      </div>
      <div>
        <label>subject</label>
        <input
          className="Editor__Container__input"
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
      <button onClick={clickHandler}>Send</button>;
    </div>
  );
};

export default EmailCompose;
