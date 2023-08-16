import { set } from "date-fns";
import { API } from "../components/API";
import Cookies from "js-cookie";

import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";


const ProjectTasks = createContext(null);

const PTDispatchContext = createContext(null);

export function ProjectTasksProvider({ children }) {
  const [projectTasks, dispatchPT] = useReducer(ptReducer, initPTasks);

  return (
    <ProjectTasks.Provider value={projectTasks}>
      <PTDispatchContext.Provider value={dispatchPT}>
        {children}
      </PTDispatchContext.Provider>
    </ProjectTasks.Provider>
  );
}

export function usePTasks() {
  return useContext(ProjectTasks);
}

export function usePTDispatch() {
  return useContext(PTDispatchContext);
}

function ptReducer(projectTasks, action) {
  
  switch (action.type) {
    case "added": {
      createData(action.task, action.proID);

      return [...projectTasks, action.task];
    }

    case "updated" : {
      updateData(
        action.task.id,
        action.task.name,
        action.task.description,
        action.task.date,
        action.task.status,
        action.task.idProwner
      );

      return projectTasks.map((t) => {
        if (t.id === action.task.id) {
          console.log(action.task);
          return action.task;
        } else {
          return t;
        }
      });
    }

    case "deleted": {
      deleteData(action.id);

      return projectTasks.filter((t) => t.id !== action.id);
    }


    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const getData = async () => {

  const cookie = Cookies.get("Session");
  let id;

  if (cookie) {
    const user = JSON.parse(cookie);
    id = user.id;
  } else {
    id=1
  }

  const result = await fetch(`${API}/projects/tasks/${id}`);
  const data = await result.json();
  return data;
};

const createData = async (task, idPro) => {

  const result = await fetch(`${API}/projects/tasks/${idPro}`, {
    method: "POST",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const updateData = async (id, name, description, date, status, proID) => {
  const result = await fetch(`${API}/projects/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      name: name,
      description: description,
      date: date,
      status: status,
      idProwner: proID,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const deleteData = async (id) => {
  const result = await fetch(`${API}/projects/tasks/${id}`, {
    method: "DELETE",
  });
};


const initPTasks = await getData();

