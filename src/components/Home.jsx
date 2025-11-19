import Navbar from './Navbar';
import { Carousel } from 'react-bootstrap';

export default function Home (props) {
    return (
        <div style={{ 
            minHeight: '100vh',
            backgroundColor: 'white',
            paddingTop: '60px' // Add padding for fixed navbar
        }}>
            <Navbar />
            
            {/* Add responsive styles */}
            <style>{`
                @media (max-width: 768px) {
                    .main-title {
                        font-size: 32px !important;
                    }
                    .feature-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
                @media (max-width: 480px) {
                    .main-title {
                        font-size: 24px !important;
                    }
                    .welcome-text {
                        font-size: 16px !important;
                    }
                }
                .hero-carousel .slide-frame {
                    position: relative;
                    height: 360px;
                }
                .hero-carousel .main-card {
                    background-color: #e0e0e0;
                    height: 100%;
                    border-radius: 12px;
                    box-shadow: 0 12px 24px rgba(0,0,0,0.12);
                }
                .hero-carousel .float-card {
                    position: absolute;
                    background-color: #e8e8e8;
                    border-radius: 10px;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.10);
                    animation: floatY 5s ease-in-out infinite;
                }
                .hero-carousel .float-card.small {
                    width: 120px;
                    height: 90px;
                }
                .hero-carousel .float-card.tiny {
                    width: 80px;
                    height: 60px;
                    animation-duration: 6.5s;
                }
                .hero-carousel .float-1 { top: 24px; right: 28px; }
                .hero-carousel .float-2 { bottom: 26px; left: 30px; animation-name: floatYAlt; }
                .hero-carousel .float-3 { top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.08; width: 60%; height: 70%; border-radius: 16px; }

                @keyframes floatY {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
                @keyframes floatYAlt {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(8px); }
                }
                @media (max-width: 768px) {
                    .hero-carousel .slide-frame { height: 240px; }
                }
            `}</style>

            {/* Hero Carousel */}
            <div className="hero-carousel" style={{ width: '100%', padding: '10px 0 0 0' }}>
                <Carousel indicators interval={4000} controls={true} fade>
                    <Carousel.Item>
                        <div className="slide-frame">
                            <div className="main-card" />
                            <div className="float-card small float-1" />
                            <div className="float-card small float-2" />
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="slide-frame">
                            <div className="main-card" />
                            <div className="float-card tiny float-1" />
                            <div className="float-card small float-2" />
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="slide-frame">
                            <div className="main-card" />
                            <div className="float-card small float-1" />
                            <div className="float-card tiny float-2" />
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>

            <div style={{ padding: '30px 20px' }}>
                {/* Main Content - Calendar Information */}
                <div style={{ 
                    width: '100%',
                    maxWidth: '1400px',
                    margin: '0 auto'
                }}>
                    <h1 className="main-title" style={{ 
                        fontSize: '48px',
                        marginBottom: '20px',
                        color: '#333'
                    }}>
                        Plan your day
                    </h1>
                    
                    <div style={{
                        padding: '30px 0',
                        marginBottom: '20px',
                        borderBottom: '2px solid #e0e0e0'
                    }}>
                        <h2 style={{ color: '#007bff', marginBottom: '15px', fontSize: 'clamp(20px, 4vw, 28px)' }}>
                            Welcome to Your Personal Calendar
                        </h2>
                        <p className="welcome-text" style={{ fontSize: '18px', lineHeight: '1.6', color: '#555' }}>
                            Organize your life with our intuitive calendar application. 
                            Keep track of important dates, schedule events, and never miss a moment.
                        </p>
                    </div>

                    <div className="feature-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '20px',
                        marginTop: '30px'
                    }}>
                        <div style={{
                            padding: '25px',
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px'
                        }}>
                            <h3 style={{ color: '#007bff', marginBottom: '10px', fontSize: 'clamp(16px, 3vw, 20px)' }}>
                                📅 Easy Scheduling
                            </h3>
                            <p style={{ color: '#666', lineHeight: '1.5', fontSize: 'clamp(14px, 2vw, 16px)' }}>
                                Create and manage events with just a few clicks. 
                                Set reminders and stay on top of your schedule.
                            </p>
                        </div>

                        <div style={{
                            padding: '25px',
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px'
                        }}>
                            <h3 style={{ color: '#007bff', marginBottom: '10px', fontSize: 'clamp(16px, 3vw, 20px)' }}>
                                🔔 Smart Reminders
                            </h3>
                            <p style={{ color: '#666', lineHeight: '1.5', fontSize: 'clamp(14px, 2vw, 16px)' }}>
                                Get notified about upcoming events and never miss 
                                important appointments or deadlines.
                            </p>
                        </div>

                        <div style={{
                            padding: '25px',
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px'
                        }}>
                            <h3 style={{ color: '#007bff', marginBottom: '10px', fontSize: 'clamp(16px, 3vw, 20px)' }}>
                                📊 Month View
                            </h3>
                            <p style={{ color: '#666', lineHeight: '1.5', fontSize: 'clamp(14px, 2vw, 16px)' }}>
                                View your entire month at a glance and plan ahead 
                                with our comprehensive calendar view.
                            </p>
                        </div>
                    </div>

                    <div style={{
                        padding: '30px 0',
                        marginTop: '30px',
                        textAlign: 'center',
                        borderTop: '2px solid #e0e0e0'
                    }}>
                        <h2 style={{ marginBottom: '15px', color: '#333', fontSize: 'clamp(20px, 4vw, 28px)' }}>
                            Ready to Get Started?
                        </h2>
                        <p style={{ fontSize: 'clamp(14px, 2vw, 16px)', color: '#666', marginBottom: '20px' }}>
                            Navigate to the calendar page to start managing your events!
                        </p>
                        <a 
                            href="#/calendar" 
                            style={{
                                display: 'inline-block',
                                padding: '12px 30px',
                                fontSize: 'clamp(14px, 2vw, 16px)',
                                backgroundColor: '#28a745',
                                color: 'white',
                                textDecoration: 'none',
                                borderRadius: '4px',
                                fontWeight: 'bold'
                            }}
                        >
                            Go to Calendar
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}