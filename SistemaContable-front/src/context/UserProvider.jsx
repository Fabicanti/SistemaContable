import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const initialUser = JSON.parse(sessionStorage.getItem('login'))?.user || null;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);
  return (
    <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
  );
};


export const useUser = () => useContext(UserContext);