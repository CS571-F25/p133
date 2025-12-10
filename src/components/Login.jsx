import { useState } from 'react';
import Navbar from './Navbar';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isSignup, setIsSignup] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!username || !password) {
            setError('Please enter both username and password');
            return;
        }

        if (isSignup) {
            // Signup validation
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }

            if (!/^\d{7}$/.test(password)) {
                setError('Password must be exactly 7 digits');
                return;
            }

            // Check if user already exists
            const existingUsers = JSON.parse(localStorage.getItem('users') || '{}');
            if (existingUsers[username]) {
                alert('Username already exists.');
                return;
            }

            // Save new user
            existingUsers[username] = { password };
            localStorage.setItem('users', JSON.stringify(existingUsers));

            // Save logged in user
            localStorage.setItem('currentUser', username);

            alert('Account created successfully!');
            // Force a page reload/redirect
            window.location.href = '#/';
        } else {
            // Login validation
            const existingUsers = JSON.parse(localStorage.getItem('users') || '{}');

            if (!existingUsers[username] || existingUsers[username].password !== password) {
                alert('Wrong username/password, try again.');
                return;
            }

            // Save logged in user
            localStorage.setItem('currentUser', username);

            alert('Login successful!');
            window.location.href = '#/';
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        if (isSignup) {
            // Only allow digits and limit to 7 characters for signup
            if (/^\d*$/.test(value) && value.length <= 7) {
                setPassword(value);
            }
        } else {
            // Allow any input for login
            setPassword(value);
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 7) {
            setConfirmPassword(value);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Navbar />

            <div style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                marginTop: '64px'
            }}>
                <div className="glass-card" style={{
                    width: '100%',
                    maxWidth: '450px',
                    padding: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <h1 style={{
                        marginBottom: '30px',
                        color: 'var(--text-main)',
                        fontWeight: '800'
                    }}>
                        {isSignup ? 'Create Account' : 'Welcome Back'}
                    </h1>

                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <div className="mb-3">
                            <label className="form-label" style={{ fontWeight: '600' }}>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                style={{
                                    padding: '12px',
                                    borderRadius: '12px',
                                    border: '1px solid var(--glass-border)',
                                    background: 'rgba(255,255,255,0.5)'
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" style={{ fontWeight: '600' }}>
                                Password {isSignup && <span style={{ fontSize: '0.8em', color: 'var(--text-secondary)' }}>(7 digits)</span>}
                            </label>
                            <input
                                type={isSignup ? "text" : "password"}
                                className="form-control"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder={isSignup ? "7-digit password" : "Enter password"}
                                maxLength={isSignup ? "7" : undefined}
                                style={{
                                    padding: '12px',
                                    borderRadius: '12px',
                                    border: '1px solid var(--glass-border)',
                                    background: 'rgba(255,255,255,0.5)',
                                    letterSpacing: isSignup ? '2px' : 'normal'
                                }}
                            />
                            {isSignup && (
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '5px' }}>
                                    {password.length}/7 digits entered
                                </div>
                            )}
                        </div>

                        {isSignup && (
                            <div className="mb-3">
                                <label className="form-label" style={{ fontWeight: '600' }}>Confirm Password</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    placeholder="Re-enter password"
                                    maxLength="7"
                                    style={{
                                        padding: '12px',
                                        borderRadius: '12px',
                                        border: '1px solid var(--glass-border)',
                                        background: 'rgba(255,255,255,0.5)',
                                        letterSpacing: '2px'
                                    }}
                                />
                                {confirmPassword && password !== confirmPassword && (
                                    <div style={{ color: 'var(--danger-color)', fontSize: '12px', marginTop: '5px' }}>
                                        Passwords do not match
                                    </div>
                                )}
                            </div>
                        )}

                        {error && (
                            <div className="alert alert-danger" style={{
                                padding: '10px',
                                borderRadius: '12px',
                                fontSize: '14px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                color: 'var(--danger-color)'
                            }}>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn-primary"
                            style={{
                                width: '100%',
                                padding: '14px',
                                fontSize: '16px',
                                border: 'none',
                                borderRadius: '24px', // Pill
                                cursor: 'pointer',
                                fontWeight: '700',
                                marginTop: '10px',
                                color: 'white' // Ensure white text
                            }}
                        >
                            {isSignup ? 'Sign Up' : 'Log In'}
                        </button>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <button
                            onClick={() => {
                                setIsSignup(!isSignup);
                                setError('');
                                setConfirmPassword('');
                                setPassword('');
                            }}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--primary-color)',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '600',
                                textDecoration: 'none'
                            }}
                            onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                            onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                        >
                            {isSignup ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
