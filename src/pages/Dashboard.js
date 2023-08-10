import { useState, useEffect } from 'react';
import { API } from '../components/API';

import { useTasks, useTasksDispatch } from '../context/TasksContext';

import { format } from 'date-fns';

import LittleTask from '../components/dashboard/LittleTask';
import LittleProject from '../components/dashboard/LittleProject';
import MainCard from '../components/general/MainCard';
import CreateButton from '../components/general/CreateButton';

import {Chart} from "../components/dashboard/RadialChart";


function Dashboard() {

    

    const [time, setTime] = useState('');

    const [data, setData] = useState('');


    const tasks = useTasks();
    const dispatch = useTasksDispatch();

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


    //PROJECTS
    function createProject(id, name, desc, start, end) {
        const newProject = {
            id: id,
            name: name,
            description: desc,
            start: start,
            end: end,
        }
        setProjects([...projects, newProject]);
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

    function deleteProject(id) {
        const updatedProjects = projects.filter((project) => {
            return project.id !== id
        });

        setProjects(updatedProjects);
    }


    const getData = async () => {
        const result = await fetch(`${API}/`);
        const rdata = await result.json();
        setData(rdata);
    }

    useEffect(() => {

        let hour = parseInt(format(new Date(), 'HH'));

        if (hour < 12) {
            setTime('Morning');
        } else if (hour >= 12 && hour <= 19) {
            setTime('Afternoon');
        } else {
            setTime('Evening');
        }
        
    }, [])


    

    return (
        <>
            {/* Header Section */}
            <header className='w-full h-[10vh] mb-2 flex flex-row justify-between '>
                <h1 className='mt-2 font-semibold'>Good {time}!</h1>
                <div className='h-full w-[27%] flex flex-row justify-between items-center pb-2 pl-5'>
                    <CreateButton
                        createProject={ createProject }/>
                    <img src="/img/avatar.png" alt="" className='w-14 h-14 rounded-full mr-5'/>
                </div>
            </header>

            {/* Main Section */}
            <div className='flex flex-row justify-between'>
                <section>

                    {/* Statistics Section */}
                    <section className=' w-[64vw] h-[24vh] flex flex-row'>
                        <div className='bg-white border-[1px] border-gray-200 w-[65%] h-full mr-8 py-4 px-8 flex flex-row justify-between rounded-3xl'>
                            <div className='w-[22%] bg-[#b1b2ff] text-white rounded-3xl text-center pt-4'>
                                <h2>10</h2>
                                <p>Projects</p>
                            </div>
                            <div className='w-[22%] bg-[#FFDCA9] text-white rounded-3xl text-center pt-4'>
                                <h2>15</h2>
                                <p>Tasks</p>
                            </div>
                            <div className='w-[22%] bg-[#B0DAFF] text-white rounded-3xl text-center pt-4'>
                                <h2>8</h2>
                                <p>Events</p>
                            </div>
                            <div className='w-[22%] bg-[#E8A0BF] text-white rounded-3xl text-center pt-4'>
                                <h2>10</h2>
                                <p>In Progress</p>
                            </div>
                        </div>
                        <div className='bg-white border-[1px] border-gray-200 w-[35%] h-full rounded-3xl flex flex-row justify-between'>
                            <div className='w-[45%] pt-10'>
                                <div className='flex flex-row justify-center items-center mb-3'>
                                    <div className='w-[25px] h-[6px] bg-[#B1B2FF] rounded-full mr-3'></div>
                                    <p className='mb-0 text-sm font-medium'>To Do</p>
                                </div>
                                <div className='flex flex-row justify-center items-center mb-3'>
                                    <div className='w-[25px] h-[6px] bg-black rounded-full mr-3'></div>
                                    <p className='mb-0 text-sm font-medium'>Doing</p>
                                </div>
                                <div className='flex flex-row justify-center items-center mb-3'>
                                    <div className='w-[25px] h-[6px] bg-[#E8A0BF] rounded-full mr-3'></div>
                                    <p className='mb-0 text-sm font-medium'>Done</p>
                                </div>
                            </div>
                            <div className='w-[55%]'>
                                <div className='w-[75%] h-[85%] ml-3 mt-3'><Chart /></div>
                                
                            </div>
                            
                        </div>
                    </section>

                    {/* Tasks Section */}
                    <section className='mt-4'>
                        <h2 className='text-lg font-semibold'>Upcoming Tasks</h2>
                        <div className='w-[64vw] pt-1 flex flex-row flex-nowrap overflow-x-scroll'>
                            
                            {
                                tasks.length > 0 ?
                                    
                                    tasks.map((task) => {
                                        

                                        if (task.status !== 'Done') {
                                            return (

                                                <LittleTask
                                                    key={task.id}
                                                    task={task}
                                                />
                                            )
                                        }
                                    })
                                    :
                                    <div className='w-full h-[9rem]'>
                                    <p className='pt-14 text-sm font-light text-center text-gray-400'>No tasks upcoming</p>
                                    </div>
                                        
                                }
                                
                            
                            

                        </div>
                    </section>

                    {/* Projects Section */}
                    <section className='mt-3'>
                        <h2 className='text-lg font-semibold'>Recent Projects</h2>
                        <div className='w-[64vw] pt-1 flex flex-row flex-nowrap overflow-x-scroll'>
                            
                            {projects.map((project) => {

                                return (
                                    <LittleProject
                                    key={project.id}
                                    project={project}
                                    updateProject={updateProject}
                                    deleteProject={deleteProject}
                                    />
                                )
                            })}

                        </div>
                    </section>
                </section> 

                <section className='w-[23vw] pb-3'>
                    <MainCard/>
                </section>
            </div>
        </>
    )
}

export default Dashboard;