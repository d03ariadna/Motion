import { getElementError } from '@testing-library/react';
import { useState, useEffect } from 'react';
import { AddIcon } from '../icons/icons';

import CreateButton from './CreateButton';
import MiniCalendar from './MiniCalendar';

export default function MainCard() {

    const urls = [
        { id: 'Clear' },
        { main: 'Clouds' },
        { 'Snow': 'Snow' },
        { 'Rain': 'Rain' },
    ]


    const url = 'https://api.openweathermap.org/data/2.5/weather?q=durango&units=metric&appid=3ddea79a46ee4f686a61f5f51f48db95'
    const [weather, setWeather] = useState('Sunny');
    const [temp, setTemp] = useState('0');

    const getWeather = async () => {
        const result = await fetch(url);
        const data = await result.json();
        setWeather(data.weather[0].main);
        setTemp(Math.round(data.main.temp));
    }

    useEffect(() => {
        getWeather();
    }, [])


    
    return (
        <>
            <div className='h-full w-full p-4 bg-white rounded-2xl drop-shadow-lg'>
                {/* <section className=' w-full h-[15%]'>
                    <CreateButton/>
                </section> */}

                <section className='w-full h-[25%] flex flex-row items-center justify-between'>
                    <img src={`/img/${weather}.png`} alt="" className='w-[55%]' />
                    {/* <img src={`/img/sunny.png`} alt="" className='w-[50%]' /> */}
                    <div className='text-gray-300'>
                        <h1 className='font-semibold'>{temp}°C</h1>
                        <p className='text-sm mb-0'>Durango, México</p>
                    </div>
                </section>

                <section className='w-full h-[70%] mt-4 pt-4 border-t-2 border-gray-200'>
                    <MiniCalendar/>
                </section>
            </div>
        </>
    )
}