import React from "react";
import {Outlet, Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";


export default function ProtectedRouteAuthCheck() {

    const location = useLocation()
    const isLoggedIn = useSelector((state: RootState) => state.authentication.isLoggedIn)

    return (
        isLoggedIn
            ? <Outlet/>
            : <Navigate to={'/authentication'} state={{fromLocation: location}} replace/>
    )
}
