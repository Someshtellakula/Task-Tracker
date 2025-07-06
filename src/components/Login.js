import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem('username', username);
      onLogin(username);
    }
  };

  return (
    <div className="login-container">
      <h2>Task Tracker Login</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
          required
          minLength={2}
          maxLength={32}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;