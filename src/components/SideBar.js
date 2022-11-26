import React, { useEffect, useState } from "react";
import "./SideBar.css";
import { useSelector, useDispatch } from "react-redux";
import { composeHandler } from "../features/EmailSlice";
import MailInbox from "./MailInbox";
const SideBar = () => {
  const dispatch = useDispatch();
  const [unread, setUnread] = useState(0);
  const composeClickHandler = () => {
    dispatch(composeHandler());
  };
  const inbox = useSelector((state) => state.email.Inboxmail);
  useEffect(() => {
    const count = inbox.reduce((acc, mail) => {
      console.log(acc, mail);
      if (mail.read === false) {
        return acc + 1;
      }
      return acc;
    }, 0);
    console.log(count);

    setUnread(count);
  }, [inbox]);

  return (
    <>
      <div className="sidebar">
        <div className="sidebar__list">
          <div className="sidebar__Compose">
            <button
              onClick={composeClickHandler}
              className="sidebar__Compose__button">
              Compose
            </button>
            {console.log("i have a call")}
          </div>
          <div className="sidebar__Inbox">
            <button className="sidebar__Inbox__button">Inbox</button>
          </div>
          <div className="sidebar__list__items__Container">
            <ul className="sidebar__unordered__list">
              <li className="sidebar__list__items__unread">Unread {unread} </li>
              <li className="sidebar__list__items__Starred">Starred</li>
              <li className="sidebar__list__items__Draft">Draft</li>
              <li className="sidebar__list__items__Sent">Sent</li>
              <li className="sidebar__list__items__Archiev">Archiev</li>
              <li className="sidebar__list__items__Spam">Spam</li>
              <li className="sidebar__list__items__deletedItems">
                Deleted Items
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
