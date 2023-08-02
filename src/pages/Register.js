import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {API} from '../components/API';

export default function Register() {

    const [data, setData] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const getData = async () => {
        const result = await fetch(`${API}/register/`);
        const rdata = await result.json();
        setData(rdata);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name !== '' && email !== '' && password !== '') {

            const res = await fetch(`${API}/register/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    avatar,
                }),
            });

            console.log(res);
            clearValues();
            navigate('/login');

        } else {
            setMessage('You have to complete all fields');
        }
        


    }

    const clearValues = () => {
        setName("");
        setEmail("");
        setPassword("");
        setAvatar("");
    }


    useEffect(() => {
        getData();
    }, []);


    return (
        <section className='pt-32 font-popp'>
            <h1 className='text-violet-700 font-bold text-5xl text-center'>Create an Account</h1>
            <div className="w-full max-w-xl mx-auto mt-8">
                <form onSubmit={(e) => handleSubmit(e)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className='d-flex flex-row justify-evenly'>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Username
                            </label>
                            <input
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                                placeholder="Your Name"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" />
                            </div>
                            <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                                placeholder="your@email.com"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" />
                        </div>
                    </div>

                    <div className='d-flex flex-row justify-evenly'>
                        <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                            <input
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                placeholder="**********"
                                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password"  />
                        </div>
                        <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="avatar">
                            Avatar
                        </label>
                            <input
                                onChange={(e) => {
                                    setAvatar(e.target.value)
                                }}
                                placeholder="Your Avatar"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="avatar" type="text" />
                        </div>
                    </div>
                    <p className="text-red-500 text-xs italic text-center">{message}</p>
                    <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 ml-8 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Register
                    </button>
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mr-8" href="/login">
                        Log In
                    </a>
                    </div>
                </form>
            </div>
        </section>
    )
}