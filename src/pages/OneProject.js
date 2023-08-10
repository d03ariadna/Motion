import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    format,
    parseISO,
} from 'date-fns';

import CreateButton from "../components/general/CreateButton";
import ProjectTask from "../components/projectsC/ProjectTask";
import NoteModal from "../components/projectsC/NoteModal";
import ProjectModal from "../components/general/ProjectModal";
import AddMemberModal from "../components/projectsC/AddMemberModal";

import {Progress} from "../components/dashboard/RadialChart";


export default function OneProject() {

    const projectId = (useParams()).id;
    

    // GET PROJECT'S TASKS
    const [tasks, setTasks] = useState(
        [
            {
                id: 1,
                name: "Buy a gift for Christina's Birthday",
                description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
                date: "2023-08-14",
                status: "To Do",
            },
            {
                id: 2,
                name: "Take a rest",
                description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
                date: "2023-09-10",
                status: "Doing",
            },
            {
                id: 3,
                name: "Finish Zencon Project",
                description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
                date: "2023-11-14",
                status: "To Do",
            },
            {
                id: 4,
                name: "Richard's Birthday Party",
                description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
                date: "2023-06-15",
                status: "Doing",
            },
            {
                id: 5,
                name: "Buy the supplements for gym",
                description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
                date: "2023-08-08",
                status: "Done",
            }
        ]);
    
    const [projects, setProjects] = useState(
    [
      {
        id: 1,
        name: "Project 1",
        description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
        start: "2023-08-05",
        end: "2023-12-25",
      },
      {
        id: 2,
        name: "Project 2",
        description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
        start: "2023-07-05",
        end: "2023-04-08",
      },
      {
        id: 3,
        name: "Project 3",
        description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
        start: "2023-08-05",
        end: "2023-01-10",
      },
    ])
    
    const project = projects.find((project) => project.id == projectId);
    
    const [toDo, setToDo] = useState([]);
    const [doing, setDoing] = useState([]);
    const [done, setDone] = useState([]);

    const [notes, setNotes] = useState(
        [
            {
                id: 1,
                text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga m beatae delectus ducimus provident?'
            },
            {
                id: 2,
                text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga m beatae delectus ducimus provident?'
            },
            {
                id: 3,
                text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga m beatae delectus ducimus provident?'
            },
            {
                id: 4,
                text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga m beatae delectus ducimus provident?'
            }
        ]
    );

    const [members, setMembers] = useState([
        'ariadna@hotmail.com',
        'mariana@hotmail.com',
        'arturo@gmail.com',
        'gibranksr@outlook.com'
    ]);

    const [trigger, setTrigger] = useState(false);

    const [showProject, setShowProject] = useState(false);

    const handleCloseProject = () => setShowProject(false);
    const handleShowProject = () => setShowProject(true);

    //Children Functions
    function createTask(id, name, desc, date, status) {
        const newTask = {
            id: id,
            name: name,
            description: desc,
            date: date,
            status: status
        }

        setTasks([newTask, ...tasks]);
        setTrigger(!trigger);
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
        setTrigger(!trigger);

    }

    function deleteTask(id) {
        const updatedTasks = tasks.filter((task) => {
            return task.id !== id
        });

        setTasks(updatedTasks);
        setTrigger(!trigger);
    }

    function createNote(id, text){
        const newNote = {
            id: id,
            text: text
        }

        setNotes([newNote, ...notes]);
    }

    function updateNote(id, text){
        const newNotes = notes.map((note) => {
            if (note.id === id) {
                return {
                    ...note,
                    text: text
                }
            }
            return note;
        });

        setNotes(newNotes);
    }

    function deleteNote(id) {
        const newNotes = notes.filter((note) => {
            return note.id != id
        });

        setNotes(newNotes);
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


    function updateMembers(email) {
        setMembers([email, ...members])
    }

    useEffect(() => {
        let tempTasks = [];

        //Get TO DO tasks
        tempTasks = tasks.filter((task) => { return task.status === 'To Do' });
        setToDo(tempTasks);

        //Get DOING tasks
        tempTasks = tasks.filter((task) => { return task.status === 'Doing' });
        setDoing(tempTasks);

        //Get DONE tasks
        tempTasks = tasks.filter((task) => { return task.status === 'Done' });
        setDone(tempTasks);
    }, [trigger]);


    return (
        <>
            <div className="flex flex-row justify-between">
                 {/* Main Section */}
                <section className="w-[65vw] h-full mr-10 pt-2">
                    
                    {/* Header Section */}
                    <header className="w-full  flex flex-row justify-between items-center">
                        <div className="flex flex-row items-center py-1">
                            <h1 className="font-semibold">{project.name}</h1>
                            <button onClick={handleShowProject} className="py-1 ml-5 mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-10 h-10 cursor-pointer stroke-black hover:stroke-[#B1B2FF]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-row w-[35%] mr-10 justify-between items-end">
                            <div>
                                <h5 className="mb-1 text-sm font-normal text-gray-400">CREATED</h5>
                                <p className="mb-0 text-sm">{format(parseISO(project.start), 'MMMM, do')}</p>
                            </div>
                            <div>
                                <h5 className="mb-1 text-sm font-normal text-gray-400">DUE DATE</h5>
                                <p className="mb-0 text-sm">{format(parseISO(project.end), 'MMMM, do')}</p>
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
                            <AddMemberModal members={members} addMember={updateMembers}/>
                        </div>
                    </section>

                    {/* Tasks Section */}
                    <section className="h-[63vh] mt-5 flex flex-row justify-between">
                        <section className="w-[30%] h-full pl-2">
                            <h3 className="text-2xl font-semibold">To Do</h3>
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
                                        <p className="pl-1 pt-2 text-sm text-gray-400 font-light">No tasks yet</p>
                                }
                            </div>
                        </section>
                        <section className="w-[30%] h-full pl-2">
                            <h3 className="text-2xl font-semibold">Doing</h3>
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
                                        <p className="pl-1 pt-2 text-sm text-gray-400 font-light">No tasks yet</p>
                                }
                            </div>
                        </section>
                        <section className="w-[30%] h-full pl-2">
                            <h3 className="text-2xl font-semibold">Done</h3>
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
                                        <p className="pl-1 pt-2 text-sm text-gray-400 font-light">No tasks yet</p>
                                }
                            </div>
                        </section>
                    </section>
                </section>

                {/* Project Card Section */}
                <section className="w-[22vw] h-[95vh] px-2">
                    <div className="w-full h-full py-3 px-4 bg-white rounded-3xl drop-shadow-lg">
                        <section className="w-full h-[8%] flex flex-row justify-between items-center">
                            <h3 className="text-2xl font-medium mb-0">Hello, Username</h3>
                            <img src="/img/avatar.png" alt="" className='w-12 h-12 rounded-full border-[1px] border-slate-300' />
                        </section>

                        {/* Statistics */}
                        <section className="w-full mt-3 mb-2 pt-3 border-t-2 border-gray-200">
                            <div className='w-[60%] mx-auto'><Progress/></div>
                        </section>

                        {/* Statistics */}
                        <section className="w-full h-[20%] border-b-2 border-gray-200">
                            <h4 className="ml-2 text-lg">Tasks</h4>

                            <div className="w-full flex flex-row justify-between px-2 mt-2">
                                <div className="w-[50%] pl-1 flex flex-row items-center mr-5">
                                    <p className="mb-0 text-base font-medium">8</p>
                                    <div className="w-1 h-5 bg-lime-400 mx-2 rounded-2xl"></div>
                                    <p className="mb-0 text-xs text-gray-400">IN TOTAL</p>   
                                </div>
                                <div className="w-[50%] pl-1 flex flex-row items-center">
                                    <p className="mb-0 text-base font-medium">8</p>
                                    <div className="w-1 h-5 bg-lime-400 mx-2 rounded-2xl"></div>
                                    <p className="mb-0 text-xs text-gray-400">WAITING</p>
                                </div>
                            </div>

                            <div className="w-full flex flex-row justify-between mt-3 px-2">
                                <div className="w-[50%] pl-1 flex flex-row items-center mr-5">
                                    <p className="mb-0 text-base font-medium">8</p>
                                    <div className="w-1 h-5 bg-lime-400 mx-2 rounded-2xl"></div>
                                    <p className="mb-0 text-xs text-gray-400">IN PROGRESS</p>
                                </div>
                                <div className="w-[50%] pl-1 flex flex-row items-center">
                                    <p className="mb-0 text-base font-medium">8</p>
                                    <div className="w-1 h-5 bg-lime-400 mx-2 rounded-2xl"></div>
                                    <p className="mb-0 text-xs text-gray-400">COMPLETED</p>
                                </div>
                            </div>

                        </section>

                        {/* Project Notes */}
                        <section className="w-full h-[35%] mt-4">
                            <div className="flex flex-row justify-between items-center">
                                <h4 className="text-lg mb-0">Project Notes</h4>
                                <NoteModal note={[]} edit={false} update={createNote}/>
                            </div>
                                
                            <div className="w-full h-[75%] mt-3 px-2 drop-shadow-md overflow-y-scroll">
                                {
                                    notes.map((note) => {
                                        return (
                                            <div key={note.id} className="px-3 pt-3 bg-gray-200 mb-3 rounded-2xl">
                                                <p className="text-[.65rem] mb-0">{note.text}</p>
                                                <section className="w-16 flex flex-row mt-1 ml-[70%] pb-2 ">
                                                    
                                                    <NoteModal note={note} edit={true} update={updateNote}/>
                                                        
                                                    <button onClick={()=>deleteNote(note.id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.1} className="w-5 h-5 ml-3 stroke-gray-400 hover:stroke-red-600 cursor-pointer">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                        </svg>
                                                    </button>

                                                </section>
                                            </div>
                                        )
                                    })
                                }
                                
                            </div>
                        </section>
                    </div>
                </section>
            </div>

            <ProjectModal
                id={project.id}
                project={project}
                edit={true}
                show={showProject}
                close={handleCloseProject}
                open={handleShowProject}
                submit={updateProject}/>
            
        </>
    )
}