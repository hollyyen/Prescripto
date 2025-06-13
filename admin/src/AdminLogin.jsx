import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminLogin = () => {
  const { setAToken } = useContext(AdminContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });
      if (data.success) {
        localStorage.setItem('aToken', data.token);
        setAToken(data.token);
        toast.success('Admin login successful');
        navigate('/admin-dashboard');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-primary text-white py-2 w-full rounded">Login</button>
      </div>
    </form>
  );
};

export default AdminLogin;
