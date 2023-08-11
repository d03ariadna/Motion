import Header from "./Header";
import { Outlet } from "react-router-dom";

import { TasksProvider } from "../context/TasksContext";

import { ProjectsProvider } from "../context/ProjectsContext";

export default function Layout() {
  return (
    <>
      <Header />
      <TasksProvider>
        <ProjectsProvider>
          <main className="bg-gray-200 min-h-screen pl-28 pt-6 pr-10 mx-auto font-popp">
            <Outlet />
          </main>
        </ProjectsProvider>
      </TasksProvider>
    </>
  );
}
