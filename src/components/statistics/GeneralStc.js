import { useTranslation } from "react-i18next";

import {
    startOfToday,
    isSameDay,
    parseISO
} from "date-fns";

import { useTasks } from "../../context/TasksContext";
import { useProjects } from "../../context/ProjectsContext";

export default function GeneralStc() {

    const [t, i18n] = useTranslation("global");

    const tasks = useTasks();
    const projects = useProjects();

    const getTodayTasks = () => {
        let total = 0;

        tasks.map((task) => {
            if (isSameDay(parseISO(task.date), startOfToday())) {
                total += 1;
            }
        });

        return total;
    }

    const getProgressTasks = () => {
        let total = 0;

        tasks.map((task) => {
            if (task.status === 'DOING') {
                total += 1;
            }
        });

        return total;
    }

    const totalTasks = tasks.length;
    const totalProjects = projects.length
    const dayTasks = getTodayTasks();
    const progressTasks = getProgressTasks();

    return (
        <>
            <div className="bg-white border-[1px] border-gray-200 w-[65%] h-full mr-8 py-4 px-8 flex flex-row justify-between rounded-3xl">
              <div className="w-[22%] bg-[#b1b2ff] text-white rounded-3xl text-center pt-4">
                <h2>{dayTasks}</h2>
                <p>{t("dashboard.event")}</p>
              </div>
              <div className="w-[22%] bg-[#FFDCA9] text-white rounded-3xl text-center pt-4">
                <h2>{totalTasks}</h2>
                <p>{t("dashboard.task")}</p>
              </div>
              <div className="w-[22%] bg-[#B0DAFF] text-white rounded-3xl text-center pt-4">
                <h2>{progressTasks}</h2>
                <p>{t("dashboard.progress")}</p>
              </div>
              <div className="w-[22%] bg-[#E8A0BF] text-white rounded-3xl text-center pt-4">
                <h2>{totalProjects}</h2>
                <p>{t("dashboard.project")}</p>
              </div>
            </div>
        </>
    )
}