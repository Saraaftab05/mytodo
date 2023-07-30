import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import './style.css';

const API_BASE_URL = 'https://n6zk1cbow9.execute-api.eu-north-1.amazonaws.com/dev'; //API URL to store API GATEWAY 

const App = () => { //root component 
  const [tasks, setTasks] = useState([]); //tasks will store the list of to do items fetched from the API.
  const [taskText, setTaskText] = useState(''); // tasksText will store the text entered by the user in input filed

  useEffect(() => { 
    fetchTodoListItems();           // this function is used to fetch all the to do list items 
  }, []);

  const handleInputChange = (event) => {     //updates the Tasktext 
    setTaskText(event.target.value);
  };

  const addTask = async () => {                // adding new task 
    if (taskText.trim() !== '') {
      const newTask = {                       // creating new task object
        id: Date.now(),
        task: taskText,
        status: 'Not started',
      };
      try {
        const response = await axios.post(API_BASE_URL, newTask, {    //sends the post request to API with new task
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

  const fetchTodoListItems = async () => {   //fetch the list of to do items from 
    try {
      const response = await axios.get(API_BASE_URL);  
      setTasks(response.data);  // storing list of tasks in Tasks
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const updateTask = async (taskId, updatedTask) => {  //update the task in list
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

  return (                                  //defines the UI 
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
