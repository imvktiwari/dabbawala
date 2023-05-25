import React from 'react';
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
//pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
// import Marketplace from "./pages/Marketplace";
// import UploadForRent from "./pages/UploadForRent";
// import GetRequests from "./pages/GetRequests";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/marketplace" element={<Marketplace />} /> */}
          {/* <Route path="/uploadforrent" element={<UploadForRent />} />
        <Route path="/sellrequests" element={<SellRequests />} />
        <Route path="/getrequests" element={<GetRequests />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;