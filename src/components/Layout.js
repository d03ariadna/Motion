import Header from "./Header"
import { Outlet } from "react-router-dom"

export default function Layout() {
    return (
        <>
            <Header />
            <main className="bg-gray-200 min-h-screen pl-28 pt-6 pr-10 mx-auto font-popp">
                <Outlet/>
            </main> 
            
        </>
    )
}