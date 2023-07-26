import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Don't forget to install axios using: npm install axios
import TodoItem from './TodoItem';
import './style.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  useEffect(() => {
    fetchTodoListItems();
  }, []);

  const handleInputChange = (event) => {
    setTaskText(event.target.value);
  };

  const addTask = async () => {
    if (taskText.trim() !== '') {
      const newTask = {
        id: Date.now(),
        task: taskText,
        status: 'Not started',
      };
      try {
        // Replace 'YOUR_API_GATEWAY_ENDPOINT' with your actual API Gateway endpoint URL
        const response = await axios.post('https://rv8vfe1nz6.execute-api.eu-north-1.amazonaws.com/dev/api/todo', newTask);
        setTasks([...tasks, newTask]);
        setTaskText('');
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }
  };

  const fetchTodoListItems = async () => {
    try {
      // Replace 'YOUR_API_GATEWAY_ENDPOINT' with your actual API Gateway endpoint URL
      const response = await axios.get('https://rv8vfe1nz6.execute-api.eu-north-1.amazonaws.com/dev/api/todo');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const updateTask = async (taskId, updatedTask) => {
    try {
      // Replace 'YOUR_API_GATEWAY_ENDPOINT' with your actual API Gateway endpoint URL
      const response = await axios.put(`https://rv8vfe1nz6.execute-api.eu-north-1.amazonaws.com/dev/api/todo/${taskId}`, updatedTask);
      const updatedTasks = tasks.map((task) => (task.id === taskId ? updatedTask : task));
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      // Replace 'YOUR_API_GATEWAY_ENDPOINT' with your actual API Gateway endpoint URL
      const response = await axios.delete(`https://rv8vfe1nz6.execute-api.eu-north-1.amazonaws.com/dev/api/todo/${taskId}`);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <div className="add-task">
        <input
          type="text"
          value={taskText}
          onChange={handleInputChange}
          placeholder="Enter your task..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      {tasks.map((task, index) => (
        <TodoItem
          key={task.id}
          task={task}
          sequence={index + 1}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default App;
