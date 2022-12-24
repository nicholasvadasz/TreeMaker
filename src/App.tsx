import React from "react";
import "./App.css";
import CmasTree from "./CmasTree";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<CmasTree />} />
          <Route path="/:name" element={<CmasTree />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
