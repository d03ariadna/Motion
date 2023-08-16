import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

import { MiniIMG } from "./MemberImg";
import { v4 as uuidv4 } from "uuid";

function AddMemberModal(props) {
  const [show, setShow] = useState(false);

  const members = props.members;
  const [email, setEmail] = useState("");


  const handleShow = () => {
    setShow(!show);
  };

  return (
    <>
      <button
        onClick={() => handleShow()}
        className="py-1 px-3.5 text-white bg-gray-300 hover:bg-purple-400 rounded-full text-3xl font-medium"
      >
        +
      </button>

      <Modal
        show={show}
        onHide={() => handleShow()}
        backdrop="static"
        keyboard={false}
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p className="text-[#B1B2FF] font-bold text-3xl mb-0 ml-3">
              Add Member
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              props.addMember(email);
              setEmail("");
            }}
            id="editmodal"
            className="w-full max-w-sm mx-auto"
          >
            {/* Name Input */}
            <div className="md:flex md:items-center justify-between mt-3 mb-5">
              <div className="md:w-3/4">
                <input
                  className="w-full appearance-none border-2 border-gray-200 rounded-xl py-3 pl-4 text-lg font-semibold text-purple-600 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 focus:text-gray-800 placeholder:text-gray-300"
                  id="email"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                className="border-2 border-[#b1b2ff] text-[#b1b2ff] hover:bg-[#b1b2ff] hover:text-white hover:drop-shadow-lg transition-all ease-in-out font-bold py-3 px-4 rounded-xl"
                form="editmodal"
              >
                Add
              </button>
            </div>

            <div className="w-full h-100 mb-3">
              <h4 className=" font-semibold text-gray-300">Current members:</h4>
              <section className="h-[80%]">
                {members.map((member) => {
                  return (
                    <div
                      key={uuidv4()}
                      className="flex flex-row justify-between items-center mt-4 pb-3 border-b-2 border-gray-200"
                    >
                      <div className="flex flex-row items-center">
                        <div className="w-8 h-8">
                          <MiniIMG member={member} />
                        </div>
                        <p className="mb-1 text-gray-500 ml-3 text-xl font-light">
                          {member.email}
                        </p>
                      </div>
                      <div>
                        {member.type === 1 ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="#b1b2ff"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="#b2b2b2"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  );
                })}
              </section>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => handleShow()}
            className="bg-[#B1B2FF] hover:bg-black hover:drop-shadow-lg transition-all ease-in-out text-white font-bold py-2 px-4 rounded"
          >
            Done
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddMemberModal;
