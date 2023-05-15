import axios from "axios";
import React, { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [auth, setauth] = useState({
    user: null,
    token: "",
  });

  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setauth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
    //eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={[auth, setauth]}>
      {children}
    </AuthContext.Provider>
  );
}

//custom hook

export const UseAuth = () => useContext(AuthContext);
