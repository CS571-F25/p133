import { Container, Nav, Navbar as BSNavbar } from "react-bootstrap";
import { Link, NavLink, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import SettingsModal from './SettingsModal';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [hideTimeout, setHideTimeout] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            setIsLoggedIn(true);
            setUsername(currentUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setIsLoggedIn(false);
        setUsername('');
        alert('Logged out successfully!');
        navigate('/');
    };

    const handleMouseEnter = () => {
        if (hideTimeout) {
            clearTimeout(hideTimeout);
            setHideTimeout(null);
        }
        setShowDropdown(true);
    };

    const handleMouseLeave = () => {
        const timeout = setTimeout(() => {
            setShowDropdown(false);
        }, 300); // 300ms delay before closing
        setHideTimeout(timeout);
    };

    return (
        <BSNavbar bg="primary" variant="dark" fixed="top" expand="lg" style={{ zIndex: 1000 }}>
            <Container fluid>
                <BSNavbar.Brand as={Link} to="/" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    Plan your day
                </BSNavbar.Brand>
                
                <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
                
                <BSNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/" style={{ color: 'white' }}>
                            Home
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/calendar" style={{ color: 'white' }}>
                            Calendar
                        </Nav.Link>
                    </Nav>
                    
                    <Nav>
                        {isLoggedIn ? (
                            <div 
                                style={{ 
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '0 15px'
                                }}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                {/* Headshot */}
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    backgroundColor: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    fontSize: '18px',
                                    color: '#007bff',
                                    cursor: 'pointer',
                                    border: '2px solid #fff',
                                    pointerEvents: 'auto'
                                }}>
                                    {username.charAt(0).toUpperCase()}
                                </div>
                                
                                {/* Dropdown Menu */}
                                {showDropdown && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '50px',
                                        right: '0',
                                        backgroundColor: 'white',
                                        borderRadius: '4px',
                                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                        minWidth: '200px',
                                        zIndex: 1001,
                                        pointerEvents: 'auto'
                                    }}>
                                        <div style={{
                                            padding: '15px',
                                            borderBottom: '1px solid #e0e0e0',
                                            color: '#333'
                                        }}>
                                            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                                                {username}
                                            </div>
                                            <div style={{ fontSize: '12px', color: '#666' }}>
                                                Logged in
                                            </div>
                                        </div>
                                        <div
                                            onClick={() => {
                                                setShowDropdown(false);
                                                setShowSettings(true);
                                            }}
                                            style={{
                                                padding: '12px 15px',
                                                cursor: 'pointer',
                                                color: '#333',
                                                transition: 'background-color 0.2s',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                borderBottom: '1px solid #e0e0e0'
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                        >
                                            <span>⚙️</span>
                                            <span>Settings</span>
                                        </div>
                                        <div
                                            onClick={handleLogout}
                                            style={{
                                                padding: '12px 15px',
                                                cursor: 'pointer',
                                                color: '#dc3545',
                                                fontWeight: 'bold',
                                                transition: 'background-color 0.2s',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px'
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                        >
                                            <span>🚪</span>
                                            <span>Logout</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Nav.Link 
                                as={Link} 
                                to="/login" 
                                style={{
                                    backgroundColor: 'white',
                                    color: '#007bff',
                                    padding: '8px 20px',
                                    borderRadius: '4px',
                                    fontWeight: 'bold',
                                    margin: '0 10px'
                                }}
                            >
                                Login / Sign Up
                            </Nav.Link>
                        )}
                    </Nav>
                </BSNavbar.Collapse>
            </Container>
            
            <SettingsModal 
                show={showSettings}
                onHide={() => setShowSettings(false)}
            />
        </BSNavbar>
    );
}
