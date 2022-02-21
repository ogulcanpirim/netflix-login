import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import { useAuthState } from './services/firebase';

function Main() {
  const { isAuthenticated } = useAuthState();
  return isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/signin" />;
} 

export default function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Main/>}/>
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}