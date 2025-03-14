import React, { useState } from 'react';
import axios from 'axios';
import { genKeys } from '../utils/RSA';
import { Link, useNavigate } from "react-router-dom";

export default function SignupPage() {


     let nav  = useNavigate();
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
               const keys = genKeys();
               console.log(keys);
               console.log(process.env.REACT_APP_Backend_URI);
               
               const response = await axios.post(`${process.env.REACT_APP_Backend_URI}/api/register`, {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    publicKey: keys.publicKey
               });
               localStorage.setItem('keys', JSON.stringify(keys.privateKey));
               alert(response.data.message);
               nav('/login');
          } catch (error) {
               console.error('Error registering user:', error);
               alert('Registration failed. Please try again.');
          }
     };

     return (
          <div className="min-h-screen bg flex font-inter items-center justify-center bg-gray-100">
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
                              className="w-full py-2 text-white bg-primary rounded-lg hover:bg-blue-600 transition duration-300"
                         >
                              Sign Up
                         </button>
                    </form>
                    <p className="text-center text-gray-600">
                         Already have an account? <a href="/login" className="text-primary">Login</a>
                    </p>
               </div>
          </div>
     );
}
