import Login from "./components/Login";
import Welcome from "./components/Welcome";
import { Routes, Route } from "react-router";
import "./App.css";
import EmailCompose from "./components/EmailCompose";

function App() {
  return (
    <div className="App">
      <EmailCompose />
      {/* <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes> */}
    </div>
  );
}

export default App;
