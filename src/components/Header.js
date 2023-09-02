import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  DashboardIcon,
  CalendarIcon,
  TaskIcon,
  ProjectIcon,
  SettingsIcon,
  LogOutIcon,
  LanguageIcon,
} from "./icons/icons";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

export default function Header(props) {
  const [t, i18n] = useTranslation("global");

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: <DashboardIcon /> },
    { name: "Calendar", href: "/calendar", icon: <CalendarIcon /> },
    { name: "Tasks", href: "/tasks", icon: <TaskIcon /> },
    { name: "Projects", href: "/projects", icon: <ProjectIcon /> },
  ];

  const logOut = () => {
    Cookies.remove("Session");
    window.location.reload();
  };

  return (
    <>
      <header className="top-0 left-0 fixed bg-[#ce0d2d] lg:w-[5vw] sm:w-[10vw] h-full px-2 pt-6">
        <div className="flex flex-col justify-between h-full">
          <section className="flex flex-col">
            <img
              src="/img/ujed.png"
              width={"55px"}
              className="mx-auto mb-3"
            ></img>
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => {
                  return !isActive
                    ? "rounded-2xl py-3 mt-3 text-lg w-full hover:bg-[#ffffff2f] hover:text-white font-bold no-underline"
                    : "rounded-2xl py-3 mt-3 text-lg  w-full  font-medium no-underline bg-[#00000039]";
                }}
              >
                {item.icon}
              </NavLink>
            ))}
          </section>
          <section>
            <Menu as="div">
              <Menu.Button className="flex mx-auto mt-4 py-3 w-full rounded-2xl hover:bg-[#ffffff20]">
                <LanguageIcon />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute left-2  mt-2 w-20 origin-bottom-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {props.action == "EN" ? (
                    <button
                      onClick={() => i18n.changeLanguage("en")}
                      className="w-10 px-1 py-3 text-sm hover:bg-gray-100 hover:text-[#ce0d2d] rounded-md"
                    >
                      EN
                    </button>
                  ) : props.action == "ES" ? (
                    <button
                      onClick={() => i18n.changeLanguage("es")}
                      className="w-10 px-1 py-3 text-sm hover:bg-gray-100 hover:text-[#ce0d2d] rounded-md"
                    >
                      ES
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => i18n.changeLanguage("en")}
                        className="w-10 px-1 py-3 text-sm hover:bg-gray-100 hover:text-[#ce0d2d] rounded-md"
                      >
                        EN
                      </button>
                      <button
                        onClick={() => i18n.changeLanguage("es")}
                        className="w-10 px-1 py-3 text-sm hover:bg-gray-100 hover:text-[#ce0d2d] rounded-md"
                      >
                        ES
                      </button>
                    </>
                  )}
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              type="button"
              className="flex rounded-2xl w-full mx-auto mt-3 mb-2 hover:bg-[#ffffff30] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 py-3"
              onClick={logOut}
            >
              <LogOutIcon />
            </button>
          </section>
        </div>
      </header>
    </>
  );
}
