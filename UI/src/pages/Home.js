import React, { useEffect } from "react";
import '../styles/Home.css';
import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from '../services/firebase'

export default function Home(props) {

    const { user } = useAuthState()

    useEffect(() => {
        document.title = "Netflix Home";
    }, [])

    const logOut = (e) => {
        signOut(getAuth());
        window.location.href="/";
    }

    return (
        <div className="home">
            <div className="header">
                <img src="./images/logo.svg" height="45" width="167" alt="netflix-logo" />
            </div>
            <div className="container">
                <h2 style={{color: '#fff'}}>Welcome, {user?.email}</h2>
                <button id="logout_button" className="logOut" onClick={logOut}>Sign Out</button>
            </div>
        </div>
    );
}