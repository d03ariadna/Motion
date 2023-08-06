import { useState } from "react";

import { format, parseISO } from 'date-fns';

import ConfirmModal from "../general/ConfirmModal";
import TaskModal from "../general/TaskModal";

export default function LittleTask(props) {
    const task = props.task;

    const [showTask, setShowTask] = useState(false);

    const handleCloseTask = () => setShowTask(false);
    const handleShowTask = () => setShowTask(true);

    const pDate = parseISO(task.date);

    return (
        <>
            <div>
                <div className='w-52 h-[7.5rem] px-2 pt-2 mr-8 mb-4 border-[1px] border-gray-300 bg-white rounded-xl drop-shadow-md hover:drop-shadow-xl'>
                    <section className=' mb-3 border-2 border-white  flex flex-row flex-nowrap justify-between items-center '>
                        <p className='text-xs text-gray-300 mb-0 ml-2'>
                            {format(pDate, 'MMMM do')}
                        </p>

                        {/* <button
                            onClick={() => (props.deleteTask(props.id))}
                            className='border-2 border-gray-300 stroke-gray-300 hover:bg-[#B1B2FF] hover:stroke-white hover:border-[#B1B2FF] rounded-full p-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} className="w-4 h-4 stroke-inherit">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </button> */}
                        <ConfirmModal
                            task={task}
                            updateTask={props.updateTask}
                            deleteTask = {props.deleteTask}
                        />
                    </section>

                        <section className='pl-2'>
                            <button onClick={handleShowTask} className="py-1 ">
                                <p className='mb-0 text-left text-sm font-medium '>{task.name}</p> 
                            </button>
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