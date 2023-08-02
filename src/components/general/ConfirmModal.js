import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';


function ConfirmModal(props) {

    const task = props.task;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            {task.status === 'Done' ? 
                <div
                    className='border-2 border-gray-300 stroke-white bg-gray-300 rounded-full p-1 hover:bg-[#c1c2ff] hover:border-[#c1c2ff]'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} className="w-4 h-4 stroke-inherit">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div>
                :
                <button
                    onClick={handleShow}
                    className='border-2 border-gray-300 stroke-gray-300 hover:bg-[#B1B2FF] hover:stroke-white hover:border-[#B1B2FF] rounded-full p-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} className="w-4 h-4 stroke-inherit">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </button>
            }
            
        
                    

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered={true}
                
        >
                <Modal.Header closeButton>
                    
            </Modal.Header>
            <Modal.Body>
                <p className='text-center text-lg font-semibold'>Would you also like to delete this task?</p>
            </Modal.Body>
                <Modal.Footer>
                    <button className='bg-gray-300 hover:bg-gray-400 hover:drop-shadow-lg transition-all ease-in-out text-white font-bold py-2 px-4 rounded'
                        onClick={() => {
                                props.updateTask(task.id, task.name, task.desc, task.date, 'Done')
                                handleClose();
                            }
                        }>
                        Just Mark as Done
                    </button>
                    
                    <button 
                        className='bg-red-700 hover:bg-black text-white transition-all ease-in-out font-bold py-2 px-4 rounded'  
                        onClick={(e) => {
                            handleClose();
                            props.deleteTask(props.taskId);
                        }}>
                        Delete
                    </button>

                </Modal.Footer>
        </Modal>
        </>
    );
}


export default ConfirmModal;