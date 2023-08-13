import { useState } from "react";

import ConfirmModal from "../general/ConfirmModal";
import TaskModal from "../general/TaskModal";

export default function CalendarTask({ task, deleteTask }) {
  const [showTask, setShowTask] = useState(false);

  const handleCloseTask = () => setShowTask(false);
  const handleShowTask = () => setShowTask(true);

  return (
    <>
      <li className="border-[1px] border-gray-200 flex items-center px-4 py-3 mb-4 hover:shadow-lg space-x-4 group rounded-xl ">
        {task.status !== "DONE" ? (
          <div className="p-2 bg-pink-200 rounded-full"></div>
        ) : (
          <button onClick={() => deleteTask(task.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className="w-5 h-5 stroke-gray-400 hover:stroke-red-600 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        )}

        <div className="flex-auto text-black">
          {task.status !== "DONE" ? (
            <button onClick={handleShowTask} className="py-1 ">
              <p className="mb-0 text-left text-sm font-medium ">{task.name}</p>
            </button>
          ) : (
            <p className="mb-0 text-left text-sm text-gray-400 font-medium line-through">
              {task.name}
            </p>
          )}

          <p className="mt-0.5 mb-0 text-gray-400 text-xs font-light">
            {task.status}
          </p>
        </div>
        <ConfirmModal task={task} />
      </li>

      <TaskModal
        id={task.id}
        task={task}
        edit={true}
        show={showTask}
        close={handleCloseTask}
        open={handleShowTask}
        personal={true}
      />
    </>
  );
}