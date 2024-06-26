import React, { useState, useEffect } from 'react';
import '../App.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(''); // New state for login error messages

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(storedIsLoggedIn);
  }, []);

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      console.log('Login successful');
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      setLoginError(''); // Clear any error messages
    } else {
      console.log('Invalid username or password');
      setLoginError('Invalid username or password'); // Set the error message
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    localStorage.setItem('isLoggedIn', 'false');
    setLoginError(''); // Clear any error messages
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className="url-form-title-container">
            <h1 className="url-form-title">Welcome</h1>
            <div style={{ marginTop: '20px' }}>
                <button onClick={handleLogout} className="url-submit-button">Logout</button>
            </div>
        </div>
      ) : (
        <div className="url-form-title-container">
          <h1 className="url-form-title">Login Page</h1>
          <div style={{ marginTop: '30px' }}>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="url-input"
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="url-input"
            />
          </div>
          {loginError && <div style={{ color: 'red', marginTop: '10px' }}>{loginError}</div>}
          <div style={{ marginTop: '10px' }}>
            <button onClick={handleLogin} className="url-submit-button">Login</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
