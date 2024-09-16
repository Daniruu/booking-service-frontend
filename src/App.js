import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { ClipLoader } from 'react-spinners';
import HomePage from './pages/Home/HomePage/HomePage';
import LoginPage from './pages/Login/LoginPage/LoginPage';
import RegisterPage from './pages/Register/RegisterPage/RegisterPage';
import UserPage from './pages/User/UserPage/UserPage';
import BusinessManagementPage from './pages/Business/BusinessManagementPage/BusinessManagementPage';
import Header from './components/layout/Header';
import AddBusinessPage from './pages/AddBusiness/AddBusinessPage/AddBusinessPage';
import BusinessPage from './pages/BusinessPage/BusinessPage';
import './App.css';

function App() {
  return (
    <>
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path='/login' element={
            <RedirectIfAuthenticated>
              <LoginPage />
            </RedirectIfAuthenticated>
          } />
          <Route path='/register' element={
            <RedirectIfAuthenticated>
              <RegisterPage />
            </RedirectIfAuthenticated>
          } />
          <Route path='/user' element={
            <RequireAuth>
              <UserPage />
            </RequireAuth>
          } />
          <Route path='/business' element={
            <RequireAuth>
              <BusinessManagementPage />
            </RequireAuth>
          } />
          <Route path='/business/:businessId' element={
            <BusinessPage />
          } />
          <Route path='/add-business' element={
            <AddBusinessPage />
          } />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </Router>
    </AuthProvider>
    </>
  );
}

const RequireAuth = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="spinner-container">
        <ClipLoader color={"#007bff"} loading={loading} size={50} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to='/login' />;
  }

  return children;
};

const RedirectIfAuthenticated = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="spinner-container">
        <ClipLoader color={"#007bff"} loading={loading} size={50} />
      </div>
    );
  }

  if (user) {
    return <Navigate to='/' />;
  }

  return children;
}

export default App;
