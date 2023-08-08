import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { DashboardIcon, CalendarIcon, TaskIcon, ProjectIcon, SettingsIcon, LogOutIcon } from './icons/icons';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';



export default function Header(props) {
  const navigation = [

    { name: 'Dashboard', href: '/dashboard', icon: <DashboardIcon/>},
    { name: 'Calendar', href: '/calendar', icon: <CalendarIcon/>},
    { name: 'Tasks', href: '/tasks', icon: <TaskIcon/>},
    { name: 'Projects', href: '/projects', icon: <ProjectIcon/>},
  ]


  const logOut = () => {
    Cookies.remove('Session');
    window.location.reload();
  }


  return (
    <>
      <header className='top-0 left-0 fixed bg-[#B1B2FF] lg:w-[5vw] sm:w-[10vw] h-full px-2 pt-6'>
        <div className='flex flex-col justify-between h-full'>
          <section className='flex flex-col'>
              <img src='img/m2.png' width={'55px'} className='mx-auto mb-3'></img>
              {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => {
                  return (
                    (!isActive
                      ? 'rounded-2xl py-3 mt-3 text-lg w-full hover:bg-[#bec1ff] hover:text-white font-bold no-underline'
                      : 'rounded-2xl py-3 mt-3 text-lg  w-full  font-medium no-underline bg-[#8f8fff]')
                    );
                } }
              >
                {item.icon}
              </NavLink>
            ))}
          </section>
          <section>
                <NavLink
                    key={'settings'}
                    to={'/settings'}
                    className={({ isActive }) => {
                        return (
                          (!isActive
                            ? 'rounded-2xl py-3 lg:mt-32 mt-32 w-full no-underline hover:bg-[#bec1ff]'
                            : 'rounded-2xl py-3 lg:mt-32 mt-32 w-full no-underline bg-[#8b8bff] hover:bg-[#bec1ff]')
                          );
                      } }>
                    <SettingsIcon/>
                </NavLink>
            
                  <button
                      type="button"
                      className="flex rounded-2xl mx-auto mt-4 hover:bg-[#bec1ff] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 py-3"
                      onClick={logOut}>
                    <LogOutIcon/>
                  </button>
          </section>
        </div>          
      </header>
    </>
    
  );
  
}

