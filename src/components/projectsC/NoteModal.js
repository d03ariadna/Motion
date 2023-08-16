import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

import { v4 as uuidv4 } from "uuid";

function NoteModal(props) {
  const note = props.note;
  let id;

  const [text, setText] = useState("");

  const [show, setShow] = useState(false);

  function handleShow() {
    setShow(!show);
  }

  useEffect(() => {
    if (props.edit) {
      setText(note.content);
    }
  }, []);

  return (
    <>
      {props.edit ? (
        <button onClick={() => handleShow()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.1}
            className="w-5 h-5 ml-3 stroke-gray-400 hover:stroke-blue-600 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
      ) : (
        <button
          onClick={() => handleShow()}
          className="border-[2px] border-gray-300 w-6 mr-2 text-center text-sm font-normal text-gray-300 rounded-full hover:bg-black hover:text-white hover:border-black cursor-pointer"
        >
          +
        </button>
      )}

      <Modal
        show={show}
        onHide={() => handleShow()}
        backdrop="static"
        keyboard={false}
        centered={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p className="text-[#B1B2FF] font-semibold text-2xl mb-0 ml-3">
              {props.edit ? "Edit Note" : "Create New Note"}
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              props.edit ? (id = note.id) : (id = uuidv4());

              props.update(id, text);

              if (!props.edit) {
                setText("");
              }
              handleShow();
            }}
            id="editmodal"
            className="w-full max-w-sm mx-auto"
          >
            {/* Name Input */}
            <div className="md:flex mt-3 mb-6">
              <div className="md:w-full">
                <textarea
                  className="w-full appearance-none border-2 border-gray-200 rounded-xl py-2 pl-3 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 focus:text-gray-800"
                  id="content"
                  type="text"
                  rows={5}
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="bg-[#B1B2FF] hover:bg-black hover:drop-shadow-lg transition-all ease-in-out text-white font-bold py-2 px-4 rounded"
            form="editmodal"
          >
            {props.edit ? "Update" : "Create"}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NoteModal;
