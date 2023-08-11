import Header from "./Header"
import { Outlet } from "react-router-dom"

import { TasksProvider } from "../context/TasksContext"

export default function Layout() {
    return (
        <>
            <Header />
            <TasksProvider>
                <main className="bg-gray-200 min-h-screen pl-28 pt-6 pr-10 mx-auto font-popp">
                    <Outlet/>
                </main> 
            </TasksProvider>
        </>
    )
}