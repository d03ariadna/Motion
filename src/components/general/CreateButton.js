import { Fragment, useState, useEffect } from 'react'
import {useTranslation} from "react-i18next";
import { Menu, Transition } from '@headlessui/react';

import TaskModal from './TaskModal';
import ProjectModal from './ProjectModal';

import { AddIcon } from '../icons/icons'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}




export default function CreateButton(props) {

  const [t, i18n] = useTranslation("global");
  
  const [showTask, setShowTask] = useState(false);

  const handleCloseTask = () => setShowTask(false);
  const handleShowTask = () => setShowTask(true);
  
  const [showProject, setShowProject] = useState(false);

  const handleCloseProject = () => setShowProject(false);
  const handleShowProject = () => setShowProject(true);

  const [mainColor, setMainColor] = useState('#b1b2ff');

  return (
      <>
          <Menu as="div" className=" relative inline-block text-left w-[250px]">
            <div>
              <Menu.Button className={`inline-flex flex-row w-full justify-center items-center gap-x-1.5 rounded-full bg-[${mainColor}] px-10 py-2.5 text-2xl font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 focus-within:bg-black hover:bg-black transition-all ease-in-out`}>
                <AddIcon />
                {t("create.d-create")}
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute left-4 z-10 mt-2 w-56 origin-bottom-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                
              {props.action == 'task' ? 
                <button onClick={handleShowTask} className='w-full px-4 py-3 text-sm hover:bg-gray-100 hover:text-purple-600 rounded-md'>
                    {t("create.task")}
                </button>
              :
                props.action == 'project' ?
                  <button onClick={handleShowProject} className='w-full px-4 py-3 text-sm hover:bg-gray-100 hover:text-purple-600 rounded-md'>
                    {t("create.project")}
                  </button>
                :
                <>
                    <button onClick={handleShowTask} className='w-full px-4 py-3 text-sm hover:bg-gray-100 hover:text-purple-600 rounded-md'>
                      {t("create.task")}
                    </button>
                    <button onClick={handleShowProject} className='w-full px-4 py-3 text-sm hover:bg-gray-100 hover:text-purple-600 rounded-md'>
                      {t("create.project")}
                    </button>
                </>
              }
              
                {/* <button onClick={handleShow} className='w-full px-4 py-3 text-sm hover:bg-gray-100 hover:text-purple-600 rounded-md'>
                    New Project
                </button> */}
              </Menu.Items>
            </Transition>
          </Menu>

      
      <TaskModal
        id={1}
        task={[]}
        edit={false}
        show={showTask}
        close={handleCloseTask}
        open={handleShowTask}/>


      <ProjectModal
        id={2}
        project={[]}
        edit={false}
        show={showProject}
        close={handleCloseProject}
        open={handleShowProject}
        submit={props.createProject}/>
    </>
  )
}