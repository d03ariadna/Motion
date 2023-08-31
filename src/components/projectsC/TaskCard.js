import { useState } from "react";

import { useTasksDispatch } from "../../context/TasksContext";

import TaskModal from "../general/TaskModal";
import ConfirmModal from "../general/ConfirmModal";

import { useTranslation } from "react-i18next";
import { parseISO } from "date-fns/esm";
import { format } from "date-fns";

export default function TaskCard(props) {
  const dispatch = useTasksDispatch();

  const task = props.task;
  const nDate = parseISO(task.date);

  const [t, i18n] = useTranslation("global");

  const [showTask, setShowTask] = useState(false);

  const handleCloseTask = () => setShowTask(false);
  const handleShowTask = () => setShowTask(true);

  function deleteTask(id) {
    dispatch({
      type: "deleted",
      id: id,
    });
  }

  return (
    <>
      <div>
        <div className="w-72 h-[13rem] px-2 pt-3 mr-8 mb-4 border-[1px] border-gray-300 bg-white rounded-xl drop-shadow-md hover:drop-shadow-xl">
          <section className=" mb-3 mr-2 border-2 border-white  flex flex-row flex-nowrap justify-between items-center ">
            {task.status === "Done" ? (
              <p className="text-xs text-gray-700 mb-0 ml-2">
                {t("tasks.my-completed")}
              </p>
            ) : (
              <p className="text-xs text-[#ce0d2d8e] mb-0 ml-2">{format(nDate, 'MMMM do')}</p>
            )}

            <ConfirmModal task={task} />
          </section>

          {task.status === "DONE" ? (
            <section className="pl-2 py-1 text-gray-300 text-sm font-medium line-through">
              {task.name}
            </section>
          ) : (
            <section className="pl-2">
              <button onClick={handleShowTask} className="py-1 ">
                <p className="mb-0 text-left text-lg font-semibold ">
                  {task.name}
                </p>
              </button>
            </section>
          )}

          <section className="h-[25%] my-2">
            <p
              className={
                task.status === "DONE"
                  ? "pl-2 mt-[5px] mb-0 text-xs font-light tracking-wide leading-4 text-gray-300"
                  : "pl-2 mt-[5px] mb-0 text-xs font-light tracking-wide leading-4 text-gray-400"
              }
            >
              {task.description}
            </p>
          </section>

          <section>
            <button
              onClick={() => {
                deleteTask(task.id);
              }}
              className={
                task.status === "DONE"
                  ? "mr-2 px-4 py-1 border-2 border-red-600 hover:bg-red-600 hover:drop-shadow-lg hover:text-white text-sm text-red-600 font-semibold rounded-2xl float-right"
                  : "mr-2 px-4 py-1 bg-gray-300 hover:bg-red-600 hover:drop-shadow-lg text-sm text-white font-semibold rounded-2xl float-right"
              }
            >
              {t("tasks.delete")}
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
        personal={true}
        userType={1}
      />
    </>
  );
}
