import MiniCalendar from "../components/general/MiniCalendar"

import { Menu, Transition } from '@headlessui/react';
import { LeftIcon, RightIcon } from '../components/icons/icons';
import TaskModal from "../components/general/TaskModal";
import CreateButton from "../components/general/CreateButton";
import ConfirmModal from "../components/general/ConfirmModal";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns'
import { Fragment, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Calendar() {

  const [events, setEvents] = useState([
  {
    id: 1,
    name: "Buy a gift for Christina's Birthday",
    description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
    startDatetime: '2023-08-14T13:00',
    endDatetime: '2023-08-15T14:30',
    status: "To Do",
    },
  {
    id: 2,
    name: "Finish Zencon Project",
    description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
    startDatetime: '2023-08-11T13:00',
    endDatetime: '2023-08-11T14:30',
    status: "To Do",
  },
  {
    id: 3,
    name: "Going to the supermarket",
    description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
    startDatetime: '2023-08-11T13:00',
    endDatetime: '2023-08-11T14:30',
    status: "To Do",
  },
  {
    id: 4,
    name: "Attend Justia meeting",
    description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
    startDatetime: '2023-08-11T13:00',
    endDatetime: '2023-08-11T14:30',
    status: "To Do",
  },
  {
    id: 5,
    name: "Buy suplements for gym",
    description: "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
    startDatetime: '2023-08-11T13:00',
    endDatetime: '2023-08-11T14:30',
    status: "Done",
  },
])

  let selectedDate = startOfToday();
  let actualDay = (useParams()).day;

  if (actualDay) {
    selectedDate = parse(actualDay, 'y-MM-dd', new Date());
  }

  // let {today = startOfToday()} = useParams().day;
  //     const dayString = (useParams()).day;
  //     today = parse(dayString, 'y-MM-dd', new Date());
  //   today = startOfToday();

  let [selectedDay, setSelectedDay] = useState(selectedDate);
  let [currentMonth, setCurrentMonth] = useState(format(selectedDate, 'MMM-yyyy'))
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())


  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  })

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  let selectedDayMeetings = events.filter((meeting) =>
    isSameDay(parseISO(meeting.startDatetime), selectedDay)
  )

  function createTask(id, name, desc, start, end, status) {
    console.log('task created');
  }
  
  function updateEvent(id, n_name, n_desc, n_end, n_status) {
        
    let updatedTasks = events.map((event) => {
        if (event.id === id) {
          return {
            ...event,
            name: n_name,
            description: n_desc,
            end: n_end,
            status: n_status
          }
        }
        return event;
      });

    setEvents(updatedTasks);
  }

  function deleteEvent(id) {
    const newEvents = events.filter((event) => {
      return event.id !== id
    })

    setEvents(newEvents);
  }



  return (
    <div className="">
        <div className=" w-full mx-auto">
            <div className="flex flex-row">
                  <div className=" w-[70%] h-[94vh] px-2 pt-4 mr-8  rounded-2xl">
                        
                        {/* Calendar Section */}
                        <div className="px-12 flex items-center justify-between">
                            <button
                                type="button"
                                onClick={previousMonth}
                                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">Previous month</span>
                                <LeftIcon/>
                            </button>  
                            <h2 className="font-semibold text-gray-900">
                                {format(firstDayCurrentMonth, 'MMMM yyyy')}
                            </h2>
                            
                            <button
                                onClick={nextMonth}
                                type="button"
                                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">Next month</span>
                                <RightIcon/>
                            </button>
                        </div>
                        <div className="grid grid-cols-7 mt-12 text-sm leading-6 text-center font-light text-[#B1B2FF]">
                            <div>S</div>
                            <div>M</div>
                            <div>T</div>
                            <div>W</div>
                            <div>T</div>
                            <div>F</div>
                            <div>S</div>
                        </div>
            
                        {/* Days Section */}
                        <div className="grid grid-cols-7 mt-4 text-xl font-light">
                        {days.map((day, dayIdx) => (
                            <div
                                key={day.toString()}
                                className={classNames(
                                    dayIdx === 0 && colStartClasses[getDay(day)],
                                    'py-[1rem]'
                                )}
                                >
                                <button
                                    type="button"
                                    onClick={() => setSelectedDay(day)}
                                    className={classNames(
                                    isEqual(day, selectedDay) && 'text-white',
                                    !isEqual(day, selectedDay) &&
                                        isToday(day) &&
                                        'text-[#B1B2FF] ',
                                    !isEqual(day, selectedDay) &&
                                        !isToday(day) &&
                                        isSameMonth(day, firstDayCurrentMonth) &&
                                        'text-gray-900',
                                    !isEqual(day, selectedDay) &&
                                        !isToday(day) &&
                                        !isSameMonth(day, firstDayCurrentMonth) &&
                                        'text-gray-400',
                                    isEqual(day, selectedDay) && isToday(day) && 'bg-[#B1B2FF]' ,
                                    isEqual(day, selectedDay) &&
                                        !isToday(day) &&
                                        'bg-gray-900',
                                    !isEqual(day, selectedDay) && 'hover:bg-gray-100',
                                    (isEqual(day, selectedDay) || isToday(day)) &&
                                        'font-semibold',
                                    'mx-auto flex h-12 w-12 items-center justify-center rounded-full'
                                    )}
                                >
                                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                                    {format(day, 'd')}
                                    </time>
                                </button>

                                <div className="w-2 h-2 mx-auto mt-1">
                                    {events.some((meeting) =>
                                    isSameDay(parseISO(meeting.startDatetime), day)
                                    ) && (
                                    <div className="w-2 h-2 rounded-full bg-pink-300"></div>
                                    )}
                                </div>
                            </div>
                        ))}
                        </div>
                  </div>
          
                {/* Events Section */}
                <div className="w-[27%] h-[95vh] ml-2 pb-2 flex flex-col justify-between">
                  
                  <div className='w-full flex flex-row justify-between items-center pl-5'>
                      
                      <CreateButton
                        action={'task'}
                        createTask={createTask}
                      />
                      <img src="/img/avatar.png" alt="" className='w-14 h-14 rounded-full mr-5'/>
                  </div>
                  <section className="h-[88%] pt-6 ml-6 bg-white rounded-2xl drop-shadow-2xl">
                          <h2 className="pl-8 font-semibold text-gray-900 text-2xl">
                                    <p className="mb-2 text-gray-300 font-normal text-lg">Schedule for</p>
                                  <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                                      {format(selectedDay, 'E do, MMMM yyy')}
                                  </time>
                          </h2>
                          <div className="h-[75%] mt-4 px-4 space-y-1 text-sm leading-6 text-gray-500 overflow-y-scroll">
                              {selectedDayMeetings.length > 0 ? (
                              selectedDayMeetings.map((event) => (
                                   
                                      <Event key={event.id} event={event} task={event} updateTask={updateEvent} deleteTask={deleteEvent} />
                                      ))
                              ) : (
                                      <p className="mt-40 text-center text-base font-light text-gray-300">No meetings for today.</p>
                              )}
                          </div>
                  </section>
                </div>
            </div>
        </div>
    </div>
  )
}

