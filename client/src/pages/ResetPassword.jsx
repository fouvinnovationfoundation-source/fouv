import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { id } = useParams();  // Only `id` is used in your Express route
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async () => {
    setError('');
    setMessage('');

    if (!password || !confirm) {
      return setError('Both fields are required');
    }
    if (password !== confirm) {
      return setError('Passwords do not match');
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/reset-password/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to reset password');
    }
  };

  return (
    <div className="reset-wrapper">
      <style>
        {`
          .reset-wrapper {
            min-height: 100vh;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
          }

          .reset-box {
            background: rgba(255, 255, 255, 0.18);
            border-radius: 16px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.3);
            padding: 2rem;
            width: 100%;
            max-width: 400px;
            text-align: center;
          }

          .reset-box h3 {
            margin-bottom: 1.5rem;
            color: #f36624;
          }

          .reset-box input[type="password"] {
            width: 100%;
            padding: 0.75rem;
            margin-bottom: 1rem;
            border: 1px solid #ccc;
            border-radius: 8px;
          }

          .reset-box button {
            width: 100%;
            padding: 0.75rem;
            background-color: #003366;
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.3s;
          }

          .reset-box button:hover {
            background-color: #f36624;
          }

          .reset-box p {
            margin-top: 1rem;
            font-size: 0.95rem;
          }

          .reset-box .error {
            color: red;
          }

          .reset-box .success {
            color: green;
          }
        `}
      </style>

      <div className="reset-box">
        <h3>Reset Your Password</h3>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <button onClick={handleReset}>Submit</button>

        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
