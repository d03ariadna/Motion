import { Outlet, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Cookies from "js-cookie";

export function ProtectedRoutes() {
    //cookie modified in order to get access
    
    // const cookie = Cookies.get('Session');
    let cookie = true;
    
    return (cookie ?
        <>
            <Layout/>
        </>
        : <Navigate to='/'/>
    );
}

export function VerifySession() {
    //const cookie = Cookies.get('Session');
    let cookie = false;
    
    return (cookie ?
        <Navigate to='/dashboard'/>
        : <Outlet/>
    );
}