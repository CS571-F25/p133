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
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            setIsLoggedIn(true);
            setUsername(currentUser);

            // Load user settings if any, otherwise default
            const savedSettings = localStorage.getItem(`settings_${currentUser}`);
            if (savedSettings) {
                const settings = JSON.parse(savedSettings);
                if (settings.mode === 'night') {
                    setIsDarkMode(true);
                    document.body.classList.add('night-mode');
                }
            }
        }
    }, []);

    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);

        if (newMode) {
            document.body.classList.add('night-mode');
        } else {
            document.body.classList.remove('night-mode');
        }

        // Save preference if logged in
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const savedSettings = JSON.parse(localStorage.getItem(`settings_${currentUser}`) || '{}');
            savedSettings.mode = newMode ? 'night' : 'day';
            localStorage.setItem(`settings_${currentUser}`, JSON.stringify(savedSettings));
        }
    };

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
        <>
            <style>{`
                .glass-navbar {
                    background: var(--glass-bg) !important;
                    backdrop-filter: blur(12px) !important;
                    -webkit-backdrop-filter: blur(12px) !important;
                    border-bottom: 1px solid var(--glass-border) !important;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.05) !important;
                    transition: all 0.3s ease;
                }
                .nav-link-custom {
                    color: var(--text-secondary) !important;
                    font-weight: 500;
                    padding: 8px 16px !important;
                    border-radius: 24px; 
                    transition: all 0.2s;
                }
                .nav-link-custom:hover, .nav-link-custom.active {
                    color: var(--primary-color) !important;
                    background: var(--primary-light);
                }
                .brand-text {
                    background: linear-gradient(135deg, var(--primary-color), #60a5fa);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    font-weight: 800 !important;
                }
                .dropdown-glass {
                    background: var(--glass-bg);
                    backdrop-filter: blur(12px);
                    border: 1px solid var(--glass-border);
                    box-shadow: var(--glass-shadow);
                }
                .theme-toggle-btn {
                    background: transparent;
                    border: none;
                    font-size: 20px;
                    cursor: pointer;
                    padding: 8px;
                    border-radius: 50%;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-secondary);
                }
                .theme-toggle-btn:hover {
                    background: var(--primary-light);
                    transform: rotate(15deg);
                }
            `}</style>
            <BSNavbar className="glass-navbar" fixed="top" expand="lg" style={{ zIndex: 1000, height: '64px' }}>
                <Container fluid>
                    <BSNavbar.Brand as={Link} to="/" className="brand-text" style={{ fontSize: '24px' }}>
                        Plan your day
                    </BSNavbar.Brand>

                    <div className="d-flex align-items-center gap-2 order-lg-last">
                        <button onClick={toggleTheme} className="theme-toggle-btn" title="Toggle Dark/Light Mode">
                            {isDarkMode ? '☀️' : '🌙'}
                        </button>

                        {isLoggedIn ? (
                            <div
                                tabIndex="0"
                                role="button"
                                aria-label="User menu"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        setShowDropdown(!showDropdown);
                                    }
                                }}
                                style={{
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '0 15px',
                                    border: 'none',
                                    background: 'transparent'
                                }}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                {/* Headshot */}
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--primary-color), #60a5fa)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    fontSize: '18px',
                                    color: 'white',
                                    cursor: 'pointer',
                                    border: '2px solid rgba(255,255,255,0.5)',
                                    boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)'
                                }}>
                                    {username.charAt(0).toUpperCase()}
                                </div>

                                {/* Dropdown Menu */}
                                {showDropdown && (
                                    <div className="dropdown-glass" style={{
                                        position: 'absolute',
                                        top: '55px',
                                        right: '10px',
                                        borderRadius: '12px',
                                        minWidth: '220px',
                                        zIndex: 1001,
                                        pointerEvents: 'auto',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            padding: '16px',
                                            borderBottom: '1px solid var(--glass-border)',
                                            color: 'var(--text-main)'
                                        }}>
                                            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                                                {username}
                                            </div>
                                            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                                Logged in
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setShowDropdown(false);
                                                setShowSettings(true);
                                            }}
                                            style={{
                                                width: '100%',
                                                textAlign: 'left',
                                                background: 'transparent',
                                                border: 'none',
                                                padding: '12px 16px',
                                                cursor: 'pointer',
                                                color: 'var(--text-main)',
                                                transition: 'all 0.2s',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                borderBottom: '1px solid var(--glass-border)',
                                                fontSize: '1rem'
                                            }}
                                            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--primary-light)'; e.currentTarget.style.color = 'var(--primary-color)'; }}
                                            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-main)'; }}
                                        >
                                            <span>⚙️</span>
                                            <span>Personal Info</span>
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            style={{
                                                width: '100%',
                                                textAlign: 'left',
                                                background: 'transparent',
                                                border: 'none',
                                                padding: '12px 16px',
                                                cursor: 'pointer',
                                                color: 'var(--danger-color)',
                                                fontWeight: '600',
                                                transition: 'all 0.2s',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                fontSize: '1rem'
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
                                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                        >
                                            <span>🚪</span>
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Nav.Link
                                as={Link}
                                to="/login"
                                className="btn-primary"
                                style={{
                                    color: 'white',
                                    padding: '8px 24px',
                                    borderRadius: '10px',
                                    fontWeight: '600',
                                    margin: '0 10px',
                                    boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)'
                                }}
                            >
                                Login / Sign Up
                            </Nav.Link>
                        )}
                    </div>

                    <BSNavbar.Toggle aria-controls="basic-navbar-nav" />

                    <BSNavbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" style={{ gap: '10px' }}>
                            <Nav.Link as={NavLink} to="/" className="nav-link-custom">
                                Home
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/calendar" className="nav-link-custom">
                                Calendar
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/checkin" className="nav-link-custom">
                                Check In
                            </Nav.Link>
                        </Nav>
                    </BSNavbar.Collapse>
                </Container>

                <SettingsModal
                    show={showSettings}
                    onHide={() => setShowSettings(false)}
                />
            </BSNavbar>
        </>
    );
}
