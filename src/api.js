
export const mockAPI = {
    users: [],
    tasks: {},
  
    register: function (email, password) {
      if (this.users.some((user) => user.email === email)) {
        return { error: "User already exists" };
      } else {
        this.users.push({ email, password });
        this.tasks[email] = [];
        return { success: true };
      }
    },
  
    login: function (email, password) {
      const user = this.users.find((user) => user.email === email && user.password === password);
      if (user) {
        return { success: true };
      } else {
        return { error: "Invalid credentials" };
      }
    },
  
    getTasks: function (email) {
      return this.tasks[email] || [];
    },
  
    addTask: function (email, task) {
      this.tasks[email].push(task);
      return { success: true };
    },
  
    deleteTask: function (email, taskId) {
      this.tasks[email] = this.tasks[email].filter((task) => task.id !== taskId);
      return { success: true };
    },
  
    toggleTask: function (email, taskId) {
      this.tasks[email] = this.tasks[email].map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      return { success: true };
    },
  };
  