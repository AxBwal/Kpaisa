import React, { useState, useContext } from 'react';
import { addTask } from '../services/MockAPI';
import TaskContext from '../context/TaskContext';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { dispatch } = useContext(TaskContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = await addTask({ title, description, completed: false });
    dispatch({ type: 'ADD_TASK', payload: task });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
