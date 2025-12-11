import Navbar from './Navbar';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router';
import FeatureCard from './FeatureCard';
import MonthImg from '../assets/Month.png';
import ChatImg from '../assets/Chat.png';
import CheckInImg from '../assets/CheckIn.png';
import GridImg from '../assets/Grid.png';

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
                                <div className="main-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', overflow: 'hidden' }}>
                                    <div style={{ flex: 1, zIndex: 2 }}>
                                        <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '10px' }}>Organize</h3>
                                        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Plan your months with ease.</p>
                                    </div>
                                    <div style={{ flex: 1.5, display: 'flex', justifyContent: 'center', zIndex: 2 }}>
                                        <img src={MonthImg} alt="Month Preview" style={{ maxWidth: '100%', maxHeight: '250px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                                    </div>
                                </div>
                                <div className="float-card small float-1" style={{ top: '10%', right: '5%' }} />
                                <div className="float-card small float-2" style={{ bottom: '10%', left: '5%' }} />
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="slide-frame">
                                <div className="main-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', overflow: 'hidden' }}>
                                    <div style={{ flex: 1, zIndex: 2 }}>
                                        <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '10px' }}>Analyze</h3>
                                        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Track habits & progress.</p>
                                    </div>
                                    <div style={{ flex: 1.5, display: 'flex', justifyContent: 'center', zIndex: 2 }}>
                                        <img src={GridImg} alt="Grid Preview" style={{ maxWidth: '100%', maxHeight: '250px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                                    </div>
                                </div>
                                <div className="float-card tiny float-1" style={{ top: '15%', right: '10%' }} />
                                <div className="float-card small float-2" style={{ bottom: '15%', left: '10%' }} />
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

                    <div className="feature-showcase" style={{ display: 'flex', flexDirection: 'column', gap: '80px', marginBottom: '80px' }}>

                        {/* Feature 1: Month View (Image Left, Text Right) */}
                        <div className="feature-row" style={{ display: 'flex', alignItems: 'center', gap: '40px', flexDirection: 'row' }}>
                            <div className="feature-image" style={{ flex: 1 }}>
                                <img src={MonthImg} alt="Month View" style={{ width: '100%', borderRadius: '16px', border: '1px solid var(--glass-border)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                            </div>
                            <div className="feature-text" style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '2rem', color: 'var(--primary-color)', marginBottom: '15px' }}>Comprehensive Planning</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '1.6' }}>
                                    View your entire month at a glance. Manage events, set moods, and navigate years with ease involving our new Month View.
                                </p>
                            </div>
                        </div>

                        {/* Feature 2: Check-In (Text Left, Image Right) */}
                        <div className="feature-row reversed" style={{ display: 'flex', alignItems: 'center', gap: '40px', flexDirection: 'row-reverse' }}>
                            <div className="feature-image" style={{ flex: 1 }}>
                                <img src={CheckInImg} alt="Check In Feature" style={{ width: '100%', borderRadius: '16px', border: '1px solid var(--glass-border)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                            </div>
                            <div className="feature-text" style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '2rem', color: 'var(--primary-color)', marginBottom: '15px' }}>Daily Goal Check-Ins</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '1.6' }}>
                                    Join goal-based rooms and check in daily. Stay accountable and track your journey alongside friends and teammates.
                                </p>
                            </div>
                        </div>

                        {/* Feature 3: Chat (Image Left, Text Right) */}
                        <div className="feature-row" style={{ display: 'flex', alignItems: 'center', gap: '40px', flexDirection: 'row' }}>
                            <div className="feature-image" style={{ flex: 1 }}>
                                <img src={ChatImg} alt="Chat Feature" style={{ width: '100%', borderRadius: '16px', border: '1px solid var(--glass-border)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                            </div>
                            <div className="feature-text" style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '2rem', color: 'var(--primary-color)', marginBottom: '15px' }}>Real-time Collaboration</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '1.6' }}>
                                    Stay connected with your team. Share updates, motivate each other, and discuss progress in dedicated room chats.
                                </p>
                            </div>
                        </div>

                        {/* Feature 4: Grid (Text Left, Image Right) */}
                        <div className="feature-row reversed" style={{ display: 'flex', alignItems: 'center', gap: '40px', flexDirection: 'row-reverse' }}>
                            <div className="feature-image" style={{ flex: 1 }}>
                                <img src={GridImg} alt="Consistency Grid" style={{ width: '100%', borderRadius: '16px', border: '1px solid var(--glass-border)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                            </div>
                            <div className="feature-text" style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '2rem', color: 'var(--primary-color)', marginBottom: '15px' }}>Visualize Your Consistency</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '1.6' }}>
                                    Watch your progress grow on the commitment grid. Visual cues help you maintain your streak and build lasting habits.
                                </p>
                            </div>
                        </div>

                    </div>

                    <style>{`
                        @media (max-width: 768px) {
                            .feature-row, .feature-row.reversed {
                                flexDirection: column !important;
                                text-align: center;
                            }
                            .feature-image, .feature-text {
                                width: 100%;
                            }
                        }
                    `}</style>

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