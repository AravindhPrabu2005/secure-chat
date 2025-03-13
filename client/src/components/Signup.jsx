import React, { useState } from 'react';
import axios from 'axios';

export default function SignupPage() {
     const [formData, setFormData] = useState({
          name: '',
          email: '',
          password: ''
     });

     const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               const response = await axios.post(`${process.env.REACT_APP_Backend_URI}/register`, {
                    email: formData.email,
                    password: formData.password
               });
               alert(response.data.message);
          } catch (error) {
               console.error('Error registering user:', error);
               alert('Registration failed. Please try again.');
          }
     };

     return (
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
               <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                         <input
                              type="text"
                              name="name"
                              placeholder="Name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                         />
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
                              className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
                         >
                              Sign Up
                         </button>
                    </form>
                    <p className="text-center text-gray-600">
                         Already have an account? <a href="/login" className="text-blue-500">Login</a>
                    </p>
               </div>
          </div>
     );
}
