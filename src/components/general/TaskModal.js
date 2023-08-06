import { da } from 'date-fns/locale';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { DatePicker } from './DatePicker';

import { v4 as uuidv4 } from 'uuid';

import {
  format,
  parseISO,
    startOfToday,
} from 'date-fns'

function TaskModal(props) {
    
    const task = props.task;
    let id;

    let actualDay;

    if (task.length === 0) {
            
        actualDay = startOfToday();
            
    } else {
            
        actualDay = parseISO(task.date);
    }
            
    

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');

    const getDate = (nDate) => {
        //setTempDate(newDate)
        console.log(nDate)
        setDate(format(nDate, 'y-MM-dd'));
    }
    useEffect(() => {
        
        if (props.edit) {   
            setName(task.name);
            setDesc(task.description);
            setDate(task.date);
            setStatus(task.status);
        }

            
        
    }, []);

    return (
        <>
            <Modal
                show={props.show}
                onHide={() => props.close()}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                        <Modal.Title>
                            <p className='text-[#B1B2FF] font-bold text-3xl mb-0 ml-3'>
                                {props.edit ? 'Edit Task' : 'Create New Task'}
                            </p>
                        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <form onSubmit={(e) => {
                          e.preventDefault();

                            props.edit ? id = task.id : id = uuidv4()
                        
                            props.submit(id, name, desc, date, status);
                        
                        if (!props.edit) {
                                setName('');
                                setDesc('');
                                setDate('');
                                setStatus('');
                            }
                            
                            
                            props.close();
                            
                    }}
                    id='editmodal' 
                    className="w-full max-w-sm mx-auto" 
                        >
                        {/* Name Input */}
                        <div className="md:flex md:items-center mt-3 mb-6">
                            <div className="md:w-1/3">
                            <label className="block text-gray-400 font-medium md:text-left mb-1 ml-4 md:mb-0 pr-4" htmlFor="name">
                                Name:
                            </label>
                            </div>
                            <div className="md:w-3/4">
                            <input 
                            className="w-full appearance-none border-2 border-gray-200 rounded-xl py-2 pl-3 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 focus:text-gray-800"
                            id="name" 
                            type="text" 
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                            />
                            </div>
                        </div>

                        {/* Description Input */}
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                            <label className="block text-gray-400 font-medium md:text-left mb-1 ml-4 md:mb-0 pr-4"  htmlFor="role">
                                Description:
                            </label>
                            </div>
                            <div className="md:w-3/4">
                            <input 
                                className="appearance-none border-2 border-gray-200 rounded-xl w-full py-2 pl-3 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 focus:text-gray-800" 
                                id="date" 
                                type="text" 
                                value={desc}
                                onChange={(e) => {
                                setDesc(e.target.value)
                                }}
                            />
                            </div>
                        </div>
                            
                        {/* Date Input */}
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                            <label className="block text-gray-400 font-medium md:text-left mb-1 ml-4 md:mb-0 pr-4"  htmlFor="role">
                                Date:
                            </label>
                            </div>
                                <div className="md:w-3/4">
                                <DatePicker dateSet={actualDay} setDate={getDate}/>
                            </div> 
                        </div>
                            
                        {/* Status Input */}
                        <div className="md:flex md:items-center mt-3 mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-400 font-medium md:text-left mb-1 ml-4 md:mb-0 pr-4" htmlFor="name">
                                    Status:
                                </label>
                            </div>
                            <div className="relative w-3/4">
                                    <select
                                        value={status}
                                        onChange={(event) => {
                                            setStatus(event.target.value);
                                        }}
                                        className='block appearance-none w-full border-2 border-gray-200 rounded-xl text-gray-500 py-2 pl-3 pr-8 focus:outline-none focus:bg-white focus:border-purple-500 focus:text-gray-800' id="grid-state">
                                    <option value={'To Do'} className='text-gray-400'>To Do</option>
                                    <option value={'Doing'} className='text-gray-400'>Doing</option>
                                    <option value={'Done'} className='text-gray-400'>Done</option>
                                </select>
                            </div>
                        </div>
                            
                    </form>
                </Modal.Body>
                    <Modal.Footer>
                        {
                            props.edit ?
                                <button 
                                    className='bg-gray-300 hover:bg-red-700 text-white transition-all ease-in-out font-bold py-2 px-4 rounded'  
                                onClick={() => {
                                    props.delete(task.id)
                                    props.close()
                                }}>
                                    Delete Task
                                </button>
                                :
                                <></>
                        }
                        
                        <button className='bg-[#B1B2FF] hover:bg-black hover:drop-shadow-lg transition-all ease-in-out text-white font-bold py-2 px-4 rounded' form='editmodal'>
                            {props.edit ? 'Update' : 'Create'}
                        </button>
                    </Modal.Footer>
            </Modal>
        </>
    );
}


export default TaskModal;