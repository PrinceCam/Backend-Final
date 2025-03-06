import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function TodoList() {
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [edit, setEdit] = useState({ todo: "" });
  const [render, setRender] = useState({});
  const [newToDo, setNewToDo] = useState({ todo: "", created: Date.now() });

  useEffect(() => {
    fetchTodos();
  }, [flag]);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/gettodos");
      setData(res.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  const handleNewToDo = (e) => {
    setNewToDo((prev) => ({
      ...prev,
      todo: e.target.value
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/create", newToDo, { withCredentials: true });
      setFlag(!flag);
    } catch (err) {
      console.error("Error creating todo:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/delete/${id}`, { withCredentials: true });
      setData((prev) => prev.filter((item) => item._id !== res.data._id));
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  const handleEdit = (id) => {
    setRender((prevRender) => ({
      ...prevRender,
      [id]: !prevRender[id]
    }));
  };

  const handleEditSubmit = async (id) => {
    try {
      await axios.put(`http://localhost:3000/edit/${id}`, edit, { withCredentials: true });
      setFlag(!flag);
      setEdit({ todo: "" });
      setRender((prevRender) => ({
        ...prevRender,
        [id]: false
      }));
    } catch (err) {
      console.error("Error editing todo:", err);
    }
  };

  const handleEditChange = (e) => {
    setEdit({ todo: e.target.value });
  };

  return (
    <>
      <input onChange={handleNewToDo} />
      <button onClick={handleSubmit}>Submit</button>

      {data && data.sort((a, b) => b.created - a.created).map((item) => (
        <div key={item._id} style={{ marginBottom: "20px" }}>
          <div style={{ border: '2px solid red' }}>
            {render[item._id] ? (
              <div>
                <input
                  defaultValue={item.todo || ""}
                  onChange={handleEditChange}
                />
                <button onClick={() => handleEditSubmit(item._id)}>Submit</button>
              </div>
            ) : (
              <p>{item.todo}</p>
            )}
            <button onClick={() => handleDelete(item._id)}>delete</button>
            <button onClick={() => handleEdit(item._id)}>edit</button>
          </div>
        </div>
      ))}
    </>
  );
}

export default TodoList;