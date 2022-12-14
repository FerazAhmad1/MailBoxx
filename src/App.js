import Login from "./components/Login";
import Welcome from "./components/Welcome";
import { Routes, Route } from "react-router";
import "./App.css";
import EmailCompose from "./components/EmailCompose";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import TextEditor from "./components/TextEditor";
import MailInbox from "./components/MailInbox";
import MessageDetail from "./components/MessageDetail";
import InboxList from "./components/InboxList";
import SentMailBox from "./components/SentMailBox";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/mail/:mailId" element={<MessageDetail />}></Route>
        <Route path="/" element={<Login />} />
        <Route
          path="/Inbox"
          element={
            <>
              <Header />
              <div className="app__page">
                <SideBar />
                <InboxList />
              </div>
            </>
          }></Route>

        <Route
          path="/SentBox"
          element={
            <>
              <Header />
              <div className="app__page">
                <SideBar />

                <SentMailBox />
              </div>
            </>
          }></Route>
        <Route path="/welcome" element={<EmailCompose />} />
      </Routes>
    </div>
  );
}

export default App;
