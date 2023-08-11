import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { API } from "../components/API";

import { useTasks } from "../context/TasksContext";
import { useProjects, useProjectsDispatch } from "../context/ProjectsContext";

import { format } from "date-fns";

import LittleTask from "../components/dashboard/LittleTask";
import LittleProject from "../components/dashboard/LittleProject";
import MainCard from "../components/general/MainCard";
import CreateButton from "../components/general/CreateButton";

import { Chart } from "../components/dashboard/RadialChart";

function Dashboard() {
  const [t, i18n] = useTranslation("global");

  const [time, setTime] = useState("");

  const [data, setData] = useState("");

  const tasks = useTasks();

    const projects2 = useProjects();
    console.log(projects2);
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Project 1",
      description:
        "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
      start: "2023-08-05",
      end: "2023-12-25",
    },
    {
      id: 2,
      name: "Project 2",
      description:
        "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
      start: "2023-07-05",
      end: "2023-04-08",
    },
    {
      id: 3,
      name: "Project 3",
      description:
        "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
      start: "2023-08-05",
      end: "2023-01-10",
    },
  ]);


  const getData = async () => {
    const result = await fetch(`${API}/`);
    const rdata = await result.json();
    setData(rdata);
  };

  useEffect(() => {
    let hour = parseInt(format(new Date(), "HH"));

    if (hour < 12) {
      setTime("Morning");
    } else if (hour >= 12 && hour <= 19) {
      setTime("Afternoon");
    } else {
      setTime("Evening");
    }
  }, []);

  return (
    <>
      {/* Header Section */}
      <header className="w-full h-[10vh] mb-2 flex flex-row justify-between ">
        <h1 className="mt-2 font-semibold">{t("dashboard.hello")}</h1>
        <div className="h-full w-[27%] flex flex-row justify-between items-center pb-2 pl-5">
          <CreateButton />
          <img
            src="/img/avatar.png"
            alt=""
            className="w-14 h-14 rounded-full mr-5"
          />
        </div>
      </header>

      {/* Main Section */}
      <div className="flex flex-row justify-between">
        <section>
          {/* Statistics Section */}
          <section className=" w-[64vw] h-[24vh] flex flex-row">
            <div className="bg-white border-[1px] border-gray-200 w-[65%] h-full mr-8 py-4 px-8 flex flex-row justify-between rounded-3xl">
              <div className="w-[22%] bg-[#b1b2ff] text-white rounded-3xl text-center pt-4">
                <h2>10</h2>
                <p>{t("dashboard.project")}</p>
              </div>
              <div className="w-[22%] bg-[#FFDCA9] text-white rounded-3xl text-center pt-4">
                <h2>15</h2>
                <p>{t("dashboard.task")}</p>
              </div>
              <div className="w-[22%] bg-[#B0DAFF] text-white rounded-3xl text-center pt-4">
                <h2>8</h2>
                <p>{t("dashboard.event")}</p>
              </div>
              <div className="w-[22%] bg-[#E8A0BF] text-white rounded-3xl text-center pt-4">
                <h2>10</h2>
                <p>{t("dashboard.progress")}</p>
              </div>
            </div>
            <div className="bg-white border-[1px] border-gray-200 w-[35%] h-full rounded-3xl flex flex-row justify-between">
              <div className="w-[45%] pt-10">
                <div className="flex flex-row justify-center items-center mb-3">
                  <div className="w-[25px] h-[6px] bg-[#B1B2FF] rounded-full mr-3"></div>
                  <p className="mb-0 text-sm font-medium">
                    {t("dashboard.do")}
                  </p>
                </div>
                <div className="flex flex-row justify-center items-center mb-3">
                  <div className="w-[25px] h-[6px] bg-black rounded-full mr-3"></div>
                  <p className="mb-0 text-sm font-medium">
                    {t("dashboard.doing")}
                  </p>
                </div>
                <div className="flex flex-row justify-center items-center mb-3">
                  <div className="w-[25px] h-[6px] bg-[#E8A0BF] rounded-full mr-3"></div>
                  <p className="mb-0 text-sm font-medium">
                    {t("dashboard.done")}
                  </p>
                </div>
              </div>
              <div className="w-[55%]">
                <div className="w-[75%] h-[85%] ml-3 mt-3">
                  <Chart />
                </div>
              </div>
            </div>
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
