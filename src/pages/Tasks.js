import { useState, useEffect } from "react";

import { useTasks } from "../context/TasksContext";
import { useUser } from "../context/UserContext";

import TaskCard from "../components/projectsC/TaskCard";
import CreateButton from "../components/general/CreateButton";
import MainCard from "../components/general/MainCard";

import { useTranslation } from "react-i18next";

export default function Tasks() {

  const user = useUser();

  console.log(user);
  
  const [t, i18n] = useTranslation("global");
  const [trigger, setTrigger] = useState(false);

  // GET UPCOMING TASKS
  const tasks = useTasks();
  console.log(tasks);

  const [active, setActive] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    let tempTasks = [];

    //Get ACTIVE tasks
    tempTasks = tasks.filter((task) => {
      if (task.status === "TO DO" || task.status === "DOING") {
        return task;
      }
    });
    setActive(tempTasks);

    //Get DONE tasks
    tempTasks = tasks.filter((task) => {
      return task.status === "DONE";
    });
    setDone(tempTasks);

  }, [tasks]);

  return (
    <>
      {/* Header Section */}
      <header className="w-full h-[10vh] mb-2 flex flex-row justify-between ">
        <h1 className="mt-2 font-semibold">{t("tasks.my-tasks")}</h1>
        <div className="h-full w-[27%] flex flex-row justify-between items-center pb-2 pl-5">
          <CreateButton action="task" />

          <img
            src="/img/avatar.png"
            alt=""
            className="w-14 h-14 rounded-full mr-5"
          />
        </div>
      </header>

      {/* Main Section */}
      <div className="h-[84vh] flex flex-row justify-between">
        <div>
          {/* Tasks Section */}
          <section className="mt-4">
            <h2 className="text-lg font-semibold">{t("tasks.important")}</h2>
            <div className="w-[64vw] pt-1 flex flex-row flex-nowrap overflow-x-scroll">
              {active.map((task) => {
                return <TaskCard key={task.id} task={task} />;
              })}
            </div>
          </section>

          {/* Tasks Section */}
          <section className="mt-4">
            <h2 className="text-lg font-semibold">{t("tasks.all-tasks")}</h2>
            <div className="w-[64vw] pt-1 flex flex-row flex-nowrap overflow-x-scroll">
              {active.map((task) => {
                return <TaskCard key={task.id} task={task} />;
              })}

              {done.map((task) => {
                return <TaskCard key={task.id} task={task} />;
              })}
            </div>
          </section>
        </div>

        <section className="w-[23vw] pb-3">
          <MainCard />
        </section>
      </div>
    </>
  );
}
