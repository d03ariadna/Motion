import Header from "./Header";
import { Outlet } from "react-router-dom";

import { TasksProvider } from "../context/TasksContext";
import { ProjectsProvider } from "../context/ProjectsContext";
import { ProjectTasksProvider } from "../context/ProjectTasksContext";

export default function Layout() {
  return (
    <>
      <Header />
        <TasksProvider>
          <ProjectsProvider>
            <ProjectTasksProvider>
                <main className="bg-[#ebedf3] min-h-screen pl-28 pt-6 pr-10 mx-auto font-popp">
                    <Outlet />
                </main>
            </ProjectTasksProvider>
          </ProjectsProvider>
        </TasksProvider>
      
    </>
  );
}
