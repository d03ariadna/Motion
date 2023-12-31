import { API } from "../components/API";
import Cookies from "js-cookie";
import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";


const ProjectsContext = createContext(null);

const ProjectsDispatchContext = createContext(null);


export function ProjectsProvider({ children }) {

  
  const [projects, dispatch] = useReducer(projectsReducer, initProjects);

  return (
    <ProjectsContext.Provider value={projects}>
      <ProjectsDispatchContext.Provider value={dispatch}>
        {children}
      </ProjectsDispatchContext.Provider>
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  return useContext(ProjectsContext);
}

export function useProjectsDispatch() {
  return useContext(ProjectsDispatchContext);
}

function projectsReducer(projects, action) {
  switch (action.type) {
    
    case "added": {
      createData(action.id, action.project);
      return [...projects, action.project];
    }

    case "updated": {
      updateData(action.project);
      return projects.map((p) => {
        if (p.id === action.project.id) {
          return action.project;
        } else {
          return p;
        }
      });
    }

    case "deleted": {
      deleteData(action.id);
      return projects.filter((p) => p.id !== action.id);
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
  
  const result = await fetch(`${API}/${id}/projects`);
  const data = await result.json();
  return data;
};

const createData = async (id, project) => {
  const result = await fetch(`${API}/${id}/projects`, {
    method: "POST",
    body: JSON.stringify(project),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(result);
};

const updateData = async (project) => {
  const result = await fetch(`${API}/projects/${project.id}`, {
    method: "PUT",
    body: JSON.stringify(project),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(result);
};

const deleteData = async (id) => {
  const result = await fetch(`/user/2/projects`, {
    method: "DELETE",
  });
  console.log(result);
};

const initProjects = await getData()
