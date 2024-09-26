import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';
import { mockAPI } from '../api';
import LogoutButton from './LogoutButton';
import "./TaskList.css"

const TaskList = () => {
  const { tasks, dispatch } = useTaskContext();
  const [newTask, setNewTask] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));

    if (newTask.trim()) {
      const task = { id: Date.now(), title: newTask, completed: false };
      dispatch({ type: 'ADD_TASK', task });
      mockAPI.addTask(user.email, task);
      setNewTask('');
    }
  };

  return (
    <div  className="task-list-container">
      <h2>Task List</h2>
     
      <LogoutButton />
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
