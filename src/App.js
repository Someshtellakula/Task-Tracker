import { useState, useEffect } from 'react';
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import { loadTasks, saveTasks } from './utils/localStorage';
import './styles/modern.css';


function App() {
  const [username, setUsername] = useState(() => localStorage.getItem('username'));
  // Use a user-specific key for tasks
  const getUserKey = (user) => user ? `tasks_${user}` : 'tasks';
  const [tasks, setTasks] = useState(() => loadTasks(getUserKey(localStorage.getItem('username'))));
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (username) {
      saveTasks(tasks, getUserKey(username));
    }
  }, [tasks, username]);

  const handleLogin = (username) => {
    setUsername(username);
    // Load tasks for this user
    setTasks(loadTasks(getUserKey(username)));
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername(null);
    setTasks([]);
  };

  const handleAddTask = (newTask) => {
    setTasks(prev => [...prev, newTask]);
  };

  const handleToggleTask = (taskId) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(task => task.id !== taskId));
    }
  };

  const handleEditTask = (taskId, updates) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  if (!username) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <header>
        <h1>Task Tracker</h1>
        <div className="user-info">
          <span>Welcome, {username}!</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <main>
        <div style={{ flex: 1 }}>
          <TaskForm onAddTask={handleAddTask} />
          <TaskFilter
            filter={filter}
            onFilterChange={setFilter}
            tasks={tasks}
          />
          <TaskList
            tasks={tasks}
            filter={filter}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
