import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/user';
import '../css/Login.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    console.log('📤 front SignUp request:', { username, email, password });

    try {
      const userData = await registerUser({ username, email, password });
      console.log('✅ User registered:', userData);

      if (userData?.token) {
        localStorage.setItem('userInfo', JSON.stringify(userData));
        navigate('/login'); // ניתוב לדף הבית
      } else {
        setError('Registration succeeded but no token was returned');
      }
    } catch (err) {
      console.error('❌ Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="modal is-open">
        <div className="modal-container">
          <div className="modal-left">
            <h2 className="modal-title">Sign Up</h2>
            <p className="modal-desc">Create a new account.</p>
            <form onSubmit={handleSignUp}>
              <div className="input-block">
                <label className="input-label">Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
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
              <button
                className="input-button pokeball-button"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Signing up...' : 'Sign Up'}
              </button>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>

            <p className="sign-up">
              Already have an account?{' '}
              <button
                type="button"
                className="link-button"
                onClick={() => navigate('/login')}
              >
                Log In
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

export default SignUp;
