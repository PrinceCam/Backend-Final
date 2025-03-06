import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./App.css";
import axios from "axios";
import TodoList from './TodoList'
import ProtectedRoute from './components/ProtectedRoute';

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
          navigate("/TodoList");
        } else {
          alert("BAD LOGIN");
        }
      })
      .catch((error) => console.log(error));
  };
  const handleRegister = (e) => {
    console.log("reg", register)
    setRegister(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }
  const handleRegisterSubmit = (e) => {
    console.log("reg", register)
    axios({
      method: 'post',
      url: 'http://localhost:3000/register',
      data: register
    })
      .then(res => console.log("res", res.data))
      .catch(error => console.log(error))
  }

  return (
      <Routes>
        <Route path="/" element={
          <>
          {/**add login */}
          <div id="login">
            <h1>Login</h1>
            <input id="username" onChange={(e) => handleLogin(e)} type="text" placeholder="Username" />
            <br />
            <input id="password" onChange={(e) => handleLogin(e)} type="text" placeholder="Password" />
            <button onClick={() => handleLoginSubmit()}>Login</button>
          </div>
          {/**add register */}
          <div id="register">
            <h1>Register</h1>
            <input id="username" onChange={(e) => handleRegister(e)} type="text" placeholder="Username" />
            <input id="password" onChange={(e) => handleRegister(e)} type="text" placeholder="Password" />
            <button onClick={() => handleRegisterSubmit()}>Register</button>
          </div>
        </>
        }/>
        <Route path="/TodoList" element={<ProtectedRoute />} />
        <Route path="t" element={<TodoList />}/>
      </Routes>
  )
}
// add route to ToDo page

export default App