import { useState } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";

import "./App.css";
import axios from "axios";
import TodoList from './TodoList';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [register, setRegister] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = (e) => {
    setLogin((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:3000/auth/login",
      data: login,
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.msg === "good login") {
          navigate("/TodoList");
        } else {
          alert("BAD LOGIN");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleRegister = (e) => {
    setRegister((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost:3000/auth/register',
      data: register,
    })
      .then(res => console.log("res", res.data))
      .catch(error => console.log(error));
  };

  return (
    <Routes>
      <Route path="/" element={
        <>
          <div id="login">
            <h1>Login</h1>
            <input id="username" onChange={handleLogin} type="text" placeholder="Username" />
            <br />
            <input id="password" onChange={handleLogin} type="password" placeholder="Password" />
            <button onClick={handleLoginSubmit}>Login</button>
          </div>
          <div id="register">
            <h1>New User</h1>
            <input id="username" onChange={handleRegister} type="text" placeholder="Username" />
            <input id="password" onChange={handleRegister} type="password" placeholder="Password" />
            <button onClick={handleRegisterSubmit}>Enter</button>
          </div>
        </>
      }/>
      <Route path="/TodoList" element={<ProtectedRoute />} />
      <Route path="/t" element={<TodoList />} />
    </Routes>
  );
}

export default App;