// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        {/* You might want a default route for the root path "/" */}
        {/* <Route path="/" element={<LoginPage />} /> */}
        {/* And potentially a route for /home if users are redirected there */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;