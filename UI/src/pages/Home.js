import React from "react";
import '../styles/Home.css';
import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from '../services/firebase'

export default function Home(props) {

    const { user } = useAuthState()
    
    return (
        <div>
            <h2>Welcome, {user?.email}</h2>
            <button onClick={() => signOut(getAuth())} style={{backgroundColor: '#ff0000', padding: 30} }>Sign Out</button>
        </div>
    );
}