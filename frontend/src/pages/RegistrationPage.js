import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.css'; // Assuming this is where custom styling is

const RegistrationPage = () => {
  const navigate = useNavigate(); // Hook to handle navigation

  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '', // New field for confirming the password
  };

  // Updated validation schema to check if the passwords match
  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match') // Validate passwords match
      .required('Confirm password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, values);
      alert('Registration successful');
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-box">
        <h2 className="registration-title">Register</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="registration-form">
              <div className="form-group">
                <label className="form-label">Username</label>
                <Field className="form-input" type="text" name="username" />
                <ErrorMessage name="username" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <Field className="form-input" type="password" name="password" />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <Field className="form-input" type="password" name="confirmPassword" />
                <ErrorMessage name="confirmPassword" component="div" className="error-message" />
              </div>

              <button type="submit" disabled={isSubmitting} className="submit-button">
                Register
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegistrationPage;
