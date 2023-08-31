import { useState } from "react";
import {useTranslation} from "react-i18next";
import ProjectCard from "../components/projectsC/ProjectCard";
import CreateButton from "../components/general/CreateButton";
import MainCard from "../components/general/MainCard";

import { useProjects, useProjectsDispatch } from "../context/ProjectsContext";



export default function Projects() {

    const [t, i18n] = useTranslation("global");

    const projects = useProjects();
    const dispatch = useProjectsDispatch();

    
    return (
        <>
            {/* Header Section */}
            <header className='w-full h-[10vh] mb-2 flex flex-row justify-between '>
                <h1 className='mt-2 font-semibold'>{t("project.my-projects")}</h1>
                <div className='h-full w-[27%] flex flex-row justify-between items-center pb-2 pl-5'>
                    
                    <CreateButton
                        action='project'
                    />

                    <img src="/img/avatar.png" alt="" className='w-14 h-14 rounded-full mr-5'/>
                </div>
            </header>

            {/* Main Section */}
            <div className='h-[84vh] flex flex-row justify-between'>
                
                {/* Projects Section */}
                <section className="w-[65vw] h-[95%] mt-4 pr-4 pb-2">
                    <div className="w-full h-full flex flex-row flex-wrap justify-between pr-8 drop-shadow-md overflow-y-scroll">
                        
                        {
                            projects.length > 0 ?
                                projects.map((project) => {
                                return (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                    />
                                );
                                })
                                :
                                <div className="w-full h-[9rem] mt-5">
                                    <p className="pt-14 text-2xl font-light text-center text-gray-400">
                                        {t("dashboard.no-upcoming-projects")}
                                    </p>
                                </div>
                        }
                        
                    </div>
                </section>

                <section className='w-[23vw] pb-3'>
                    <MainCard/>
                </section>
            </div>
        </>
    )
}