import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { DatePicker } from './DatePicker';
import ColorPicker from './ColorPicker';

import {
    format,
    formatISO,
    parse,
    parseISO,
    startOfToday
} from 'date-fns';

import { v4 as uuidv4 } from 'uuid';
import { te } from 'date-fns/locale';

function ProjectModal(props) {

    const project = props.project;
    let id;
    
    let tStart = [];
    let tEnd = [];


    if (project.length === 0) {
        
        tStart = startOfToday();
        tEnd = startOfToday();
            
    } else {
        
        tStart = parseISO(project.start);
        tEnd = parseISO(project.end);

    }

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');



    useEffect(() => {

        if (props.edit) {
            
            setName(project.name);
            setDesc(project.description);
            setStart(format(tStart, 'y-MM-dd'));
            setEnd(tEnd);

        } else {
            setStart(format(startOfToday(), 'y-MM-dd'));
            setEnd(format(startOfToday(), 'y-MM-dd'));
        }
        
    }, []);


    const getStart = (newDate) => {
        
        setStart(format(newDate, 'y-MM-dd'));
    }

    const getEnd = (newDate) => {
        
        setEnd(format(newDate, 'y-MM-dd'));
    }



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
                                {props.edit ? 'Edit Project' : 'Create New Project'}
                            </p>
                        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                        
                            props.edit ? id=project.id : id=uuidv4()
                            //Update or Create Project
                            props.submit(id, name, desc, start, end);
                        
                            setName('');
                            setDesc('');
                            setStart('');
                            setEnd('');
                        
                            tStart = [];
                            tEnd = [];
                        
                            props.close();
                            
                    }}
                    id='editmodal' 
                    className="w-full max-w-sm mx-auto" 
                        >
                        {/* Name Input */}
                        <div className="md:flex md:items-center mt-3 mb-6">
                            <div className="md:w-1/3">
                            <label className="block text-gray-400 font-semibold md:text-left mb-1 ml-4 md:mb-0 pr-4" htmlFor="name">
                                Name:
                            </label>
                            </div>
                            <div className="md:w-3/4">
                            <input 
                            className="w-full appearance-none border-2 border-gray-200 rounded-xl py-2 pl-3 text-gray-600 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 focus:text-gray-800"
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
                            <label className="block text-gray-400 font-semibold md:text-left mb-1 ml-4 md:mb-0 pr-4"  htmlFor="role">
                                Description:
                            </label>
                            </div>
                            <div className="md:w-3/4">
                            <input 
                                className="appearance-none border-2 border-gray-200 rounded-xl w-full py-2 pl-3 text-gray-600 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 focus:text-gray-800" 
                                id="date" 
                                type="text" 
                                value={desc}
                                onChange={(e) => {
                                setDesc(e.target.value)
                                }}
                            />
                            </div>
                        </div>
                            
                        {/* Start Date Input */}
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                            <label className="block text-gray-400 font-semibold md:text-left mb-1 ml-4 md:mb-0 pr-4"  htmlFor="start">
                                Start Date:
                            </label>
                            </div>
                            <div className="md:w-3/4">
                                {props.edit ? 
                                    <input 
                                        className="appearance-none border-2 border-gray-200 rounded-xl w-full py-2 pl-3 text-gray-400 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 focus:text-gray-800" 
                                        id="start" 
                                        type="text" 
                                        value={format(tStart, 'MMMM dd, y') }
                                        disabled={true}
                                    /> 
                                    :
                                    <DatePicker dateSet={tStart} setDate={getStart}/>
                                }
                                    
                                    {/* <input 
                                        className="appearance-none border-2 border-gray-200 rounded-xl w-full py-2 pl-3 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 focus:text-gray-800" 
                                        id="start" 
                                        type="text" 
                                        value={format(tStart, 'MMMM dd, y') }
                                        disabled={true}
                                    /> */}
                            </div>
                        </div>
                            
                        {/* End Date Input */}
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                            <label className="block text-gray-400 font-semibold md:text-left mb-1 ml-4 md:mb-0 pr-4"  htmlFor="end">
                                End Date:
                            </label>
                            </div>
                            <div className="md:w-3/4">
                            <DatePicker dateSet={tEnd} setDate={getEnd}/>
                                    {/* <input
                                className="appearance-none border-2 border-gray-200 rounded-xl w-full py-2 pl-3 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 focus:text-gray-800"
                                id="end"
                                type="text"
                                value={end}
                                onChange={(e) => {
                                setEnd(e.target.value)
                                }}
                            /> */}
                            </div>
                        </div>
                            
                            
                    </form>
                </Modal.Body>
                    <Modal.Footer>
                        
                        <button className='bg-[#B1B2FF] hover:bg-black hover:drop-shadow-lg transition-all ease-in-out text-white font-bold py-2 px-4 rounded' form='editmodal'>
                            {props.edit ? 'Update' : 'Create'}
                        </button>
                    </Modal.Footer>
            </Modal>
        </>
    );
}


export default ProjectModal;