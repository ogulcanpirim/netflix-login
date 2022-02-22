import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { initializeApp } from 'firebase/app'
import { useState, useEffect, useContext, createContext } from 'react'

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyDJoxLZS4yTCT9owd9qILyTpMqixdLHgXI",
    authDomain: "netflix-login-3b02c.firebaseapp.com",
    projectId: "netflix-login-3b02c",
    storageBucket: "netflix-login-3b02c.appspot.com",
    messagingSenderId: "1040182991586",
    appId: "1:1040182991586:web:f4eca502141930390fdcbb"
})

export const AuthContext = createContext()

export const AuthContextProvider = props => {
    const [user, setUser] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (user) => { setUser(user); setLoading(false); }, setError,)
        return () => unsubscribe()
    }, [])
    return <AuthContext.Provider value={{ user, error, loading }} {...props} />
}

export const useAuthState = () => {
    const auth = useContext(AuthContext)
    return { ...auth, isAuthenticated: auth.user != null, loading: auth.loading }
}