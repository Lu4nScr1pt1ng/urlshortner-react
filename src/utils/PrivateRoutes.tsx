import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = () => {
    const { token, verifyToken } = useAuth();

    if(token){
        verifyToken();
        return <Outlet />
    } else {
        return <Navigate to={"/login"} />
    }


}

export default PrivateRoutes;