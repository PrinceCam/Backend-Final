import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import LoggedIn from "../LoggedIn"

const ProtectedRoute = () => {
  let nav = useNavigate();

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:3000/authCheck`,
    })
      .then((res) => {
        console.warn("PROT ROUTE auth res", res);
        if (res.data.msg !== "valid token") {
          nav("/");
        }
      })
      .catch((err) => {
        console.log("useAuth err", err);
      });
  }, [nav]);

  return (
    <>
    {console.log("Protected Route hit ")}
      <LoggedIn />
    </>
  );
};

export default ProtectedRoute;