import { useTranslation } from "react-i18next";
import { Progress } from "./RadialChart";

import { useProjects } from "../../context/ProjectsContext";
import { usePTasks } from "../../context/ProjectTasksContext";

export default function ProjectStc({id}) {
    
    const [t, i18n] = useTranslation("global");

    const tasks = usePTasks();

    const pTasks = tasks.filter((task) => {
        return task.idProwner === id
    })
    console.log(pTasks);
    
    const getProgress = () => {
        let tasksDone = 0;

        
    }


    const progress = 50;

    return (
        <>
            <div className='w-[55%] mx-auto mb-3'><Progress progress={progress}/></div>
        </>
    )
}

