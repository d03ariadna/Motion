import { useTranslation } from "react-i18next";
import { Progress } from "./RadialChart";

import { useProjects } from "../../context/ProjectsContext";

export default function ProjectStc({id}) {
    
    const [t, i18n] = useTranslation("global");

    const projects = useProjects();
    const project = projects.map((project) => { return project.id === id })
    
    const getProgress = () => {
        //waiting for
    }


    const progress = 50;

    return (
        <>
            <div className='w-[55%] mx-auto mb-3'><Progress progress={progress}/></div>
        </>
    )
}

