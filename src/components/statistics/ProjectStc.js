import { useTranslation } from "react-i18next";
import { Progress } from "./RadialChart";

import { useProjects } from "../../context/ProjectsContext";
import { usePTasks } from "../../context/ProjectTasksContext";

export default function ProjectStc({ id }) {
  const [t, i18n] = useTranslation("global");

    const tasks = usePTasks();
    let progress;

    const pTasks = tasks.filter((task) => {
        return task.idProwner === id
    })
    
    if (pTasks.length > 0) {
        
        const getProgress = () => {
            let tasksDone = 0;
            pTasks.map((task) => {
                if (task.status === 'DONE') {
                    tasksDone += 1;
                }
            })

            return (tasksDone / (pTasks.length) * 100);        
        }

        progress = getProgress();
    } else {
        progress = 0;
    }
    


    return (
        <>
            <div className='w-[55%] mx-auto mb-3'><Progress progress={progress}/></div>
        </>
    )
}
