import React, { useState } from 'react';
import './App.css';

// TodoItem 组件
const TodoItem = ({ task, onComplete, onDelete }) => {
  return (
    <div className="todo-item" style={{ backgroundColor: task.completed ? '#A4B0BD' : '#e0e5ec' }}>
      <div className="task-text">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onComplete}
          className="checkbox"
        />
        <span className={task.completed ? 'completed' : ''}>{task.text}</span>
      </div>
      <button className="delete-btn" onClick={onDelete}>X</button>
    </div>
  );
};

const TodoApp = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (task) {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      setTask('');
    }
  };

  const handleCompleteTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="todo-app">
      <div className="input-container">
        <input
          type="text"
          placeholder="添加新的任务"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="input"
        />
        <button onClick={handleAddTask}>添加任务</button>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onComplete={() => handleCompleteTask(task.id)}
            onDelete={() => handleDeleteTask(task.id)}
          />
        ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
     <h1 className="app-title">待办事项</h1>

      <TodoApp />
    </div>
  );
}

export default App;
