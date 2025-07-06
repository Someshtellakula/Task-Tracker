const TaskFilter = ({ filter, onFilterChange, tasks }) => {
  const getTaskCount = (filterType) => {
    return tasks.filter(task => {
      if (filterType === 'completed') return task.completed;
      if (filterType === 'pending') return !task.completed;
      return true;
    }).length;
  };

  return (
    <div className="task-filter" role="tablist">
      <button
        className={filter === 'all' ? 'active' : ''}
        onClick={() => onFilterChange('all')}
        role="tab"
        aria-selected={filter === 'all'}
      >
        All ({getTaskCount('all')})
      </button>
      <button
        className={filter === 'completed' ? 'active' : ''}
        onClick={() => onFilterChange('completed')}
        role="tab"
        aria-selected={filter === 'completed'}
      >
        Completed ({getTaskCount('completed')})
      </button>
      <button
        className={filter === 'pending' ? 'active' : ''}
        onClick={() => onFilterChange('pending')}
        role="tab"
        aria-selected={filter === 'pending'}
      >
        Pending ({getTaskCount('pending')})
      </button>
    </div>
  );
};

export default TaskFilter;