import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function TodoList() {
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [edit, setEdit] = useState({
    todo: ""
  });
  const [render, setRender] = useState({});

  const [newToDo, setNewToDo] = useState({
    todo: "",
    created: Date.now()
  });

  useEffect(() => {
    console.log("useEFFECT TRIGGERED");
  }, [data]);

  useEffect(() => {
    console.warn("USEEFFECT HIT AGAIN");
    axios({
      method: "get",
      url: "http://localhost:3000/gettodos"
    })
      .then(res => {
        console.log("res", res);
        setData(res.data);
      })
      .catch(err => console.log("err", err));
  }, [flag]);

  const handleNewToDo = (e) => {
    console.log("handleNewToDo Hit", e);
    console.log("handleNewToDo Hit", e.target);
    console.log("handleNewToDo Hit", e.target.value);
    setNewToDo((prev) => ({
      ...prev,
      todo: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    console.log("HandleSubmit HIT", newToDo);
    console.log("i am getting stuff");
    axios({
      method: "post",
      url: "http://localhost:3000/create",
      data: newToDo,
      withCredentials: true
    })
      .then(res => {
        console.log("res", res);
        setFlag(!flag);
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (e) => {
    console.log("DEL Hit e.target.e", e.target.id);

    axios({
      method: "delete",
      url: `http://localhost:3000/delete/${e.target.id}`,
      withCredentials: true
    })
      .then(res => {
        console.log("res", res);
        console.log("RES", res.data._id);
        setData((prev) => prev.filter((item) => item._id !== res.data._id));
      })
      .catch(err => console.log(err));
  };

  const handleEdit = (id) => {
    setRender((prevRender) => ({
      ...prevRender,
      [id]: !prevRender[id]
    }));
  };

  const handleEditSubmit = (e) => {
    console.log("HandleEdit HIT", e.target.id);
    axios({
      method: "put",
      url: `http://localhost:3000/edit/${e.target.id}`,
      data: edit,
      withCredentials: true
    })
      .then(res => {
        console.log("$$$$$$$$", res);
        setFlag(!flag);
        setEdit({ todo: ""})
        setRender((prevRender) => ({
          ...prevRender,
          [e.target.id]: false
        }))
      })
      .catch(err => console.log(err));
  };

  const handleEditChange = (e) => {
    console.log("handleEditChange HIT", e.target.value);
    setEdit({ todo: e.target.value });
  };

  return (
    <>
      {console.warn("render", render)}

      <input onChange={(e) => handleNewToDo(e)} />
      <button onClick={(e) => handleSubmit(e)}>Submit</button>

      {data && data.sort((a, b) => b.created - a.created).map((item) => {
        return (
          <div key={item._id} style={{ marginBottom: "20px" }}>
            <div style={{ border: '2px solid red' }}>
              {render[item._id]
                ? (
                  <div>
                    <input
                      defaultValue={item.todo || ""}
                      onChange={(e) => handleEditChange(e)}
                    />
                    <button
                      id={item._id}
                      onClick={(e) => handleEditSubmit(e)}
                    >
                      Submit
                    </button>
                  </div>
                )
                : (
                  <p>{item.todo}</p>
                )
              }
              <button id={item._id} onClick={(e) => handleDelete(e)}>delete</button>
              <button id={item._id} onClick={() => handleEdit(item._id)}>edit</button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default TodoList;