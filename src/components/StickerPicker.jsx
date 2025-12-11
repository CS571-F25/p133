import React from 'react';
import './Calendar.css';

export default function StickerPicker({ options, onSelect, onClose }) {
    return (
        <div className="sticker-picker-popover">
            <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-main)' }}>How was your day?</h4>
            <div className="sticker-grid">
                {options.map(emoji => (
                    <div
                        key={emoji}
                        className="sticker-option"
                        onClick={() => onSelect(emoji)}
                    >
                        {emoji}
                    </div>
                ))}
            </div>
            <button
                onClick={() => onSelect(null)}
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    marginTop: '5px'
                }}
            >
                Clear Mood
            </button>
        </div>
    );
}
