import Header from "./Header";
import { Outlet } from "react-router-dom";

import { TasksProvider } from "../context/TasksContext";

import { ProjectsProvider } from "../context/ProjectsContext";
import { UserProvider } from "../context/UserContext";

export default function Layout() {
  return (
    <>
      <Header />
      <UserProvider>
        <TasksProvider>
            <ProjectsProvider>
              <main className="bg-gray-200 min-h-screen pl-28 pt-6 pr-10 mx-auto font-popp">
                <Outlet />
              </main>
            </ProjectsProvider>
          </TasksProvider>
        </UserProvider>
      
    </>
  );
}
