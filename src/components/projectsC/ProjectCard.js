import { Fragment, useState } from 'react';
import {useTranslation} from "react-i18next";
import { EditIcon } from '../icons/icons';
import ProjectModal from '../general/ProjectModal';

function classNames(...classes) {
    
  return classes.filter(Boolean).join(' ')
}

export default function ProjectCard(props) {

    const [t, i18n] = useTranslation("global");

    const project = props.project;

    const [showProject, setShowProject] = useState(false);

    const handleCloseProject = () => setShowProject(false);
    const handleShowProject = () => setShowProject(true);

    return (
        <>
            <div className='w-[45%] mb-5'>
                <div className='w-full px-4 pt-2.5 pb-3 mr-8 mb-4 border-[1px] border-gray-300 bg-white rounded-xl drop-shadow-md'>
                
                    <section className="w-full my-3 flex flex-row items-center justify-around">
                        <div className="w-[10%]">
                            <p className="text-sm text-slate-400 font-medium mb-0">60%</p>
                        </div>
                        <div className="w-[85%] h-[5px] bg-gray-300 rounded-full">
                            <div className="w-[80%] h-[5px] bg-purple-400 rounded-full"></div>
                        </div>
                    </section> 
                    
                    <section className='mb-4'>
                        <div className='flex flex-row justify-between items-center mb-3'>
                            <p className='text-black text-2xl font-semibold mb-0'>
                                {project.name}
                            </p>
                            <button onClick={handleShowProject} className="py-1 mb-1">
                                <EditIcon/>
                            </button>
                        </div>
                        
                        <p className="text-xs leading-5 tracking-wide text-gray-400 mb-0">{project.description}</p>
                    </section>   

                    <section className=' mb-2.5 border-2 border-white  flex flex-row flex-nowrap justify-between items-center '>
                        <div className="flex flex-row">
                            <img src="/img/avatar.png" alt="" className='w-10 h-10 rounded-full border-[1px] border-slate-300'/>
                            <img src="/img/avatar.png" alt="" className='w-10 h-10 rounded-full ml-[-12px] border-[1px] border-slate-300' />
                            <img src="/img/avatar.png" alt="" className='w-10 h-10 rounded-full ml-[-12px] border-[1px] border-slate-300'/>
                        </div>
                        <a
                            href={'/project'}
                            className='px-5 py-2 bg-[#B1B2FF] text-white text-lg font-semibold no-underline hover:bg-black hover:drop-shadow-xl transition-all ease-in-out rounded-3xl'>
                            {t("project.open")}
                        </a>
                    </section>
                </div>
            </div>

            
            <ProjectModal
                id={project.id}
                project={project}
                edit={true}
                show={showProject}
                close={handleCloseProject}
                open={handleShowProject}
                submit={props.updateProject}/>
        </>
    )
}