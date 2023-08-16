import { useNavigate } from "react-router-dom";

import { LeftIcon, RightIcon } from "../components/icons/icons";
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
} from "date-fns";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { useTasks, useTasksDispatch } from "../context/TasksContext";
import CalendarTask from "../components/calendar/CalendarTask";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Calendar() {

  const navigate = useNavigate();
  
  const [t, i18n] = useTranslation("global");
  const tasks = useTasks();
  const dispatch = useTasksDispatch();

  let selectedDate = startOfToday();
  let actualDay = useParams().day;

  if (actualDay) {
    selectedDate = parse(actualDay, "y-MM-dd", new Date());
  }

  let [selectedDay, setSelectedDay] = useState(selectedDate);
  let [currentMonth, setCurrentMonth] = useState(
    format(selectedDate, "MMM-yyyy")
  );
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  let selectedDayMeetings = tasks.filter((meeting) =>
    isSameDay(parseISO(meeting.date), selectedDay)
  );


  function deleteTask(id) {
    dispatch({
      type: "deleted",
      id: id,
    });
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
                <LeftIcon />
              </button>
              <h2 className="font-semibold text-gray-900">
                {format(firstDayCurrentMonth, "MMMM yyyy")}
              </h2>

              <button
                onClick={nextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <RightIcon />
              </button>
            </div>
            <div className="grid grid-cols-7 mt-12 text-sm leading-6 text-center font-light text-[#B1B2FF]">
              <div>{t("calendar.s")}</div>
              <div>{t("calendar.m")}</div>
              <div>{t("calendar.t")}</div>
              <div>{t("calendar.w")}</div>
              <div>{t("calendar.t2")}</div>
              <div>{t("calendar.f")}</div>
              <div>{t("calendar.s2")}</div>
            </div>

            {/* Days Section */}
            <div className="grid grid-cols-7 mt-4 text-xl font-light">
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    "py-[1rem]"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={classNames(
                      isEqual(day, selectedDay) && "text-white",
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "text-[#B1B2FF] ",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-900",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-400",
                      isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "bg-[#B1B2FF]",
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        "bg-gray-900",
                      !isEqual(day, selectedDay) && "hover:bg-gray-100",
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        "font-semibold",
                      "mx-auto flex h-12 w-12 items-center justify-center rounded-full"
                    )}
                  >
                    <time dateTime={format(day, "yyyy-MM-dd")}>
                      {format(day, "d")}
                    </time>
                  </button>

                  <div className="w-2 h-2 mx-auto mt-1">
                    {tasks.some((meeting) =>
                      isSameDay(parseISO(meeting.date), day)
                    ) && (
                      <div className="w-2 h-2 rounded-full bg-pink-300"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks Section */}
          <div className="w-[27%] h-[95vh] ml-2 pb-2 flex flex-col justify-between">
            <div className="w-full flex flex-row justify-between items-center pl-5">
              <CreateButton action={"task"} personal={true} />
              <img
                src="/img/avatar.png"
                alt=""
                className="w-14 h-14 rounded-full mr-5"
              />
            </div>
            <section className="h-[88%] pt-6 ml-6 bg-white rounded-2xl drop-shadow-2xl">
              <h2 className="pl-8 font-semibold text-gray-900 text-2xl">
                <p className="mb-2 text-gray-300 font-normal text-lg">
                  {t("calendar.s-f")}
                </p>
                <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                  {format(selectedDay, "E do, MMMM yyy")}
                </time>
              </h2>
              <div className="h-[75%] mt-4 px-4 space-y-1 text-sm leading-6 text-gray-500 overflow-y-scroll">
                {selectedDayMeetings.length > 0 ? (
                  selectedDayMeetings.map((task) => (
                    <CalendarTask
                      key={task.id}
                      task={task}
                      deleteTask={deleteTask}
                    />
                  ))
                ) : (
                  <p className="mt-40 text-center text-base font-light text-gray-300">
                    {t("calendar.n-m")}
                  </p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}


let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