function Event({ event, task, updateTask, deleteTask }) {

  const [showTask, setShowTask] = useState(false);

  const handleCloseTask = () => setShowTask(false);
  const handleShowTask = () => setShowTask(true);
  
  let startDateTime = parseISO(event.startDatetime)
  let endDateTime = parseISO(event.endDatetime)


  return (

    <>
      <li className="border-[1px] border-gray-200 flex items-center px-4 py-3 mb-4 hover:shadow-lg space-x-4 group rounded-xl ">
        {event.status !== 'Done' ?
          <div className="p-2 bg-pink-200 rounded-full"></div>
          :
          <button onClick={() => deleteTask(event.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-5 h-5 stroke-gray-400 hover:stroke-red-600 cursor-pointer">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
          </button>
        }
          
        <div className="flex-auto text-black">

          {event.status !== 'Done' ?
            <button onClick={handleShowTask} className="py-1 ">
                <p className='mb-0 text-left text-sm font-medium '>{task.name}</p> 
            </button>
            : <p className='mb-0 text-left text-sm text-gray-400 font-medium line-through'>{task.name}</p> 
          }
          

          <p className="mt-0.5 mb-0 text-gray-400 text-xs font-light">
            <time dateTime={event.startDatetime}>
              {format(startDateTime, 'h:mm a')}
            </time>{' '}
            -{' '}
            <time dateTime={event.endDatetime}>
              {format(endDateTime, 'h:mm a')}
            </time>
          </p>
        </div>
        <ConfirmModal
          task={task}
          updateTask={updateTask}
          deleteTask = {deleteTask}
        />
      </li>


      <TaskModal
          id={task.id}
          task={task}
          edit={true}
          show={showTask}
          close={handleCloseTask}
          open={handleShowTask}
          submit={updateTask}
          delete={deleteTask} />
      
    </>
  )
}

let colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
]
