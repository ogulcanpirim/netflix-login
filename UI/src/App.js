import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import { useAuthState } from './services/firebase';

export default function App() {

  const { isAuthenticated, loading } = useAuthState();

  if (loading)
    return (
      <div style={{display: 'flex', backgroundColor: '#000'}}/>
    );

  return (
    <BrowserRouter>
      <Routes>
        {!isAuthenticated && <Route exact path="/signin" element={<SignIn />} />}
        {isAuthenticated && <Route exact path="/home" element={<Home />} />}
        <Route exact path="*" element={isAuthenticated ? <Navigate to="/home"/> : <Navigate to="/signin"/>} />
      </Routes>
    </BrowserRouter>
  );
}