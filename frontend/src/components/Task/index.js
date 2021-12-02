import React, { useState, useEffect } from 'react';
import { TaskRow } from './TaskRow';

const Task = () => {
  const [editing, setEditing] = useState(false);
  const [taskItems, setTaskItems] = useState([]);
  const [newTask, setNewTask] = useState({
    Name: '',
    Description: '',
  });

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const tasks = await window.backend.Serve.GetTask();
    tasks.forEach((task) => {
      task.Status = task.Status ? true : false;
    });
    setTaskItems(tasks);
  };

  const toggleTask = async (task) => {
    setTaskItems(
      taskItems.map((t) => (t.ID === task.ID ? { ...t, Status: !t.Status } : t))
    );

    taskItems.forEach(async (t) => {
      if (t.ID === task.ID) {
        task.Status = task.Status ? 0 : 1;
        await window.backend.Serve.EditTask(JSON.stringify(task));
      }
    });
  };

  const updateNewTask = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  };

  const createTask = async (e) => {
    e.preventDefault();
    await window.backend.Serve.CreateTask(JSON.stringify(newTask));
    setNewTask({
      Name: '',
      Description: '',
    });
    getTasks();
  };

  const editTask = async (e) => {
    e.preventDefault();
    newTask.Status = newTask.Status ? 1 : 0;
    await window.backend.Serve.EditTask(JSON.stringify(newTask));
    setNewTask({
      Name: '',
      Description: '',
    });
    getTasks();
  };

  const setFrom = (task) => {
    setEditing(true);
    setNewTask(task);
  };

  const deleteTask = async (task) => {
    await window.backend.Serve.DeleteTask(task.ID);
    getTasks();
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card card-body">
          <h4>Create Task</h4>
          <form>
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="Name"
                value={newTask.Name}
                onChange={updateNewTask}
                required
              />
            </div>
            <div className="mb-2">
              <textarea
                type="text"
                className="form-control"
                placeholder="Description"
                name="Description"
                value={newTask.Description}
                onChange={updateNewTask}
              />
            </div>
            <div className="d-grid gap-2">
              <button
                className="btn btn-success btn-block"
                onClick={editing ? (e) => editTask(e) : (e) => createTask(e)}
              >
                {editing ? 'Edit' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="col-md-8">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>
            {taskItems.map((task) => (
              <TaskRow
                task={task}
                key={task.ID}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
                setFrom={setFrom}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Task;
