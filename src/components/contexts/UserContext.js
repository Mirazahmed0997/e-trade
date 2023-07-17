import React, { createContext, useEffect, useState } from 'react';
import app from '../../firebase/Firebase.init';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut} from 'firebase/auth'


export const Authcontext=createContext();

const auth= getAuth(app)

const UserContext = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)


    const createUser=(email,password)=>
    {   setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signIn=(email,password)=>
    {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut=()=>
    {   setLoading(true)
        return signOut(auth)
    }

    useEffect(()=>
    {
       const unSubscribe= onAuthStateChanged(auth,CurrentUser =>
            {
                console.log(CurrentUser)
                setUser(CurrentUser)
                setLoading(false)
            })
            return ()=> unSubscribe();
       
    },[])

  
    // const emailVarification=()=>
    // {
    //     return sendEmailVerification(auth.currentUser)
    // }

    const authInfo={user,createUser,signIn, logOut,loading}
    return (
        <Authcontext.Provider value={authInfo}>
            {children}
        </Authcontext.Provider>
    );
};

export default UserContext;