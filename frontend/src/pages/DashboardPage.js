import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import axios from 'axios';
import './DashboardPage.css'; // Import the CSS file for custom styling

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/`, { headers });
        setTasks(response.data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/${taskId}`, { headers });
      setTasks(tasks.filter(task => task.id !== taskId)); // Remove the deleted task from the state
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>My Tasks</h1>
        {/* Link to the CreateTaskPage */}
        <Link to="/create-task">
          <button className="create-task-button">Create Task</button>
        </Link>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p className="priority">Priority: {task.priority}</p>
            {/* Link to the EditTaskPage */}
            <Link to={`/edit-task/${task.id}`}>
              <button className="edit-task-button">Edit Task</button>
            </Link>
            {/* Button to delete the task */}
            <button className="delete-task-button" onClick={() => handleDelete(task.id)}>
              Delete Task
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;

