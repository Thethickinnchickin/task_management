import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateTaskPage.css';  // Import the custom CSS file

const CreateTaskPage = () => {
  const navigate = useNavigate();

  const initialValues = {
    title: '',
    description: '',
    priority: 'medium', // Default priority
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    priority: Yup.string().oneOf(['high', 'medium', 'low'], 'Invalid priority'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/`, values, { headers });
      navigate('/dashboard'); // Redirect to the dashboard after successful task creation
    } catch (error) {
      console.error('Failed to create task:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="create-task-container">
      <h2>Create a New Task</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label>Title</label>
              <Field type="text" name="title" />
              <ErrorMessage name="title" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label>Description</label>
              <Field type="text" name="description" />
              <ErrorMessage name="description" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label>Priority</label>
              <Field as="select" name="priority">
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Field>
              <ErrorMessage name="priority" component="div" className="error-message" />
            </div>

            <button type="submit" disabled={isSubmitting} className="submit-button">
              Create Task
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateTaskPage;
