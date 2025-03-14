import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignupPage from './components/Signup';
import LoginPage from './components/Loginpage';
import LandingPage from './screen/LandingPage';
import Layout from './components/Layout';
import Groups from './screen/Groups';
import Chat from './screen/Chat';
import Voice from './screen/Voice';
import Search from './screen/Search';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('token');
  return isAuthenticated ? element : <Navigate to="/login" />;
};




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
         <Route path="/" element={<LandingPage />} />
         {/* <Route path="/chat" element={<PrivateRoute element={<Mainpage />} />} /> */}
         <Route path="/dashboard"element={<PrivateRoute element={<Layout/>} />}>
            <Route path="groups" element={<Groups/>}/>
            <Route path="chat" element={<Chat/>}/>
            <Route path="voice" element={<Voice/>}/>
            <Route path="search" element={<Search/>}/>
         </Route>
         <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
