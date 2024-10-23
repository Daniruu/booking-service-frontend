import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider } from './context/AuthContext';
import { UserProvider, useUser } from './context/UserContext';
import { BusinessProvider } from './context/BusinessContext';
import { BookingProvider } from './context/BookingContext';
import { BusinessAccountProvider } from './context/BusinessAccountContext';
import { EmployeeProvider } from './context/EmployeeContext';
import { ServiceProvider } from './context/ServiceContext';
import Notification from './components/layout/Notification/Notification';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import HomePage from './pages/Home/HomePage/HomePage';
import BusinessPage from './pages/Business/BusinessPage/BusinessPage';
import LoginPage from './pages/Login/LoginPage/LoginPage';
import RegisterPage from './pages/Register/RegisterPage/RegisterPage';
import UserProfile from './pages/Account/User/UserProfile/UserProfile';
import BusinessProfile from './pages/Account/Business/BusinessProfile/BusinessProfile';
import AddBusinessPage from './pages/AddBusiness/AddBusinessPage/AddBusinessPage';
import { ClipLoader } from 'react-spinners';
import { createTheme, ThemeProvider } from '@mui/material';
import './App.css';

const theme = createTheme({
  typography: {
    fontFamily: '"Manrope", sans-seerif',
  },
});

function App() {
  return (
    <>
    <NotificationProvider>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <UserProvider>
            <BusinessProvider>
              <BookingProvider>
                <BusinessAccountProvider>
                  <EmployeeProvider>
                    <ServiceProvider>
                      <Router>
                        <Header />
                        <Notification />
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
                          <Route path='/account/user' element={
                            <RequireAuth>
                              <UserProfile />
                            </RequireAuth>
                          } />
                          <Route path='/account/business' element={
                            <RequireAuth>
                              <BusinessProfile />
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
                        <Footer />
                      </Router>
                    </ServiceProvider>
                  </EmployeeProvider>
                </BusinessAccountProvider>
              </BookingProvider>
            </BusinessProvider>
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </NotificationProvider>
    </>
  );
}

const RequireAuth = ({ children }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to='/login' />;
  }

  return children;
};

const RedirectIfAuthenticated = ({ children }) => {
  const { user, loading } = useUser();

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
