import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/user';
import '../css/Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userData = await loginUser({email, password});
      console.log('User logged in:', userData);

      if (userData?.token) {
        // שמירת מידע המשתמש
      localStorage.setItem('userInfo', JSON.stringify(userData));
        navigate('/home'); 

      } else {
        setError('Login succeeded but no token was returned');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="modal is-open">
        <div className="modal-container">
          <div className="modal-left">
            <h2 className="modal-title">LogIn</h2>
            <p className="modal-desc">Welcome back! Please enter your details.</p>
            <form onSubmit={handleLogin}>
              <div className="input-block">
                <label className="input-label">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-block">
                <label className="input-label">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className="input-button pokeball-button" type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Log In'}
              </button>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>

            <p className="sign-up">
              Don't have an account?{" "}
              <button type="button" className="link-button" onClick={() => navigate('/signup')}>
                Sign Up
              </button>
            </p>
          </div>
          <div className="modal-right">
            <img
              src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png"
              alt="Pikachu"
              className="pikachu-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
