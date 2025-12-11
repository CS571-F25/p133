import React from 'react';

export default function FeatureCard({ icon, title, text }) {
    return (
        <div className="feature-card glass-card" style={{
            padding: '30px',
            background: 'rgba(255,255,255,0.4)',
            border: '1px solid var(--glass-border)'
        }}>
            <div style={{ fontSize: '2rem', marginBottom: '15px' }}>{icon}</div>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px', fontSize: '1.25rem' }}>
                {title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                {text}
            </p>
        </div>
    );
}
