import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { mockAPI } from '../api';


const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return action.tasks;
    case 'ADD_TASK':
      return [...state, action.task];
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.taskId);
    case 'TOGGLE_TASK':
      return state.map(task =>
        task.id === action.taskId ? { ...task, completed: !task.completed } : task
      );
    default:
      return state;
  }
};


const TaskContext = createContext();


export const useTaskContext = () => useContext(TaskContext);


export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  useEffect(() => {
    const userString = localStorage.getItem('user'); 
    if (userString) {
      try {
        const user = JSON.parse(userString); 
        const savedTasks = mockAPI.getTasks(user.email); 
        dispatch({ type: 'SET_TASKS', tasks: savedTasks }); 
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error); 
      }
    }
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};