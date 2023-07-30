import React, { useState } from 'react';

const TodoItem = ({ task, sequence, updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);   // item is in edit mode or not
  const [editedTask, setEditedTask] = useState(task); // keep track of the changings made to task 

  const handleInputChange = (event) => {               //called when there is any change in the input field                    
    const { name, value } = event.target;              // used to extract the name and value 
    setEditedTask((prevTask) => ({ ...prevTask, [name]: value }));    
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    updateTask(task.id, editedTask);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    deleteTask(task.id);
  };

  return (
    <div className="todo-item">
      <span>{sequence}</span>
      {isEditing ? (
        <>
          <input type="text" name="task" value={editedTask.task} onChange={handleInputChange} />
          <select name="status" value={editedTask.status} onChange={handleInputChange}>
            <option value="Not started">Not started</option>
            <option value="In progress">In progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </>
      ) : (
        <>
          <input type="text" value={task.task} readOnly />
          <select value={task.status} readOnly>
            <option value="Not started">Not started</option>
            <option value="In progress">In progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </>
      )}
    </div>
  );
};

export default TodoItem;
