import { useEffect, useState } from "react";
import {useTranslation} from "react-i18next";
import CreateButton from "../components/general/CreateButton"
import { AddIcon } from "../components/icons/icons";
import ProjectTask from "../components/projectsC/ProjectTask";
import TaskModal from '../components/general/TaskModal';
import { Toast } from "bootstrap";

export default function OneProject() {
    const [t, i18n] = useTranslation("global");

    // GET PROJECT'S TASKS
    const [tasks, setTasks] = useState(
        [
            {
                id: 1,
                name: "Buy a gift for Christina's Birthday ",
                description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
                date: "Today",
                status: "To Do",
            },
            {
                id: 2,
                name: "Take a rest",
                description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
                date: "Wednesday",
                status: "Done",
            },
            {
                id: 3,
                name: "Finish Zencon Project",
                description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
                date: "Nov, 15",
                status: "Doing",
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
                status: "Done",
            }
        ]);
    
    const [toDo, setToDo] = useState([]);
    const [doing, setDoing] = useState([]);
    const [done, setDone] = useState([]);

    //Children Functions
    function createTask() {
        alert('Task created');
    }

    function updateTask(id, n_name, n_desc, n_date, n_status) {
        
        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                return {
                    ...task,
                    name: n_name,
                    description: n_desc,
                    date: n_date,
                    status: n_status
                }
            }
            return task
        });

        setTasks(updatedTasks);

    }

    function deleteTask(id) {
        const updatedTasks = tasks.filter((task) => {
            return task.id !== id
        });

        setTasks(updatedTasks);
        console.log('deleted');
    }

    useEffect(() => {
        let tempTasks = [];

        //Get TO DO tasks
        tempTasks = tasks.filter((task) => { return task.status === 'To Do' });
        setToDo(tempTasks);
        console.log('To do', tempTasks);

        //Get DOING tasks
        tempTasks = tasks.filter((task) => { return task.status === 'Doing' });
        setDoing(tempTasks);
        console.log('Doing', tempTasks);

        //Get DONE tasks
        tempTasks = tasks.filter((task) => { return task.status === 'Done' });
        setDone(tempTasks);
        console.log('Done',tempTasks);
    }, tasks);


    return (
        <>
            <div className="flex flex-row justify-between">
                 {/* Main Section */}
                <section className="w-[65vw] h-full mr-10 pt-2">
                    
                    {/* Header Section */}
                    <header className="w-full  flex flex-row justify-between items-center">
                        <div>
                            <h1 className="font-semibold">Zencon Project</h1>
                        </div>
                        <div className="flex flex-row w-[35%] mr-10 justify-between items-end">
                            <div>
                                <h5 className="mb-1 text-sm font-normal text-gray-400">{t("project.created")}</h5>
                                <p className="mb-0 text-sm">March 2, 9:45 am</p>
                            </div>
                            <div>
                                <h5 className="mb-1 text-sm font-normal text-gray-400">{t("project.due-date")}</h5>
                                <p className="mb-0 text-sm">Sep 2, 9:45 am</p>
                            </div>
                        </div>
                    </header>
                    <div className="w-full h-1 mt-3 rounded-xl bg-purple-500 "></div>
                
                    {/* Create & Members Section */}
                    <section className="mt-[2.5rem] flex flex-row justify-between items-center">
                        
                        <CreateButton
                        action='task'
                        createTask={ createTask }
                    />

                        <div className="w-[20%] flex flex-row justify-between items-center">
                            <div className="flex flex-row">
                                <img src="/img/avatar.png" alt="" className='w-12 h-12 rounded-full border-[1px] border-slate-300' />
                                <img src="/img/avatar.png" alt="" className='w-12 h-12 rounded-full border-[1px] border-slate-300 ml-[-20px]' />
                                <img src="/img/avatar.png" alt="" className='w-12 h-12 rounded-full border-[1px] border-slate-300  ml-[-20px]' />
                            </div>
                            <div className="h-10 w-[3px] ml-[-20px] bg-gray-300 rounded-lg"></div>
                            <button className="py-1 px-3 text-white bg-gray-300 hover:bg-purple-400 rounded-full ml-[-20px] text-3xl font-medium">
                                +
                            </button>
                        </div>
                    </section>

                    {/* Tasks Section */}
                    <section className="h-[63vh] mt-5 flex flex-row justify-between">
                        <section className="w-[30%] h-full pl-2">
                            <h3 className="text-2xl font-semibold">{t("dashboard.do")}</h3>
                            <div className="w-full h-[55vh] mt-3 flex flex-col flex-nowrap overflow-y-scroll">
                                {
                                    toDo.length > 0 ?
                                        toDo.map((task) => {

                                            return (

                                                <ProjectTask
                                                    key={task.id}
                                                    task={task}
                                                    updateTask={updateTask}
                                                    deleteTask={deleteTask}
                                                />
                                            );
                                        })
                                        :
                                        <p className="pl-1 pt-2 text-sm text-gray-400 font-light">{t("project.no-tasks")}</p>
                                }
                            </div>
                        </section>
                        <section className="w-[30%] h-full pl-2">
                            <h3 className="text-2xl font-semibold">{t("dashboard.doing")}</h3>
                            <div className="w-full h-[55vh] mt-3 flex flex-col flex-nowrap overflow-y-scroll">
                                {
                                    doing.length > 0 ?
                                        doing.map((task) => {

                                            return (

                                                <ProjectTask
                                                    key={task.id}
                                                    task={task}
                                                    updateTask={updateTask}
                                                    deleteTask={deleteTask}
                                                />
                                            );
                                        })
                                        :
                                        <p className="pl-1 pt-2 text-sm text-gray-400 font-light">{t("project.no-tasks")}</p>
                                }
                            </div>
                        </section>
                        <section className="w-[30%] h-full pl-2">
                            <h3 className="text-2xl font-semibold">{t("dashboard.done")}</h3>
                            <div className="w-full h-[55vh] mt-3 flex flex-col flex-nowrap overflow-y-scroll">
                                {
                                    done.length > 0 ?
                                        done.map((task) => {

                                            return (

                                                <ProjectTask
                                                    key={task.id}
                                                    task={task}
                                                    updateTask={updateTask}
                                                    deleteTask={deleteTask}
                                                />
                                            );
                                        })
                                        :
                                        <p className="pl-1 pt-2 text-sm text-gray-400 font-light">{t("project.no-tasks")}</p>
                                }
                            </div>
                        </section>
                    </section>
                </section>

                {/* Project Card Section */}
                <section className="w-[22vw] h-[95vh] px-2">
                    <div className="w-full h-full py-3 px-4 bg-white rounded-3xl drop-shadow-lg">
                        <section className="w-full h-[8%] flex flex-row justify-between items-center">
                            <h3 className="text-2xl font-medium mb-0">{t("project.name")}</h3>
                            <img src="/img/avatar.png" alt="" className='w-12 h-12 rounded-full border-[1px] border-slate-300' />
                        </section>

                        {/* Statistics */}
                        <section className="w-full mt-3 py-4 border-t-2 border-gray-200">
                            <div className=" mx-16 text-center bg-white rounded-full border-8 border-purple-500 py-5 text-2xl font-bold">16%</div>
                        </section>

                        {/* Statistics */}
                        <section className="w-full h-[20%] border-b-2 border-gray-200">
                            <h4 className="ml-2 text-lg">{t("dashboard.task")}</h4>

                            <div className="w-full flex flex-row justify-between px-2 mt-2">
                                <div className="w-[50%] pl-1 flex flex-row items-center mr-5">
                                    <p className="mb-0 text-base font-medium">8</p>
                                    <div className="w-1 h-5 bg-lime-400 mx-2 rounded-2xl"></div>
                                    <p className="mb-0 text-xs text-gray-400">{t("project.total")}</p>   
                                </div>
                                <div className="w-[50%] pl-1 flex flex-row items-center">
                                    <p className="mb-0 text-base font-medium">8</p>
                                    <div className="w-1 h-5 bg-lime-400 mx-2 rounded-2xl"></div>
                                    <p className="mb-0 text-xs text-gray-400">{t("project.waiting")}</p>
                                </div>
                            </div>

                            <div className="w-full flex flex-row justify-between mt-3 px-2">
                                <div className="w-[50%] pl-1 flex flex-row items-center mr-5">
                                    <p className="mb-0 text-base font-medium">8</p>
                                    <div className="w-1 h-5 bg-lime-400 mx-2 rounded-2xl"></div>
                                    <p className="mb-0 text-xs text-gray-400">{t("project.progress")}</p>
                                </div>
                                <div className="w-[50%] pl-1 flex flex-row items-center">
                                    <p className="mb-0 text-base font-medium">8</p>
                                    <div className="w-1 h-5 bg-lime-400 mx-2 rounded-2xl"></div>
                                    <p className="mb-0 text-xs text-gray-400">{t("project.completed")}</p>
                                </div>
                            </div>

                        </section>

                        {/* Project Notes */}
                        <section className="w-full h-[35%] mt-4">
                            <h4 className="text-lg">{t("project.notes")}</h4>
                            <div className="w-full h-[75%] mt-3 px-2 drop-shadow-md overflow-y-scroll">
                                <div className="px-3 py-3 bg-gray-200 mb-3 rounded-2xl">
                                    <p className="text-[.65rem] mb-0">Lorem ipsit. Quaerat consequuntur quod mollitia tempore deleniti, cupiditate ha aerat consequuntur quod mollitia tempore deleniti, cupiditate haru</p>
                                </div>
                                <div className="px-3 py-3 bg-gray-200 mb-3 rounded-2xl">
                                    <p className="text-[.65rem] mb-0">Lorem ipsit. Quaerat consequuntur quod mollitia tempore deleniti, cupiditate haru</p>
                                </div>
                                <div className="px-3 py-3 bg-gray-200 mb-3 rounded-2xl">
                                    <p className="text-[.65rem] mb-0">Lorem ipsit. Quaerat consequuntur quod mollitia tempore deleniti, cupiditate haru</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </section>
            </div>
            
        </>
    )
}