import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

function AddMemberModal(props) {

    const [show, setShow] = useState(false);

    const members = props.members;
    const [email, setEmail] = useState('');

    const handleShow = () => {
        setShow(!show);
    }

    return (
        <>      
            <button
                onClick={() => handleShow()}
                className="py-1 px-3 text-white bg-gray-300 hover:bg-purple-400 rounded-full ml-[-20px] text-3xl font-medium">
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
                            <p className='text-[#B1B2FF] font-bold text-3xl mb-0 ml-3'>
                                Add Member
                            </p>
                        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                        
                            props.addMember(email);
                            setEmail('');
                            
                    }}
                    id='editmodal' 
                    className="w-full max-w-sm mx-auto" 
                        >
                        {/* Name Input */}
                        <div className="md:flex md:items-center justify-between mt-3 mb-5">
                            <div className="md:w-3/4">
                            <input 
                                className="w-full appearance-none border-2 border-gray-200 rounded-xl py-3 pl-4 text-lg font-semibold text-purple-600 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 focus:text-gray-800 placeholder:text-gray-300"
                                id="email" 
                                type="text"
                                placeholder='Email'  
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}        
                            />
                            </div>
                            <button className='border-2 border-[#b1b2ff] text-[#b1b2ff] hover:bg-[#b1b2ff] hover:text-white hover:drop-shadow-lg transition-all ease-in-out font-bold py-3 px-4 rounded-xl' form='editmodal'>
                                Add
                            </button>
                        </div>

                        <div className='w-full h-100 mb-3'>
                            <h4 className=' font-semibold text-gray-300'>Current members:</h4>
                            <section className='h-[80%]'>
                                {members.map((member) => {
                                    return (
                                        <div className='flex flex-row items-center mt-4 pb-3 border-b-2 border-gray-200'>
                                            <div className=' h-8 w-8 text-center rounded-full font-medium text-lg bg-black text-white'>A</div>
                                            <p className='mb-1 text-gray-500 ml-3 text-xl font-light'>{member}</p>
                                        </div>
                                    )
                                })}
                            </section>
                        </div>
                            
                    </form>
                </Modal.Body>
                    <Modal.Footer>
                        
                    <button
                        onClick={() => handleShow()}
                        className='bg-[#B1B2FF] hover:bg-black hover:drop-shadow-lg transition-all ease-in-out text-white font-bold py-2 px-4 rounded'>
                            Done
                        </button>
                    </Modal.Footer>
            </Modal>
        </>
    );
}


export default AddMemberModal;