import React, { useContext } from 'react';
import { AuthContext } from '../Context/Authcontext';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Components/Loading';

const PrivetRouter = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const location = useLocation();


    if(loading){
        return <Loading></Loading>
    }
    if(!user){
        return <Navigate state={location.pathname} to="/signup"></Navigate>
    }

    return children;
};

export default PrivetRouter;