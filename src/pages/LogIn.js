import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../components/API';
import Cookies from 'js-cookie';

export default function LogIn() {

    const [data, setData] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const getData = async () => {
        const result = await fetch(`${API}/login/`);
        const rdata = await result.json();
        setData(rdata);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${API}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        console.log(res);

        if (res.status == 200) {
            Cookies.set('Session', email)
            window.location.reload();
            // navigate('/dashboard');

        } else if(res.status == 401) {
            setEmail('');
            setPassword('');
            setMessage('Invalid credentials');
        }
        

    }


    useEffect(() => {
        getData();
    }, []);


    return (
        <section className='pt-32 font-popp'>
            <h1 className='text-violet-700 font-bold text-5xl text-center'>Welcome Back!</h1>
            <div className="w-full max-w-xs mx-auto mt-8">
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        onChange={(e) => {
                            setEmail(e.target.value)
                            }}
                            value={email}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Email" />
                    </div>
                    <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        onChange={(e) => {
                            setPassword(e.target.value)
                            }}
                            value={password}
                        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                    <p className="text-red-500 text-xs italic">{message}</p>
                    </div>
                    <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Log In
                    </button>
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/register">
                        Register
                    </a>
                    </div>
                </form>
            </div>
        </section>
    )
}