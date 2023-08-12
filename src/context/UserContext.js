import { API } from "../components/API";

import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";

import Cookies from "js-cookie";

const UserContext = createContext();


export function UserProvider({ children }) {

  const [user, setUser] = useState(initUser);

  return (
    <UserContext.Provider value={user}>
        {children}
    </UserContext.Provider>
  );
}

  
export function useUser() {
  return useContext(UserContext);
}



export const getUser = async() => {

    const newUser = Cookies.get('Session');
    return newUser;    
}

const initUser = await getUser();
