import React from 'react';

export default function MessageBubble({ message, isCurrentUser }) {
    return (
        <div
            style={{
                background: isCurrentUser ? 'var(--primary-light)' : 'rgba(255,255,255,0.05)',
                padding: '12px 16px',
                borderRadius: '12px',
                marginLeft: isCurrentUser ? 'auto' : 0,
                maxWidth: '70%',
                wordWrap: 'break-word'
            }}
        >
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                {message.user} • {message.timestamp}
            </div>
            <div style={{ color: 'var(--text-main)' }}>{message.text}</div>
        </div>
    );
}
