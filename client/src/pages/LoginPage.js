import React, { useState } from 'react';
import { loginUser } from '../api/user';
import '../css/Login.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const userData = await loginUser({ email, password });
            console.log('User logged in:', userData);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container">
            <div className="modal is-open">
                <div className="modal-container">
                    <div className="modal-left">
                        <h2 className="modal-title">LogIn</h2>
                        <p className="modal-desc">Wealcome back! Please enter your details.</p>

                        <form onSubmit={handleLogin}>
                            <div className="input-block">
                                <label className="input-label" htmlfor="email">Email</label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-block">
                                <label className="input-label" htmlfor="password">Password</label>
                                <input
                                    type="password"
                                    palceholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button className="input-button" type="submit" disabled={loading}>
                                {loading ? 'Logging in...' : 'Log In'}
                            </button>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                        </form>
                        <p className="sign-up">
                            Don't have an account? <a href="/signup">Sign Up</a>
                        </p>
                    </div>
                    <div className="modal-right">
                        <img
                            src="https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=800&q=80"
                            alt="login background"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};



export default LoginPage;