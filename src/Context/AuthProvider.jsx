import React, { useEffect, useState } from 'react';
import { AuthContext } from './Authcontext';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../Athentication/firebase';

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
     const [loading,setLoading]= useState(true)


     const logOut = () =>{
    setLoading(true)
    return signOut(auth)
}


  useEffect(()=>{
      const unSubsCribe = onAuthStateChanged(auth,async(currentUser)=>{
            setUser(currentUser);

            setLoading(false)
      })
      return()=>{
        unSubsCribe()
      }
  },[]) 



const userInfo = {
    user,
    setUser,
    logOut,
    loading,
    setLoading
} 



    return (
       <AuthContext value={userInfo}>
        {children}
       </AuthContext>
    );
};

export default AuthProvider;