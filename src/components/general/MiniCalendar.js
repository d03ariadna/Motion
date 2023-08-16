import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
import { Fragment, useState } from "react";

import { useTasks } from "../../context/TasksContext";
import { useProjects } from "../../context/ProjectsContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MiniCalendar() {
  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();
  const tasks = useTasks();
  const projects = useProjects();

  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  return (
    <div className="">
      <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
        <div className="md:divide-gray-200">
          <div className="">
            <div className="flex items-center justify-between pt-2">
              <h2 className="mb-0 text-2xl mx-auto font-semibold text-[#B1B2FF]">
                {format(firstDayCurrentMonth, "MMMM yyyy")}
              </h2>
            </div>
            <div className="grid grid-cols-7 mt-3 text-[0.6rem] leading-6 text-center text-[#B1B2FF]">
              <div>{t("calendar.s")}</div>
              <div>{t("calendar.m")}</div>
              <div>{t("calendar.t")}</div>
              <div>{t("calendar.w")}</div>
              <div>{t("calendar.t2")}</div>
              <div>{t("calendar.f")}</div>
              <div>{t("calendar.s2")}</div>
            </div>
            <div className="grid grid-cols-7 text-xs mt-2">
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    "py-1.5"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => {
                      navigate(`/calendar/${format(day, "y-MM-dd")}`);
                    }}
                    // onClick={() => setSelectedDay(day)
                    className={classNames(
                      isEqual(day, selectedDay) && "text-white",
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "text-[#B1B2FF] font-bold",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-900 font-light",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-400",
                      isEqual(day, selectedDay) && isToday(day) && "bg-black",
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        "bg-gray-900 font-semibold",
                      !isEqual(day, selectedDay) && "hover:bg-gray-200",
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        "font-semibold",
                      "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                    )}
                  >
                    <time dateTime={format(day, "yyyy-MM-dd")}>
                      {format(day, "d")}
                    </time>
                  </button>

                  <div className="w-3 h-1 mx-auto mt-1 flex flex-row justify-around">
                    {tasks.some((task) =>
                      isSameDay(parseISO(task.date), day)
                    ) && (
                      <div className="w-1 h-1 rounded-full bg-pink-300"></div>
                      )}
                    {projects.some((project) =>
                      isSameDay(parseISO(project.endDate), day)
                    ) && (
                      <div className="w-1 h-1 rounded-full bg-[#b1b2ff]"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
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
