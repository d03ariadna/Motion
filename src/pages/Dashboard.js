import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

import { useTasks } from "../context/TasksContext";
import { useProjects, useProjectsDispatch } from "../context/ProjectsContext";

import { format } from "date-fns";

import GeneralStc from "../components/statistics/GeneralStc";
import TasksStc from "../components/statistics/TasksStc";
import LittleTask from "../components/dashboard/LittleTask";
import LittleProject from "../components/dashboard/LittleProject";
import MainCard from "../components/general/MainCard";
import CreateButton from "../components/general/CreateButton";
import { MainIMG } from "../components/projectsC/MemberImg";



function Dashboard() {
  const [t, i18n] = useTranslation("global");

  const user = JSON.parse(Cookies.get("Session"));
  

  const [time, setTime] = useState("");

  const tasks = useTasks();

  const projects = useProjects();
  
  useEffect(() => {
    let hour = parseInt(format(new Date(), "HH"));

    if (hour < 12) {
      setTime("dashboard.mrng");
    } else if (hour >= 12 && hour <= 19) {
      setTime("dashboard.aftn");
    } else {
      setTime("dashboard.evng");
    }

  }, []);


  return (
    <>
      {/* Header Section */}
      <header className="w-full h-[10vh] mb-2 flex flex-row justify-between ">
        <h1 className="mt-2 font-semibold">{t(time)}</h1>
        <div className="h-full w-[27%] flex flex-row justify-between items-center pb-2 pl-5">
          <CreateButton personal={true}/>
          <div className='w-12 h-12'>
            <MainIMG member={user}/>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <div className="flex flex-row justify-between">
        <section>
          {/* Statistics Section */}
          <section className=" w-[64vw] h-[24vh] flex flex-row">
            <GeneralStc/>
            <TasksStc/>
          </section>

          {/* Tasks Section */}
          <section className="mt-4">
            <h2 className="text-lg font-semibold">
              {t("dashboard.upcoming-tasks")}
            </h2>
            <div className="w-[64vw] pt-1 flex flex-row flex-nowrap overflow-x-scroll">
              {tasks.length > 0 ? (
                tasks.map((task) => {
                  if (task.status !== "DONE") {
                    return <LittleTask key={task.id} task={task} />;
                  }
                })
              ) : (
                <div className="w-full h-[9rem]">
                  <p className="pt-14 text-sm font-light text-center text-gray-400">
                    {t("dashboard.no-upcoming-tasks")}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Projects Section */}
          <section className="mt-3">
            <h2 className="text-lg font-semibold">{t("dashboard.recent-p")}</h2>
            <div className="w-[64vw] pt-1 flex flex-row flex-nowrap overflow-x-scroll">
              {projects.map((project) => {
                return (
                  <LittleProject
                    key={project.id}
                    project={project}
                  />
                );
              })}
            </div>
          </section>
        </section>

        <section className="w-[23vw] pb-3">
          <MainCard />
        </section>
      </div>
    </>
  );
}

export default Dashboard;
