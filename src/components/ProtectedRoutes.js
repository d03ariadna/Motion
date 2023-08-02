import { Outlet, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Cookies from "js-cookie";

export function ProtectedRoutes() {
    const cookie = Cookies.get('Session');
    let auth = { 'token': true }
    
    return (cookie ?
        <>
            <Layout/>
        </>
        : <Navigate to='/'/>
    );
}

export function VerifySession() {
    const cookie = Cookies.get('Session');
    let auth = { 'token': true }
    
    return (cookie ?
        <Navigate to='/dashboard'/>
        : <Outlet/>
    );
}