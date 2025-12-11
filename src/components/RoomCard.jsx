import React from 'react';
import { Button, Badge } from 'react-bootstrap';

export default function RoomCard({ room, isMember, onJoin, onEnter, onLeave }) {
    return (
        <div className="glass-card" style={{ padding: '24px', cursor: 'pointer', transition: 'transform 0.2s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <Badge bg="info">{room.tag}</Badge>
                <span style={{ color: 'var(--text-secondary)' }}>👥 {room.members.length}</span>
            </div>
            <h3 style={{ color: 'var(--text-main)', margin: '10px 0' }}>{room.title}</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>{room.description}</p>

            {isMember ? (
                <>
                    <Button
                        onClick={() => onEnter(room)}
                        className="btn-primary"
                        style={{ width: '100%', marginBottom: '10px', borderRadius: '12px' }}
                    >
                        Enter Room
                    </Button>
                    <Button
                        onClick={() => onLeave(room.id)}
                        variant="outline-danger"
                        style={{ width: '100%', borderRadius: '12px' }}
                    >
                        Leave Room
                    </Button>
                </>
            ) : (
                <Button
                    onClick={() => onJoin(room.id)}
                    className="btn-primary"
                    style={{ width: '100%', borderRadius: '12px' }}
                >
                    Join Room
                </Button>
            )}
        </div>
    );
}
