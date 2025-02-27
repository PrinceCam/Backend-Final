import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./App.css";
import axios from "axios";

function App() {
  const [login, setLogin] = useState({
    usename: "",
    password: "",
  });
  const [register, setRegister] = useState({
    usename: "",
    password: "",
  });

  const nav = useNavigate();

  const handleLogin = (e) => {
    console.log("login", e.target.value);
    setLogin((prev) => {
      console.log("prev", prev);
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };

  const handleLogSubmit = () => {
    console.log(login);
    axios({
      method: "post",
      url: "http://localhost:3000/login",
      data: login,
      withCredentials: true,
    })
      .then((res) => {
        console.log("res", res.data);
        if (res.data.msg === "good login") {
          nav("/admin");
        } else {
          alert("BAD LOGIN");
        }
      })
      .catch((error) => console.log(error));
  };
  const handleRegisterSubmit = (e) => {
    console.log("reg", register);
    axios({
      method: "post",
      url: "http://localhost:3000/register",
      data: register,
    })
      .then((res) => console.log("res", res.data))
      .catch((error) => console.log(error));
  };
  
  return (
    <>
      {/* add login */}
      <div id="login">
        {console.log("login", login)}
        {console.log("Reg", register)}
        <h1>Login</h1>
        <input
          id="username"
          onChange={(e) => handleLogin(e)}
          type="type"
          placeholder="Username"
        />
        <br />
        <br />
        <input
          id="password"
          onChange={(e) => handleLogin(e)}
          type="text"
          palceholder="Password"
        />
        <br />
        <br />
        <button onClick={() => handleLoginSubmit()}>Login</button>
      </div>
      {/* add register */}
      <div id="register">
        <h1>Register</h1>
        <input
          id="username"
          onChange={(e) => handleRegister(e)}
          type="text"
          placeholder="Username"
        />
        <br />
        <br />
        <input
          id="password"
          onChange={(e) => handleRegister(e)}
          type="text"
          placehoder="Password"
        />
        <br />
        <br />
        <button onClick={() => handleRegisterSubmit()}>Register</button>
        <br />
      </div>
    </>
  );
}

export default App;
