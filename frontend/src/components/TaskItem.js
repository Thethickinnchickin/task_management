// TaskItem.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TaskItem = ({ task }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/edit-task/${task.id}`); // Navigate to the edit page for this task
  };

  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Completed: {task.completed ? "Yes" : "No"}</p>
      <button onClick={handleEditClick}>Edit Task</button>
    </div>
  );
};

export default TaskItem;
