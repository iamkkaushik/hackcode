// /* eslint-disable react/prop-types */

// import { createContext, useState, useContext } from "react";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const login = (userDetails) => {
//     setUser(userDetails);
//     setIsLoggedIn(true);
//   };

//   const logout = () => {
//     setUser(null);
//     setIsLoggedIn(false);
//   };

//   return (
//     <UserContext.Provider value={{ user, isLoggedIn, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);

/* eslint-disable react/prop-types */

import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `expires=${date.toUTCString()};`;
  }
  document.cookie = `${name}=${value};${expires}path=/`;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check cookie on mount and set user state
    const storedUser = getCookie("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = (userDetails) => {
    setUser(userDetails);
    setIsLoggedIn(true);
    setCookie("user", JSON.stringify(userDetails), 7); // Cookie expires in 7 days
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    console.log("Logged out");
    deleteCookie("user");
  };

  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
