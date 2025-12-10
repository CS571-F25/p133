import Navbar from './Navbar';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router';

export default function Home(props) {
    return (
        <div style={{
            minHeight: '100vh',
            paddingTop: '80px', // More padding for floating glass navbar
            paddingBottom: '40px',
            color: 'var(--text-main)' // Inherit color
        }}>
            <Navbar />

            <style>{`
                .hero-carousel .slide-frame {
                    position: relative;
                    height: 400px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .hero-carousel .main-card {
                    background: var(--glass-bg);
                    backdrop-filter: blur(8px);
                    border: 1px solid var(--glass-border);
                    height: 80%;
                    width: 70%;
                    border-radius: 24px;
                    box-shadow: var(--glass-shadow);
                    position: relative;
                    z-index: 2;
                }
                .hero-carousel .float-card {
                    position: absolute;
                    background: rgba(255, 255, 255, 0.4);
                    backdrop-filter: blur(4px);
                    border: 1px solid var(--glass-border);
                    border-radius: 16px;
                    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
                    animation: floatY 6s ease-in-out infinite;
                    z-index: 1;
                }
                .hero-carousel .float-card.small {
                    width: 140px;
                    height: 100px;
                }
                .hero-carousel .float-card.tiny {
                    width: 90px;
                    height: 70px;
                    animation-duration: 7.5s;
                }
                .hero-carousel .float-1 { top: 10%; right: 10%; }
                .hero-carousel .float-2 { bottom: 15%; left: 10%; animation-name: floatYAlt; }

                @keyframes floatY {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                @keyframes floatYAlt {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(15px); }
                }
                
                .feature-card {
                    transition: transform 0.3s;
                }
                .feature-card:hover {
                    transform: translateY(-5px);
                }
                
                @media (max-width: 768px) {
                    .hero-carousel .slide-frame { height: 280px; }
                    .hero-carousel .main-card { width: 85%; }
                }
            `}</style>

            {/* Hero Section */}
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                <div className="hero-carousel" style={{ width: '100%', marginBottom: '40px' }}>
                    <Carousel indicators interval={4000} controls={true} fade>
                        <Carousel.Item>
                            <div className="slide-frame">
                                <div className="main-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <h3 style={{ fontSize: '2rem', color: 'var(--primary-color)' }}>Organize</h3>
                                </div>
                                <div className="float-card small float-1" />
                                <div className="float-card small float-2" />
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="slide-frame">
                                <div className="main-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <h3 style={{ fontSize: '2rem', color: 'var(--primary-color)' }}>Analyze</h3>
                                </div>
                                <div className="float-card tiny float-1" />
                                <div className="float-card small float-2" />
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </div>

                {/* Main Content */}
                <div className="glass-card" style={{ padding: '40px', marginBottom: '40px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h1 className="main-title" style={{
                            fontSize: 'clamp(32px, 5vw, 48px)',
                            marginBottom: '10px',
                            background: `linear-gradient(135deg, var(--primary-color), #60a5fa)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            Plan your day
                        </h1>
                        <h2 style={{ color: 'var(--text-secondary)', fontSize: '1.5rem', fontWeight: '400' }}>
                            Welcome to Your Personal Calendar
                        </h2>
                    </div>

                    <div style={{
                        maxWidth: '800px',
                        margin: '0 auto 40px auto',
                        textAlign: 'center'
                    }}>
                        <p className="welcome-text" style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                            Organize your life with our intuitive calendar application.
                            Keep track of important dates, schedule events, and never miss a moment.
                        </p>
                    </div>

                    <div className="feature-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '24px',
                        marginBottom: '40px'
                    }}>
                        {[
                            { icon: '📅', title: 'Easy Scheduling', text: 'Create and manage events with just a few clicks. Set reminders and stay on top of your schedule.' },
                            { icon: '🔔', title: 'Smart Reminders', text: 'Get notified about upcoming events and never miss important appointments or deadlines.' },
                            { icon: '📊', title: 'Month View', text: 'View your entire month at a glance and plan ahead with our comprehensive calendar view.' }
                        ].map((feature, i) => (
                            <div key={i} className="feature-card glass-card" style={{
                                padding: '30px',
                                background: 'rgba(255,255,255,0.4)',
                                border: '1px solid var(--glass-border)'
                            }}>
                                <div style={{ fontSize: '2rem', marginBottom: '15px' }}>{feature.icon}</div>
                                <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px', fontSize: '1.25rem' }}>
                                    {feature.title}
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                    {feature.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        textAlign: 'center',
                        marginTop: '40px',
                        paddingTop: '30px',
                        borderTop: '1px solid var(--glass-border)'
                    }}>
                        <h2 style={{ marginBottom: '15px', color: 'var(--text-main)' }}>
                            Ready to Get Started?
                        </h2>
                        <Link
                            to="/calendar"
                            className="btn-primary"
                            style={{
                                display: 'inline-block',
                                padding: '14px 40px',
                                fontSize: '1.1rem',
                                color: 'white',
                                textDecoration: 'none',
                                borderRadius: '12px',
                                fontWeight: '600',
                                marginTop: '10px'
                            }}
                        >
                            Go to Calendar
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}