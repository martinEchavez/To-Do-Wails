import React from 'react';

export const TaskRow = (props) => (
  <tr>
    <td>
      <input
        className="form-check-input"
        type="checkbox"
        checked={props.task.Status}
        onChange={() => props.toggleTask(props.task)}
      />
    </td>
    <td>{props.task.Name}</td>
    <td>{props.task.Description}</td>
    <td>
      <div className="d-grid gap-2 d-md-flex">
        <button
          className="btn btn-primary btn-sm"
          onClick={(e) => props.setFrom(props.task)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => props.deleteTask(props.task)}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);
