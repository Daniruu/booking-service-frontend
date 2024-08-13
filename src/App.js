import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import './App.css';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import UserPage from './pages/User/UserPage';
import BusinessPage from './pages/Business/BusinessPage';
import Header from './components/layout/Header';


function App() {

  return (
    <>
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/user' element={
            <RequireAuth>
              <UserPage />
            </RequireAuth>
          } />
          <Route path='/business' element={<BusinessPage />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </Router>
    </AuthProvider>
    </>
  );
}

const RequireAuth = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to='/login' />;
  }

  return children;
};



export default App;
