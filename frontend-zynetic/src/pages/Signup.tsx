import React, { useState } from 'react';
import { signup } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signup(formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Signup failed', err);
    }
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: 'linear-gradient(to right, #6a11cb, #2575fc)', // nice purple-blue gradient
      }}
    >
      <div className="card shadow-lg p-4 border-0" style={{ width: '100%', maxWidth: '420px' }}>
        <h3 className="text-center text-primary mb-4">Create an Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold text-secondary">Full Name</label>
            <input
              name="name"
              className="form-control border-primary"
              type="text"
              placeholder="John Doe"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold text-secondary">Email address</label>
            <input
              name="email"
              className="form-control border-primary"
              type="email"
              placeholder="you@example.com"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold text-secondary">Password</label>
            <input
              name="password"
              className="form-control border-primary"
              type="password"
              placeholder="Enter a secure password"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Sign Up
          </button>
        </form>
        <div className="mt-3 text-center">
          <small className="text-muted">
            Already have an account?{' '}
            <a href="/login" className="text-decoration-none text-primary fw-semibold">
              Login
            </a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Signup;
