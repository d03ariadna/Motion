import { set } from "date-fns";
import { API } from "../components/API";
import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";

const TasksContext = createContext(null);

const TasksDispatchContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case "added": {
      createData(action.task);
      return [...tasks, action.task];
    }

    case "updated": {
      updateData(
        action.task.id,
        action.task.name,
        action.task.description,
        action.task.date,
        action.task.status
      );
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }

    case "deleted": {
      deleteData(action.id);
      return tasks.filter((t) => t.id !== action.id);
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const getData = async () => {
  const result = await fetch(`${API}/tasks`);
  const data = await result.json();
  return data;
};

const createData = async (task) => {
  const result = await fetch(`${API}/tasks/`, {
    method: "POST",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(result);
};

const updateData = async (id, name, description, date, status) => {
  const result = await fetch(`${API}/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      name: name,
      description: description,
      date: date,
      status: status,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(result);
};

const deleteData = async (id) => {
  const result = await fetch(`${API}/tasks/${id}`, {
    method: "DELETE",
  });
  console.log(result);
};

const initTasks = await getData();
