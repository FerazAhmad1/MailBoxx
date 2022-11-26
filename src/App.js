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
                <MailInbox />
              </div>
            </>
          }></Route>
        <Route path="/welcome" element={<EmailCompose />} />
      </Routes>
    </div>
  );
}

export default App;
