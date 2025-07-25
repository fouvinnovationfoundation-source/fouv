import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUser } from '../utils/storage';

const AddUser = () => {
  const currentUser = getUser();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  // Check if current user is manager
  useEffect(() => {
    if (currentUser?.role === 'manager') {
      fetchUsers();
    } else {
      setMessage('Access Denied: Only managers can add or view users.');
    }
  }, [currentUser]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user`);
      setUsers(res.data);
    } catch (err) {
      setError('Failed to fetch users');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/create`, form);
      setMessage('✅ User added successfully!');
      setForm({ name: '', email: '', password: '', role: 'user' });
      fetchUsers();
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong.';
      setError(msg);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/user/${userId}`);
      setMessage('❌ User access removed.');
      fetchUsers();
    } catch (err) {
      setError('Failed to remove user');
    }
  };

  if (!currentUser || currentUser.role !== 'manager') {
    return <p className="text-danger fw-bold">{message}</p>;
  }

  return (
    <div className="card shadow-sm p-4 bg-white">
      <h4 className="mb-3" style={{ color: '#f36624', fontWeight: '600' }}>Add New User</h4>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="form-control"
            required
            minLength={6}
            autoComplete="current-password"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="form-select"
          >
            <option value="user">User</option>
            <option value="manager">Manager</option>
          </select>
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-outline-primary"
            style={{ borderColor: '#f36624', color: '#f36624' }}
          >
            Add User
          </button>
        </div>
      </form>

      {/* Show all users */}
      <h5 className="mt-4 mb-3" style={{ color: '#03518f' }}>Existing Users</h5>
      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th style={{ width: '150px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(user._id)}
                    >
                      Remove Access
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddUser;
