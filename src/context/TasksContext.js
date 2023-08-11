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
  //   const getData = async () => {
  //     const result = await fetch(`${API}/tasks`);
  //     const data = await result.json();
  //     setInitTasks(data);
  //   };

  //   useEffect(() => {
  //     console.log(initTasks);
  //   }, [initTasks]);

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
      return [...tasks, action.task];
    }

    case "updated": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }

    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialTasks = [
  {
    id: 1,
    name: "Buy a gift for Christina's Birthday",
    description:
      "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
    date: "2023-08-14",
    status: "To Do",
  },
  {
    id: 2,
    name: "Take a rest",
    description:
      "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
    date: "2023-09-10",
    status: "To Do",
  },
  {
    id: 3,
    name: "Finish Zencon Project",
    description:
      "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
    date: "2023-11-14",
    status: "To Do",
  },
  {
    id: 4,
    name: "Richard's Birthday Party",
    description:
      "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
    date: "2023-06-15",
    status: "To Do",
  },
  {
    id: 5,
    name: "Buy the supplements for gym",
    description:
      "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
    date: "2023-08-08",
    status: "To Do",
  },
  {
    id: 6,
    name: "Task Done 1st",
    description:
      "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
    date: "2023-08-08",
    status: "Done",
  },
  {
    id: 7,
    name: "Task Done 2nd",
    description:
      "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
    date: "2023-08-08",
    status: "Done",
  },
  {
    id: 8,
    name: "Task Done 3rd",
    description:
      "elit. Optio iusto accusantium dolores id incidunt? Dolorem mollitia nihil esse molestias ipsum! Fuga optio enim, eveniet sint natus omnis debitis ad nesciunt.",
    date: "2023-08-08",
    status: "Done",
  },
];

const getData = async () => {
  const result = await fetch(`${API}/tasks`);
  const data = await result.json();
  return data;
};

const initTasks = await getData();
