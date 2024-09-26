import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import { TaskProvider } from './context/TaskContext';

function App() {
  const [user, setUser] = useState(null);

 
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/tasks" /> : <Navigate to="/register" />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/tasks" element={user ? <TaskList setUser={setUser} /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
}

export default App;
