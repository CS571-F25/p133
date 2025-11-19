import { useState } from 'react';
import { useNavigate } from 'react-router';
import Navbar from './Navbar';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const navigate = useNavigate();

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
                alert('Wrong username/password, try again.');
                return;
            }
            
            // Save new user
            existingUsers[username] = { password };
            localStorage.setItem('users', JSON.stringify(existingUsers));
            
            // Save logged in user
            localStorage.setItem('currentUser', username);
            
            alert('Account created successfully!');
            // Force a page reload to update the navbar
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
            // Force a page reload to update the navbar
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
        // Only allow digits and limit to 7 characters
        if (/^\d*$/.test(value) && value.length <= 7) {
            setConfirmPassword(value);
        }
    };

    return (
        <div style={{ 
            minHeight: '100vh',
            backgroundColor: 'white',
            paddingTop: '60px' // Add padding for fixed navbar
        }}>
            <Navbar />
            
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '40px 20px',
                minHeight: 'calc(100vh - 60px)'
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '400px',
                    padding: '40px',
                    border: '1px solid #ddd',
                    borderRadius: '8px'
                }}>
                    <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
                        {isSignup ? 'Sign Up' : 'Login'}
                    </h1>
                    
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                Username:
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    fontSize: '16px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    boxSizing: 'border-box'
                                }}
                                placeholder="Enter your username"
                            />
                        </div>
                        
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                Password{isSignup ? ' (7 digits)' : ''}:
                            </label>
                            <input
                                type={isSignup ? "text" : "password"}
                                value={password}
                                onChange={handlePasswordChange}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    fontSize: '16px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    boxSizing: 'border-box',
                                    letterSpacing: isSignup ? '2px' : 'normal'
                                }}
                                placeholder={isSignup ? "Enter 7-digit password" : "Enter your password"}
                                maxLength={isSignup ? "7" : undefined}
                            />
                            {isSignup && (
                                <div style={{ 
                                    fontSize: '12px',
                                    color: '#666',
                                    marginTop: '5px'
                                }}>
                                    {password.length}/7 digits entered
                                </div>
                            )}
                        </div>
                        
                        {isSignup && (
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                    Confirm Password:
                                </label>
                                <input
                                    type="text"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        fontSize: '16px',
                                        border: `1px solid ${confirmPassword && password !== confirmPassword ? '#dc3545' : '#ddd'}`,
                                        borderRadius: '4px',
                                        boxSizing: 'border-box',
                                        letterSpacing: '2px'
                                    }}
                                    placeholder="Re-enter your password"
                                    maxLength="7"
                                />
                                {confirmPassword && password !== confirmPassword && (
                                    <div style={{ 
                                        color: '#dc3545', 
                                        fontSize: '12px',
                                        marginTop: '5px'
                                    }}>
                                        Passwords do not match
                                    </div>
                                )}
                            </div>
                        )}
                        
                        {error && (
                            <div style={{ 
                                color: 'red', 
                                marginBottom: '15px',
                                fontSize: '14px',
                                padding: '10px',
                                backgroundColor: '#ffebee',
                                borderRadius: '4px'
                            }}>
                                {error}
                            </div>
                        )}
                        
                        <button 
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '12px',
                                fontSize: '16px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                marginBottom: '15px'
                            }}
                        >
                            {isSignup ? 'Sign Up' : 'Login'}
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
                                color: '#007bff',
                                cursor: 'pointer',
                                fontSize: '14px',
                                textDecoration: 'underline'
                            }}
                        >
                            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
