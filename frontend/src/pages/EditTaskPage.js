import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditTaskPage.css'; // Import custom CSS file

const EditTaskPage = () => {
  const { task_id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    priority: 'medium',
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/${task_id}`, { headers });

        const task = response.data;
        setInitialValues({
          title: task.title,
          description: task.description,
          priority: task.priority,
        });
      } catch (error) {
        console.error('Failed to fetch task:', error);
      }
    };

    fetchTask();
  }, [task_id]);

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    priority: Yup.string().oneOf(['high', 'medium', 'low'], 'Invalid priority'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/${task_id}`, values, { headers });
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="edit-task-container">
      <h2>Edit Task</h2>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="edit-task-form">
            <div className="form-group">
              <label className="form-label">Title</label>
              <Field className="form-input" type="text" name="title" />
              <ErrorMessage name="title" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <Field className="form-input" type="text" name="description" />
              <ErrorMessage name="description" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label className="form-label">Priority</label>
              <Field className="form-select" as="select" name="priority">
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Field>
              <ErrorMessage name="priority" component="div" className="error-message" />
            </div>

            <button type="submit" disabled={isSubmitting} className="submit-button">
              Update Task
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditTaskPage;
