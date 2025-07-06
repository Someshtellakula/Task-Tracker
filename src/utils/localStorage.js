// Enhanced localStorage utility with error handling and flexibility
export const loadTasks = (key = 'tasks') => {
  try {
    const tasks = localStorage.getItem(key);
    return tasks ? JSON.parse(tasks) : [];
  } catch (e) {
    console.error('Failed to load tasks:', e);
    return [];
  }
};

export const saveTasks = (tasks, key = 'tasks') => {
  try {
    localStorage.setItem(key, JSON.stringify(tasks));
  } catch (e) {
    console.error('Failed to save tasks:', e);
  }
};