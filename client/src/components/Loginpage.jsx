import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {

  const nav =useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    publickey:''
  });

  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_Backend_URI}/api/login`, {
        email: formData.email,
        password: formData.password
      });
       console.log(response.data); 
       let res = response.data;
       if(res.token){
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      nav('/dashboard/chat');
        }
        else{
          alert('Login failed. Please try again.');
        }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please try again.');
    }
  };
  

  return (
    <div className="min-h-screen bg font-inter flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full py-2 text-white bg-primary rounded-lg hover:bg-primary/90 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600">
          Don't have an account? <a href="/signup" className="text-primary">Sign up</a>
        </p>
      </div>
    </div>
  );
}
