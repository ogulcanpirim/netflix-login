import { getAuth, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useAuthState } from "../services/firebase";
import "../styles/Home.css";

export default function Home(props) {
  const { user } = useAuthState();

  useEffect(() => {
    document.title = "Netflix Home";
  }, []);

  const logOut = (e) => {
    signOut(getAuth());
    window.location.href = "/";
  };

  return (
    <div className="home">
      <div className="header">
        <img src="./images/logo.svg" height="45" width="167" alt="netflix-logo" />
      </div>
      <div className="container">
        <h2 id="welcome-message" style={{ color: "#fff" }}>Welcome, {user?.email || "logged with facebook !"}</h2>
        <button id="logout_button" className="logOut" onClick={logOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
