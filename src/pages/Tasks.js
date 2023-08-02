import { useState } from "react";

import TaskCard from "../components/projectsC/TaskCard";
import TaskModal from "../components/general/TaskModal";
import CreateButton from "../components/general/CreateButton";
import MainCard from "../components/general/MainCard";



export default function Tasks() {

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


    function deleteTask(id, status) {

        let updatedTasks;

        if (status === 'Done') {

            updatedTasks = doneTasks.filter((task) => {
                return task.id !== id
            });
            setDoneTasks(updatedTasks);

        } else {

            updatedTasks = activeTasks.filter((task) => {
                return task.id !== id
            });
            setActiveTasks(updatedTasks);

        }
    }

    return (
        <>
            {/* Header Section */}
            <header className='w-full h-[10vh] mb-2 flex flex-row justify-between '>
                <h1 className='mt-2 font-semibold'>My Tasks</h1>
                <div className='h-full w-[27%] flex flex-row justify-between items-center pb-2 pl-5'>
                    
                    <CreateButton
                        action='task'
                        createTask={ createTask }
                    />
                    
                    <img src="/img/avatar.png" alt="" className='w-14 h-14 rounded-full mr-5'/>
                </div>
            </header>

            {/* Main Section */}
            <div className='h-[84vh] flex flex-row justify-between'>
                <div>
                    {/* Tasks Section */}
                    <section className='mt-4'>
                        <h2 className='text-lg font-semibold'>Important</h2>
                        <div className='w-[64vw] pt-1 flex flex-row flex-nowrap overflow-x-scroll'>
                            
                            {activeTasks.map((task) => {

                                return (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                        updateTask={updateTask}
                                        deleteTask={deleteTask}
                                    />
                                );
                            })}

                        </div>
                    </section>

                    {/* Tasks Section */}
                    <section className='mt-4'>
                        <h2 className='text-lg font-semibold'>All Tasks</h2>
                        <div className='w-[64vw] pt-1 flex flex-row flex-nowrap overflow-x-scroll'>
                            
                            {activeTasks.map((task) => {

                                return (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                        updateTask={updateTask}
                                        deleteTask={deleteTask}
                                    />
                                );
                            })}

                            {
                                doneTasks.map((task) => {
                                    return (
                                        <TaskCard
                                            key={task.id}
                                            task={task}
                                            updateTask={updateTask}
                                            deleteTask={deleteTask}
                                        />
                                    );
                                })
                            }

                        </div>
                    </section>
                    
                </div>                    

                <section className='w-[23vw] pb-3'>
                    <MainCard/>
                </section>
            </div>
        </>
    )
}