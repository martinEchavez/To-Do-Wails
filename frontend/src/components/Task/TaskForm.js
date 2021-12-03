import React from 'react';

export const TaskForm = (props) => {
  return (
    <div className="card card-body">
      <h4>Create Task</h4>
      <form>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            name="Name"
            value={props.newTask.Name}
            onChange={props.updateNewTask}
            required
          />
        </div>
        <div className="mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Description"
            name="Description"
            value={props.newTask.Description}
            onChange={props.updateNewTask}
          />
        </div>
        <div className="d-grid gap-2">
          <button
            className="btn btn-success btn-block"
            onClick={
              props.editing
                ? (e) => props.editTask(e)
                : (e) => props.createTask(e)
            }
          >
            {props.editing ? 'Edit' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};
