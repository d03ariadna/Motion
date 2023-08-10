import { useState } from "react";

import ProjectCard from "../components/projectsC/ProjectCard";
import CreateButton from "../components/general/CreateButton";
import MainCard from "../components/general/MainCard";
import ProjectModal from "../components/general/ProjectModal";



export default function Projects() {

    const [projects, setProjects] = useState(
        [
            {
                id: 1,
                name: "Project 1",
                description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
                start: "2023-08-05",
                end: "2023-12-25"
            },
            {
                id: 2,
                name: "Project 2",
                description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
                start: "2023-07-05",
                end: "2023-04-08"
            },
            {
                id: 3,
                name: "Project 3",
                description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
                start: "2023-08-05",
                end: "2023-01-10"
            },
        ]);
    //Children Functions
    function createProject(id, name, desc, start, end) {
        const newProject = {
            id: id,
            name: name,
            description: desc,
            start: start,
            end: end
        }
        console.log(newProject);
        setProjects([newProject, ...projects]);
    }

    function updateProject(id, n_name, n_desc, n_start, n_end) {

        const updatedProjects = projects.map((project) => {
            if (project.id === id) {
                return {
                    ...project,
                    name: n_name,
                    description: n_desc,
                    start: n_start,
                    end: n_end
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
                <h1 className='mt-2 font-semibold'>My Projects</h1>
                <div className='h-full w-[27%] flex flex-row justify-between items-center pb-2 pl-5'>
                    
                    <CreateButton
                        action='project'
                        createProject={ createProject }
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