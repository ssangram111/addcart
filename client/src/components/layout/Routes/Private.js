import axios from "axios";
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { UseAuth } from "../../../context/AuthProvider";
import Loader from "../../Loader";

export default function Private() {
  const [ok, setok] = useState(false);
  const [auth, setauth] = UseAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("/api/user-auth");

      console.log(res.data);
      if (res.data.ok === true) {
        setok(true);
      } else {
        setok(false);
      }
    };
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Loader />;
}
