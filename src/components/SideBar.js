import React from "react";
import "./SideBar.css";
import { useSelector, useDispatch } from "react-redux";
import { composeHandler } from "../features/EmailSlice";
import MailInbox from "./MailInbox";
const SideBar = () => {
  const dispatch = useDispatch();
  const composeClickHandler = () => {
    dispatch(composeHandler());
  };

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
          </div>
          <div className="sidebar__Inbox">
            <button className="sidebar__Inbox__button">Inbox</button>
          </div>
          <div className="sidebar__list__items__Container">
            <ul className="sidebar__unordered__list">
              <li className="sidebar__list__items__unread">Unread</li>
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
