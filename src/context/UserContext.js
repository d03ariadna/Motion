import { set } from "date-fns";
import { API } from "../components/API";
import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";

const UserContext = createContext(null);

const UserDispatchContext = createContext(null);

export function UserProvider({ children }) {
  const [user, dispatch] = useReducer(userReducer, []);

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

export function useUserDispatch() {
  return useContext(UserDispatchContext);
}

function userReducer(user, action) {
  switch (action.type) {
    case "added": {
      return [action.user];
    }

    case "deleted": {
      return [];
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
