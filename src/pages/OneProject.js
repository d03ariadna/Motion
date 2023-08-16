import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { API } from "../components/API";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { format, parseISO } from 'date-fns';

import { usePTasks } from "../context/ProjectTasksContext";
import { useProjects } from "../context/ProjectsContext";

import CreateButton from "../components/general/CreateButton";
import ProjectTask from "../components/projectsC/ProjectTask";
import NoteModal from "../components/projectsC/NoteModal";
import ProjectModal from "../components/general/ProjectModal";
import AddMemberModal from "../components/projectsC/AddMemberModal";
import ProjectStc from "../components/statistics/ProjectStc";
import { BigIMG, MainIMG } from "../components/projectsC/MemberImg";




export default function OneProject() {
  const [t, i18n] = useTranslation("global");

  const projectId = parseInt(useParams().id);

  const user = JSON.parse(Cookies.get("Session"));

  let userType;


  const projects = useProjects();
  const project = projects.find((project) => project.id == projectId);

  const allTasks = usePTasks();
  let pTasks = allTasks.filter((task) => task.idProwner === projectId);

  const [toDo, setToDo] = useState([]);
  const [doing, setDoing] = useState([]);
  const [done, setDone] = useState([]);

  const [totalNo, setTotalNo] = useState(pTasks.length);
  const [toDoNo, setToDoNo] = useState(toDo.length);
  const [doingNo, setDoingNo] = useState(doing.length);
  const [doneNo, setDoneNo] = useState(done.length);
  const [notes, setNotes] = useState([]);


  const [members, setMembers] = useState([]);

  const [trigger, setTrigger] = useState(false);

  const [showProject, setShowProject] = useState(false);

  const handleCloseProject = () => setShowProject(false);
  const handleShowProject = () => setShowProject(true);

  function getData() {
    fetch(`${API}/${projectId}/notes`).then((response) => {
      response.json().then((data) => {

        setNotes(data);

      });
    });
  };

  function createNote(id, text) {
    fetch(`${API}/${projectId}/notes`, {
      method: "POST",
      body: JSON.stringify({
        id: id,
        content: text,
        idProject: projectId,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      console.log(response);
    });
    const newNote = {
      id: id,
      content: text,
      idProject: projectId,
    };

    setNotes([newNote, ...notes]);
  }

  function updateNote(id, content) {
    fetch(`${API}/notes/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        content: content,
        idProject: projectId,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      console.log(response);
    });
    const newNotes = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          content: content,
        };
      }
      return note;
    });

    setNotes(newNotes);
  }

  function deleteNote(id) {
    fetch(`${API}/notes/${id}`, {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      console.log(response);
    });
    const newNotes = notes.filter((note) => {
      return note.id != id;
    });

    setNotes(newNotes);

  }



  function getMembers(){
    fetch(`${API}/projects/${projectId}/members`)
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
          setMembers(data);

          data.map((member) => {
            if (member.id === user.id) {
              userType = member.type;
              console.log(userType);
            }
          })

        });
      });    
    
    
    }

  function updateMembers(email) {
    setMembers([email, ...members]);
  }

  useEffect(() => {
    let tempTasks = [];

    //Get TO DO tasks
    tempTasks = pTasks.filter((task) => {
      return task.status === "TO DO";
    });
    setToDo(tempTasks);
    setToDoNo(tempTasks.length);

    //Get DOING tasks
    tempTasks = pTasks.filter((task) => {
      return task.status === "DOING";
    });
    setDoing(tempTasks);
    setDoingNo(tempTasks.length);

    //Get DONE tasks
    tempTasks = pTasks.filter((task) => {
      return task.status === "DONE";
    });
    setDone(tempTasks);
    setDoneNo(tempTasks.length);

    setTotalNo(pTasks.length);
  }, [allTasks]);

  useEffect(() => {
    getData();
    getMembers();
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between">
        {/* Main Section */}
        <section className="w-[65vw] h-full mr-10 pt-2">
          {/* Header Section */}
          <header className="w-full  flex flex-row justify-between items-center">
            <div className="flex flex-row items-center py-1">
              <h1 className="font-semibold">{project.name}</h1>
              <button onClick={handleShowProject} className="py-1 ml-5 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  className="w-10 h-10 cursor-pointer stroke-black hover:stroke-[#B1B2FF]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-row w-[35%] mr-10 justify-between items-end">
              <div>
                <h5 className="mb-1 text-sm font-normal text-gray-400">
                  {t("project.created")}
                </h5>
                <p className="mb-0 text-sm">
                  {format(parseISO(project.startDate), "MMMM, do")}
                </p>
                {/* <p className="mb-0 text-sm">temporal</p> */}
              </div>
              <div>
                <h5 className="mb-1 text-sm font-normal text-gray-400">
                  {t("project.due-date")}
                </h5>
                <p className="mb-0 text-sm">
                  {format(parseISO(project.endDate), "MMMM, do")}
                </p>
                {/* <p className="mb-0 text-sm">temporal</p> */}
              </div>
            </div>
          </header>
          <div className="w-full h-1 mt-3 rounded-xl bg-purple-500 "></div>

          {/* Create & Members Section */}
          <section className="mt-[2.5rem] flex flex-row justify-between items-center">
            <CreateButton action="task" personal={false} />

            <div className="w-[20%] flex flex-row justify-between items-center">
              <div className="flex flex-row">
                {members.map((member) => {
                  return (
                      <div key={uuidv4()} className='w-11 h-11 ml-1'>
                        <BigIMG member={member} />
                      </div>
                    )
                })}
              </div>
              <div className="h-10 w-[3px] bg-gray-300 rounded-lg"></div>
              <AddMemberModal members={members} addMember={updateMembers} />
            </div>
          </section>

          {/* Tasks Section */}
          <section className="h-[63vh] mt-5 flex flex-row justify-between">
            <section className="w-[30%] h-full pl-2">
              <h3 className="text-2xl font-semibold">{t("dashboard.do")}</h3>
              <div className="w-full h-[55vh] mt-3 flex flex-col flex-nowrap overflow-y-scroll">
                {toDo.length > 0 ? (
                  toDo.map((task) => {
                    return <ProjectTask key={task.id} task={task} />;
                  })
                ) : (
                  <p className="pl-1 pt-2 text-sm text-gray-400 font-light">
                    {t("project.no-tasks")}
                  </p>
                )}
              </div>
            </section>
            <section className="w-[30%] h-full pl-2">
              <h3 className="text-2xl font-semibold">{t("dashboard.doing")}</h3>
              <div className="w-full h-[55vh] mt-3 flex flex-col flex-nowrap overflow-y-scroll">
                {doing.length > 0 ? (
                  doing.map((task) => {
                    return (
                      <ProjectTask
                        key={task.id}
                        task={task}
                        proID={project.id}
                      />
                    );
                  })
                ) : (
                  <p className="pl-1 pt-2 text-sm text-gray-400 font-light">
                    {t("project.no-tasks")}
                  </p>
                )}
              </div>
            </section>
            <section className="w-[30%] h-full pl-2">
              <h3 className="text-2xl font-semibold">{t("dashboard.done")}</h3>
              <div className="w-full h-[55vh] mt-3 flex flex-col flex-nowrap overflow-y-scroll">
                {done.length > 0 ? (
                  done.map((task) => {
                    return (
                      <ProjectTask
                        key={task.id}
                        task={task}
                        proID={project.id}
                      />
                    );
                  })
                ) : (
                  <p className="pl-1 pt-2 text-sm text-gray-400 font-light">
                    {t("project.no-tasks")}
                  </p>
                )}
              </div>
            </section>
          </section>
        </section>

        {/* Project Card Section */}
        <section className="w-[22vw] h-[95vh] px-2">
          <div className="w-full h-full py-3 px-4 bg-white rounded-3xl drop-shadow-lg">
            <section className="w-full h-[8%] mt-2 flex flex-row justify-between items-center">
              <h3 className="text-2xl font-medium mb-0">
                {t("project.name") + user.name}
              </h3>
                <div className='w-11 h-11'>
                  <MainIMG member={user}/>
               </div>
              
              {/* <img
                src="/img/avatar.png"
                alt=""
                className="w-12 h-12 rounded-full border-[1px] border-slate-300"
              /> */}
            </section>

            {/* Statistics */}
            <section className="w-full mt-3 mb-2 pt-3 border-t-2 border-gray-200">
              <ProjectStc id={projectId} />
            </section>

            {/* Statistics */}
            <section className="w-full h-[20%] border-b-2 border-gray-200">
              <h4 className="ml-2 text-lg">{t("dashboard.task")}</h4>

              <div className="w-full flex flex-row justify-between px-2 mt-2">
                <div className="w-[50%] pl-1 flex flex-row items-center mr-5">
                  <p className="mb-0 text-base font-medium">{totalNo}</p>
                  <div className="w-1 h-5 bg-lime-400 mx-2 rounded-2xl"></div>
                  <p className="mb-0 text-xs text-gray-400">
                    {t("project.total")}
                  </p>
                </div>
                <div className="w-[50%] pl-1 flex flex-row items-center">
                  <p className="mb-0 text-base font-medium">{toDoNo}</p>
                  <div className="w-1 h-5 bg-lime-400 mx-2 rounded-2xl"></div>
                  <p className="mb-0 text-xs text-gray-400">
                    {t("project.waiting")}
                  </p>
                </div>
              </div>

              <div className="w-full flex flex-row justify-between mt-3 px-2">
                <div className="w-[50%] pl-1 flex flex-row items-center mr-5">
                  <p className="mb-0 text-base font-medium">{doingNo}</p>
                  <div className="w-1 h-5 bg-lime-400 mx-2 rounded-2xl"></div>
                  <p className="mb-0 text-xs text-gray-400">
                    {t("project.progress")}
                  </p>
                </div>
                <div className="w-[50%] pl-1 flex flex-row items-center">
                  <p className="mb-0 text-base font-medium">{doneNo}</p>
                  <div className="w-1 h-5 bg-lime-400 mx-2 rounded-2xl"></div>
                  <p className="mb-0 text-xs text-gray-400">
                    {t("project.completed")}
                  </p>
                </div>
              </div>
            </section>

            {/* Project Notes */}
            <section className="w-full h-[35%] mt-4">
              <div className="flex flex-row justify-between items-center">
                <h4 className="text-lg">{t("project.notes")}</h4>
                <NoteModal note={[]} edit={false} update={createNote} />
              </div>

              <div className="w-full h-[75%] mt-3 px-2 drop-shadow-md overflow-y-scroll">
                {notes.map((note) => {
                  return (
                    <div
                      key={note.id}
                      className="px-3 pt-3 bg-gray-200 mb-3 rounded-2xl"
                    >
                      <p className="text-[.65rem] mb-0">{note.content}</p>
                      <section className="w-16 flex flex-row mt-1 ml-[70%] pb-2 ">
                        <NoteModal
                          note={note}
                          edit={true}
                          update={updateNote}
                        />

                        <button onClick={() => deleteNote(note.id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.1}
                            className="w-5 h-5 ml-3 stroke-gray-400 hover:stroke-red-600 cursor-pointer"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </section>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </section>
      </div>

      <ProjectModal
        id={project.id}
        project={project}
        edit={true}
        show={showProject}
        close={handleCloseProject}
        open={handleShowProject}
      />
    </>
  );
}
