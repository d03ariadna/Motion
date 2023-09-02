
import { Fragment, useEffect, useState } from 'react'
import {useTranslation} from "react-i18next";
import ProjectModal from '../general/ProjectModal';
import { usePTasks } from '../../context/ProjectTasksContext';

import {
    format,
    parseISO,
} from 'date-fns';

function classNames(...classes) {
    
  return classes.filter(Boolean).join(' ')
}

export default function LittleProject(props) {

    const [t, i18n] = useTranslation("global");

    const project = props.project;

    const pEnd = parseISO(project.endDate);

    const [showProject, setShowProject] = useState(false);

    const handleCloseProject = () => setShowProject(false);
    const handleShowProject = () => setShowProject(true);


    const tasks = usePTasks();
    const [progressClass, setProgressClass] = useState('w-[0%] bg-gray-300');
    const [progress, setProgress] = useState(0);
    let p = 0;

    useEffect(() => {
        if (tasks.length > 0) {
            const pTasks = tasks.filter((task) => {
                return task.idProwner === project.id
            })

            let tasksDone = 0;
            pTasks.map((task) => {
                if (task.status === 'DONE') {
                    tasksDone += 1;
                }
            })
            
            if (tasksDone > 0) {
                p = Math.round(tasksDone / (pTasks.length) * 100);
                setProgress(p);
                console.log('w-[' + p + '%] bg-gray-800')
                setProgressClass(`w-[${p}%] bg-gray-800`)
            }
            
        }
     }, []);

    

    return (
        <>
            <div>
                <div className='w-52 px-2 pt-2.5 pb-3 mr-8 mb-4 border-[1px] border-gray-300 bg-white rounded-xl drop-shadow-md hover:drop-shadow-xl'>
                    <section className=' mb-2.5 border-2 border-white  flex flex-row flex-nowrap justify-between items-center '>
                        <div className='w-full flex flex-row justify-between items-center'>
                            <div className="flex flex-row">
                                <img src="/img/avatar.png" alt="" className='w-8 h-8 rounded-full border-[1px] border-slate-300'/>
                                <img src="/img/avatar.png" alt="" className='w-8 h-8 rounded-full ml-[-12px] border-[1px] border-slate-300' />
                                <img src="/img/avatar.png" alt="" className='w-8 h-8 rounded-full ml-[-12px] border-[1px] border-slate-300'/>
                            </div>
                        </div>
                    </section>
                    
                    <section className='pl-2 mb-2'>
                        <a href={`/project/${project.id}`} className='text-black text-base font-medium no-underline mb-0'>
                            {project.name}
                        </a>
                        <p className="text-xs text-gray-300 mt-1 mb-0">{t("project.deadline")} {format(pEnd, 'MMM do')}</p>
                    </section>
                        
                    <section className="w-full px-2 flex flex-row items-center justify-between">
                        <div className="w-[80%] h-[3px] bg-gray-300 rounded-full">
                            <div className={`${progressClass} h-[3px] rounded-full`}></div>
                        </div>
                        <div className="w-[15%]">
                            <p className="text-xs text-slate-400 mb-0">{progress}%</p>
                        </div>
                    </section>    
                </div>
            </div>

            <ProjectModal
                id={project.id}
                project={project}
                edit={true}
                show={showProject}
                close={handleCloseProject}
                open={handleShowProject}/>
        </>
    )
}