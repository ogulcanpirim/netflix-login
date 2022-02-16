import React from "react";
import '../styles/Home.css';
import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from '../services/firebase'

export default function Home(props) {

    const { user } = useAuthState()

    return (
        <div className="home">
            <div className="header">
                <img src="./images/logo.svg" height="45" width="167" alt="netflix-logo" />
            </div>
            <div className="container">
                <h2 style={{color: '#fff'}}>Welcome, {user?.email}</h2>
                <button className="logOut" onClick={() => signOut(getAuth())}>Sign Out</button>
            </div>
        </div>
    );
}