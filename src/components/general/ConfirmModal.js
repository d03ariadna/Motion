import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { useTasks, useTasksDispatch } from "../../context/TasksContext";

function ConfirmModal(props) {
  const [t, i18n] = useTranslation("global");

  const tasks = useTasks();
  const dispatch = useTasksDispatch();

  const task = props.task;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function updateTask(id, n_name, n_desc, n_date, n_status) {
    const updatedTask = {
      id: id,
      name: n_name,
      description: n_desc,
      date: n_date,
      status: n_status,
    };

    dispatch({
      type: "updated",
      task: updatedTask,
    });
  }

  function deleteTask(id) {
    dispatch({
      type: "deleted",
      id: id,
    });
  }

  return (
    <>
      {task.status === "DONE" ? (
        <div className="border-2 border-gray-300 stroke-white bg-gray-300 rounded-full p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            className="w-4 h-4 stroke-inherit"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
      ) : (
        <button
          onClick={handleShow}
          className="border-2 border-gray-300 stroke-gray-300 hover:bg-[#ce0d2d] hover:stroke-white hover:border-[#ce0d2d] rounded-full p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            className="w-4 h-4 stroke-inherit"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </button>
      )}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered={true}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <p className="text-center text-lg font-semibold">
            {t("conf-modal.question")}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="bg-gray-300 hover:bg-gray-400 hover:drop-shadow-lg transition-all ease-in-out text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              updateTask(
                task.id,
                task.name,
                task.description,
                task.date,
                "DONE"
              );
              handleClose();
            }}
          >
            {t("conf-modal.mark")}
          </button>

          <button
            className="bg-red-700 hover:bg-black text-white transition-all ease-in-out font-bold py-2 px-4 rounded"
            onClick={(e) => {
              handleClose();
              deleteTask(task.id);
            }}
          >
            {t("conf-modal.delete")}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModal;
