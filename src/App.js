import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <>
    <Header />
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>

    <Footer />
    </>
  );
}

export default App;
