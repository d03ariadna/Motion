import { useState, useEffect } from 'react';
import { API } from '../components/API';


import LittleTask from '../components/dashboard/LittleTask';
import LittleProject from '../components/dashboard/LittleProject';
import MainCard from '../components/general/MainCard';
import CreateButton from '../components/general/CreateButton';

import Example from "../components/dashboard/RadialChart";


import TaskModal from '../components/general/TaskModal';
import ProjectModal from '../components/general/ProjectModal';


function Dashboard() {

    const [data, setData] = useState('');

    const getData = async () => {
        const result = await fetch(`${API}/`);
        const rdata = await result.json();
        setData(rdata);
    }

    // GET UPCOMING TASKS
    const [activeTasks, setActiveTasks] = useState(
        [
            {
                id: 1,
                name: "Buy a gift for Christina's Birthday",
                description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
                date: "Today",
                status: "To Do",
            },
            {
                id: 2,
                name: "Take a rest",
                description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
                date: "Wednesday",
                status: "To Do",
            },
            {
                id: 3,
                name: "Finish Zencon Project",
                description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
                date: "Nov, 15th",
                status: "To Do",
            },
            {
                id: 4,
                name: "Richard's Birthday Party",
                description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
                date: "Friday",
                status: "To Do",
            },
            {
                id: 5,
                name: "Buy the supplements for gym",
                description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
                date: "Monday",
                status: "To Do",
            }
        ]);
    
    const [doneTasks, setDoneTasks] = useState(
        [
            {
                id: 6,
                name: "Task Done 1st",
                description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
                date: "Today",
                status: "Done",
            },
            {
                id: 7,
                name: "Task Done 2nd",
                description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
                date: "Wednesday",
                status: "Done",
            },
            {
                id: 8,
                name: "Task Done 3rd",
                description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
                date: "Nov, 15th",
                status: "Done",
            }
        ]);
    
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
    function createTask(id, name, desc, date, status) {
        const newTask = {
            id: id,
            name: name,
            description: desc,
            date: date,
            status: status
        }

        setActiveTasks([newTask, ...activeTasks]);
    }


    function updateTask(id, n_name, n_desc, n_date, n_status) {
        
        let updatedTasks;

        if (n_status === 'Done') {
            const newTask = {
                id: id,
                name: n_name,
                description: n_desc,
                date: n_date,
                status: n_status
            }

            setDoneTasks([...doneTasks, newTask]);

            updatedTasks = activeTasks.filter((task) => {
                return task.id != id;
            });

        } else {

            updatedTasks = activeTasks.map((task) => {
                if (task.id === id) {
                    return {
                        ...task,
                        name: n_name,
                        description: n_desc,
                        date: n_date,
                        status: n_status
                    }
                }
                return task;
            });
        }

        setActiveTasks(updatedTasks);
        
    }

    function deleteTask(id) {
        console.log(id);
        const updatedTasks = activeTasks.filter((task) => {
            return task.id !== id
        });

        setActiveTasks(updatedTasks);
        console.log('deleted Successfully');
    }

    //PROJECTS
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


    useEffect(() => {
        getData();
    }, []);
    

    return (
        <>
            {/* Header Section */}
            <header className='w-full h-[10vh] mb-2 flex flex-row justify-between '>
                <h1 className='mt-2 font-semibold'>Good Afternoon!</h1>
                <div className='h-full w-[27%] flex flex-row justify-between items-center pb-2 pl-5'>
                    <CreateButton
                        createTask={ createTask }
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
                        <div className='bg-white border-[1px] border-gray-200 w-[35%] h-full rounded-3xl overflow-hidden flex flex-row justify-between'>
                            <div className='w-[40%] pt-10'>
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
                            <div className='w-[60%]'><Example /></div>
                            
                        </div>
                    </section>

                    {/* Tasks Section */}
                    <section className='mt-4'>
                        <h2 className='text-lg font-semibold'>Upcoming Tasks</h2>
                        <div className='w-[64vw] pt-1 flex flex-row flex-nowrap overflow-x-scroll'>
                            
                            {
                                activeTasks.length > 0 ?
                                    
                                    activeTasks.map((task) => {

                                        return (
                                            <LittleTask
                                                key={task.id}
                                                task={task}
                                                updateTask={updateTask}
                                                deleteTask={deleteTask}
                                            />
                                        )
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
                                    // deleteProject 
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