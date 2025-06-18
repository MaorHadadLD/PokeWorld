import React, {useState} from 'react';
import {loginUser} from '../api/user';

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
        const userData = await loginUser({email, password});
        console.log('User logged in:', userData);
    } catch (err) {
        setError(err.response?.data?.message || 'Login failed');
    } finally {
        setLoading(false);
    }
   }

   return (
    <div className='login-page' style={{maxWidth: 400, margin: 'auto'}}>
        <h2>LogIn</h2>
        <form onSubmit={handleLogin}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                palceholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Log In'}
            </button>
            {error && <p style={{color:'red'}}>{error}</p>}
        </form>
    </div>
)
};



export default LoginPage;