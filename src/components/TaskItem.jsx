import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { mockAPI } from '../api';
import './TaskItem.css'; 

const TaskItem = ({ task }) => {
  const { dispatch } = useTaskContext();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleToggleTask = () => {
    dispatch({ type: 'TOGGLE_TASK', taskId: task.id });
    mockAPI.toggleTask(user.email, task.id);
  };

  const handleDeleteTask = () => {
    dispatch({ type: 'DELETE_TASK', taskId: task.id });
    mockAPI.deleteTask(user.email, task.id);
  };

  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggleTask}
      />
      <span className={`task-item-title ${task.completed ? 'completed' : ''}`}>
        {task.title}
      </span>
      <button onClick={handleDeleteTask}>Delete</button>
    </li>
  );
};

export default TaskItem;
