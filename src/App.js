import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import './style.css';

const API_BASE_URL = 'https://gyepj0af8j.execute-api.eu-north-1.amazonaws.com/dev';

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
        const response = await axios.post(API_BASE_URL, newTask, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setTasks([...tasks, newTask]);
        setTaskText('');
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }
  };

  const fetchTodoListItems = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const updateTask = async (taskId, updatedTask) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${taskId}`, updatedTask, {
        headers: {
          'Content-Type': 'application/json',
        
        },
      });
      const updatedTasks = tasks.map((task) => (task.id === taskId ? updatedTask : task));
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${taskId}`);
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
