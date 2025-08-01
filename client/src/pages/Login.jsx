import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUser } from '../utils/storage';
import Fouvlogo from '../assets/Fouvlogo.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetStatus, setResetStatus] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.message);

      saveUser(data.user, rememberMe ? 'local' : 'session');
      navigate('/admin-dashboard');
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  const handlePasswordReset = async () => {
    setResetStatus('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail }),
      });

      const data = await res.json();
      if (!res.ok) return setResetStatus(data.message || 'Failed to send reset link');
      setResetStatus('Reset link sent to your email.');
    } catch (error) {
      setResetStatus('Something went wrong. Try again.');
    }
  };

  return (
    <div className="login-wrapper">
      <style>
        {`
          .login-wrapper {
            min-height: 100vh;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
          }

          .login-box {
            background: rgba(255, 255, 255, 0.18);
            border-radius: 16px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.3);
            padding: 2.5rem;
            width: 100%;
            max-width: 400px;
            text-align: center;
            animation: fadeIn 0.7s ease;
          }

          .login-logo {
            width: 90px;
            height: 90px;
            border-radius: 50%;
            background-color: grey;
            margin: 0 auto 1rem;
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .login-logo img {
            width: 100%;
            height: auto;
            border-radius: 50%;
          }

          .login-box h2 {
            margin-bottom: 1.5rem;
            color: #f36624;
          }

          .login-box input[type="email"],
          .login-box input[type="password"],
          .login-box input[type="text"] {
            width: 100%;
            padding: 0.75rem;
            margin-bottom: 1rem;
            border: 1px solid #ccc;
            border-radius: 8px;
            transition: border-color 0.3s;
          }

          .password-field {
            position: relative;
          }

          .password-field input {
            padding-right: 2.5rem;
          }

          .password-toggle-icon {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 1.1rem;
            color: #555;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .login-box input:focus {
            border-color: #f36624;
            outline: none;
            box-shadow: 0 0 0 2px rgba(243, 102, 36, 0.2);
          }

          .login-options {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.9rem;
            margin-bottom: 1.2rem;
          }

          .login-options label {
            display: flex;
            align-items: center;
            gap: 5px;
            color: #333;
            cursor: pointer;
          }

          .forgot-password {
            color: #003366;
            cursor: pointer;
            transition: color 0.3s;
          }

          .forgot-password:hover {
            color: #f36624;
            text-decoration: underline;
          }

          .login-box button {
            width: 100%;
            padding: 0.75rem;
            background-color: #003366;
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: bold;
            transition: background 0.3s;
          }

          .login-box button:hover {
            background-color: #f36624;
          }

          .login-box p.error {
            color: red;
            margin-top: 0.75rem;
            font-size: 0.9rem;
          }

          .reset-modal {
            position: fixed;
            top: 0; left: 0;
            right: 0; bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
          }

          .reset-card {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.25);
            width: 100%;
            max-width: 400px;
            text-align: center;
          }

          .reset-card input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ccc;
            border-radius: 8px;
            margin-bottom: 1rem;
          }

          .reset-card button {
            padding: 0.6rem 1.5rem;
            background-color: #003366;
            color: white;
            border: none;
            border-radius: 8px;
            margin-right: 10px;
          }

          .reset-card button:hover {
            background-color: #f36624;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>

      <div className="login-box">
        <div className="login-logo">
          <img src={Fouvlogo} alt="Fouv Logo" />
        </div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="login-options">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember Me
            </label>

            <div className="forgot-password" onClick={() => setShowResetModal(true)}>
              Forgot Password?
            </div>
          </div>

          <button type="submit">Login</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>

      {/* Reset Modal */}
      {showResetModal && (
        <div className="reset-modal">
          <div className="reset-card">
            <h3>Reset Your Password</h3>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
            <div>
              <button onClick={handlePasswordReset}>Send Reset Link</button>
              <button onClick={() => setShowResetModal(false)}>Cancel</button>
            </div>
            {resetStatus && <p style={{ marginTop: '1rem', color: 'green' }}>{resetStatus}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
