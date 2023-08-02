import { AddIcon } from '../icons/icons';

import CreateButton from './CreateButton';
import MiniCalendar from './MiniCalendar';

export default function MainCard() {
    return (
        <>
            <div className='h-full w-full p-4 bg-white rounded-2xl drop-shadow-lg'>
                {/* <section className=' w-full h-[15%]'>
                    <CreateButton/>
                </section> */}

                <section className='w-full h-[25%] mt-1 flex flex-row items-start justify-between px-2'>
                    <img src="/img/weather.png" alt="" className='w-[50%]' />
                    <div className='text-gray-300 mt-3'>
                        <h1 className='font-semibold'>30° C</h1>
                        <p className='text-sm'>Durango, México</p>
                    </div>
                </section>

                <section className='w-full h-[70%] mt-3 pt-4 border-t-2 border-gray-200'>
                    <MiniCalendar/>
                </section>
            </div>
        </>
    )
}