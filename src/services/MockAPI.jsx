let users = [];
let tasks = [];

export const register = (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userExists = users.find(user => user.email === userData.email);
      if (userExists) {
        reject('User already exists');
      } else {
        users.push(userData);
        resolve(userData);
      }
    }, 500);
  });
};

export const login = (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(user => user.email === userData.email && user.password === userData.password);
      if (user) {
        resolve(user);
      } else {
        reject('Invalid credentials');
      }
    }, 500);
  });
};

export const getTasks = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tasks);
    }, 500);
  });
};

export const addTask = (task) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      task.id = tasks.length + 1;
      tasks.push(task);
      resolve(task);
    }, 500);
  });
};

export const deleteTask = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      tasks = tasks.filter(task => task.id !== id);
      resolve();
    }, 500);
  });
};

export const toggleTask = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      resolve();
    }, 500);
  });
};
