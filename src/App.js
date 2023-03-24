import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";
import SocketContext from "./context/SocketContext";
//Pages
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
//socket io
const socket = io(process.env.REACT_APP_API_ENDPOINT.split("/api/v1")[0]);

function App() {
  return (
    <div className="dark">
      <SocketContext.Provider value={socket}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home socket={socket} />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </Router>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
