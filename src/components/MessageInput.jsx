import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function MessageInput({ onSend }) {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim()) {
            onSend(text);
            setText('');
        }
    };

    return (
        <div style={{ padding: '20px', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '10px' }}>
            <Form.Control
                type="text"
                placeholder="Send a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                style={{ borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }}
            />
            <Button onClick={handleSend} className="btn-primary">
                Send
            </Button>
        </div>
    );
}
