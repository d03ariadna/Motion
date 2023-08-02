import { useState } from "react";
import TaskModal from "../general/TaskModal";

export default function ProjectTask(props) {

    const task = props.task;

    const [showTask, setShowTask] = useState(false);

    const handleCloseTask = () => setShowTask(false);
    const handleShowTask = () => setShowTask(true);

    return (
        <>
            <div>
                <div className='w-[95%] px-4 pt-3 mr-8 mb-4 border-[1px] border-gray-300 bg-white rounded-xl drop-shadow-md hover:drop-shadow-xl'>
                    <section className='h-[80%]'>
                        <button onClick={handleShowTask} className="py-1 ">
                            <p className='mb-0 text-left text-sm font-medium '>{task.name}</p> 
                        </button>
                    </section>
                    
                    <section className='mb-2 py-2 border-2 border-white  flex flex-row flex-nowrap justify-between items-center '>
                        <p className='text-[.6rem] text-gray-400 mb-0'>
                            Deadline: {task.deadline}
                        </p>
                        <div className="flex flex-row">
                            <img src="/img/avatar.png" alt="" className='w-7 h-7 rounded-full border-[1px] border-slate-300 mr-[-10px]' />
                            <img src="/img/avatar.png" alt="" className='w-7 h-7 rounded-full border-[1px] border-slate-300' />
                        </div>
                    </section>
                    
                </div>
            </div>


             <TaskModal
                id={task.id}
                task={task}
                edit={true}
                show={showTask}
                close={handleCloseTask}
                open={handleShowTask}
                submit={props.updateTask}
                delete={props.deleteTask} />
        </>
    )
}