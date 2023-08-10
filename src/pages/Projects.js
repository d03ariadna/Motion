import { useState } from "react";
import {useTranslation} from "react-i18next";
import ProjectCard from "../components/projectsC/ProjectCard";
import CreateButton from "../components/general/CreateButton";
import MainCard from "../components/general/MainCard";
import ProjectModal from "../components/general/ProjectModal";



export default function Projects() {

    const [t, i18n] = useTranslation("global");

    const [projects, setProjects] = useState(
    [
      {
        id: 1,
        name: "Project 1",
        description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
        start: "Today",
        end: "December",
        members: "2",
      },
      {
        id: 2,
        name: "Project 2",
        description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
        start: "Tomorrow",
        end: "November",
        members: "5",
      },
      {
        id: 3,
        name: "Project 3",
        description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
        start: "Friday",
        end: "June",
        members: "10",
      },
    ])

    //Children Functions
    function createProject(id, name, desc, start, end, members) {
        const newProject = {
            id: id,
            name: name,
            description: desc,
            start: start,
            end: end,
            members: members
        }
        console.log(newProject);
        setProjects([...projects, newProject]);
    }

    function updateProject(id, n_name, n_desc, n_start, n_end, n_members) {

        const updatedProjects = projects.map((project) => {
            if (project.id === id) {
                return {
                    ...project,
                    name: n_name,
                    description: n_desc,
                    start: n_start,
                    end: n_end,
                    members: n_members
                }
            }
            return project;
        });
        setProjects(updatedProjects);
    }

    return (
        <>
            {/* Header Section */}
            <header className='w-full h-[10vh] mb-2 flex flex-row justify-between '>
                <h1 className='mt-2 font-semibold'>{t("project.my-projects")}</h1>
                <div className='h-full w-[27%] flex flex-row justify-between items-center pb-2 pl-5'>
                    
                    <CreateButton
                        action='project'
                        createTask={ createProject }
                    />

                    <img src="/img/avatar.png" alt="" className='w-14 h-14 rounded-full mr-5'/>
                </div>
            </header>

            {/* Main Section */}
            <div className='h-[84vh] flex flex-row justify-between'>
                
                {/* Projects Section */}
                <section className="w-[65vw] h-[95%] mt-4 pr-4 pb-2">
                    <div className="w-full h-full flex flex-row flex-wrap justify-between pr-8 drop-shadow-md overflow-y-scroll">
                        
                        {projects.map((project) => {
                            return (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    updateProject={updateProject}
                                />
                            );
                        })}
                        
                    </div>
                </section>

                <section className='w-[23vw] pb-3'>
                    <MainCard/>
                </section>
            </div>
        </>
    )
}