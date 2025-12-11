import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Modal, Button, Form, Badge } from 'react-bootstrap';
import '../index.css';

export default function CheckIn() {
    const [view, setView] = useState('browse'); // 'browse', 'myrooms', 'room'
    const [rooms, setRooms] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState('All');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    // New Room Form State
    const [newRoomTitle, setNewRoomTitle] = useState('');
    const [newRoomDesc, setNewRoomDesc] = useState('');
    const [newRoomTag, setNewRoomTag] = useState('General');

    const tags = ['All', 'School', 'Fitness', 'Language', 'Art', 'Habit', 'Other'];
    const createTags = ['School', 'Fitness', 'Language', 'Art', 'Habit', 'Other'];
    const currentUser = localStorage.getItem('currentUser');

    // Load rooms and members from localStorage
    useEffect(() => {
        const savedRooms = localStorage.getItem('checkin_rooms');
        if (savedRooms) {
            setRooms(JSON.parse(savedRooms));
        }
    }, []);

    // Load messages when room is selected
    useEffect(() => {
        if (selectedRoom) {
            const roomMessages = localStorage.getItem(`messages_${selectedRoom.id}`);
            if (roomMessages) {
                setMessages(JSON.parse(roomMessages));
            } else {
                setMessages([]);
            }
        }
    }, [selectedRoom]);

    const handleCreateRoom = () => {
        if (!currentUser) {
            alert('Please log in to create a room!');
            return;
        }
        if (!newRoomTitle.trim()) return;

        const newRoom = {
            id: Date.now(),
            title: newRoomTitle,
            description: newRoomDesc,
            tag: newRoomTag,
            creator: currentUser,
            members: [currentUser], // Array of member usernames
            createdAt: new Date().toISOString(),
            checkIns: {}, // { username: [dates] }
            improvement: 0 // Track improvement stats
        };

        const updatedRooms = [newRoom, ...rooms];
        setRooms(updatedRooms);
        localStorage.setItem('checkin_rooms', JSON.stringify(updatedRooms));

        // Reset and close
        setNewRoomTitle('');
        setNewRoomDesc('');
        setNewRoomTag('General');
        setShowCreateModal(false);
    };

    const handleJoinRoom = (roomId) => {
        if (!currentUser) return alert('Please log in!');

        const updatedRooms = rooms.map(room => {
            if (room.id === roomId && !room.members.includes(currentUser)) {
                return { ...room, members: [...room.members, currentUser] };
            }
            return room;
        });

        setRooms(updatedRooms);
        localStorage.setItem('checkin_rooms', JSON.stringify(updatedRooms));
    };

    const handleLeaveRoom = (roomId) => {
        if (!currentUser) return;

        const updatedRooms = rooms.map(room => {
            if (room.id === roomId) {
                return { ...room, members: room.members.filter(m => m !== currentUser) };
            }
            return room;
        });

        setRooms(updatedRooms);
        localStorage.setItem('checkin_rooms', JSON.stringify(updatedRooms));
        setSelectedRoom(null);
        setView('browse');
    };

    const handleDeleteMember = (roomId, memberName) => {
        const updatedRooms = rooms.map(room => {
            if (room.id === roomId && (room.creator === currentUser || memberName === currentUser)) {
                return { ...room, members: room.members.filter(m => m !== memberName) };
            }
            return room;
        });

        setRooms(updatedRooms);
        localStorage.setItem('checkin_rooms', JSON.stringify(updatedRooms));
    };

    const handleCheckIn = (roomId) => {
        if (!currentUser) return alert('Please log in to check in!');

        const today = new Date().toDateString();
        const updatedRooms = rooms.map(room => {
            if (room.id === roomId) {
                const checkIns = room.checkIns || {};
                checkIns[currentUser] = [...(checkIns[currentUser] || []), today];
                // Calculate improvement (consecutive days)
                const uniqueDates = new Set(checkIns[currentUser]).size;
                return {
                    ...room,
                    checkIns,
                    improvement: Math.min(uniqueDates, 100) // Cap at 100
                };
            }
            return room;
        });

        setRooms(updatedRooms);
        localStorage.setItem('checkin_rooms', JSON.stringify(updatedRooms));

        if (selectedRoom && selectedRoom.id === roomId) {
            setSelectedRoom(updatedRooms.find(r => r.id === roomId));
        }
    };

    const handleSendMessage = () => {
        if (!newMessage.trim() || !selectedRoom) return;

        const message = {
            id: Date.now(),
            user: currentUser,
            text: newMessage,
            timestamp: new Date().toLocaleTimeString()
        };

        const updatedMessages = [...messages, message];
        setMessages(updatedMessages);
        localStorage.setItem(`messages_${selectedRoom.id}`, JSON.stringify(updatedMessages));
        setNewMessage('');
    };

    const isUserInRoom = (room) => room.members.includes(currentUser);
    const isCheckedInToday = (room) => {
        const today = new Date().toDateString();
        return room.checkIns && room.checkIns[currentUser] && room.checkIns[currentUser].includes(today);
    };
    const getUserRooms = () => rooms.filter(room => isUserInRoom(room));

    const filteredRooms = rooms.filter(room => {
        const matchesSearch = room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            room.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTag = selectedTag === 'All' || room.tag === selectedTag;
        return matchesSearch && matchesTag;
    });

    // Login Required View
    if (!currentUser) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <div style={{ marginTop: '80px', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                    <div className="glass-card" style={{ padding: '60px 40px', textAlign: 'center', maxWidth: '500px', borderRadius: '20px' }}>
                        <h1 style={{ color: 'var(--text-main)', marginBottom: '20px', fontSize: '2rem' }}>Log In Required</h1>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', fontSize: '1.1rem' }}>
                            Join and create accountability rooms, check in daily, and track your progress with the community!
                        </p>
                        <a href="#/login">
                            <Button className="btn-primary" style={{ padding: '12px 40px', fontSize: '1.1rem', borderRadius: '12px' }}>
                                Log In to Get Started
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    // Browse Rooms View
    if (view === 'browse') {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <div style={{ marginTop: '80px', flex: 1, padding: '20px', maxWidth: '1200px', margin: '80px auto 0', width: '100%' }}>
                    <div className="glass-card mb-4" style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
                            <h1 style={{ margin: 0, color: 'var(--text-main)' }}>Daily Check-In Rooms</h1>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <Button onClick={() => setShowCreateModal(true)} className="btn-primary">
                                    + Create Room
                                </Button>
                                <Button onClick={() => setView('myrooms')} variant="outline-primary">
                                    My Rooms
                                </Button>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '20px' }}>
                            <Form.Control
                                type="text"
                                placeholder="Search rooms..."
                                value={searchQuery}
                                aria-label="Search rooms"
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ maxWidth: '300px', borderRadius: '20px', background: 'rgba(255,255,255,0.1)', color: 'var(--text-main)', border: '1px solid var(--glass-border)' }}
                            />
                            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
                                {tags.map(tag => (
                                    <Button
                                        key={tag}
                                        variant={selectedTag === tag ? 'primary' : 'outline-secondary'}
                                        onClick={() => setSelectedTag(tag)}
                                        size="sm"
                                        style={{ borderRadius: '15px', whiteSpace: 'nowrap' }}
                                    >
                                        {tag}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                        {filteredRooms.map(room => (
                            <div
                                key={room.id}
                                className="glass-card"
                                style={{ padding: '24px', cursor: 'pointer', transition: 'transform 0.2s' }}
                                tabIndex="0"
                                role="button"
                                aria-label={`View details for room ${room.title}`}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        if (isUserInRoom(room)) {
                                            setSelectedRoom(room);
                                            setView('room');
                                        } else {
                                            handleJoinRoom(room.id);
                                        }
                                    }
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <Badge bg="info" text="dark">{room.tag}</Badge>
                                    <span style={{ color: 'var(--text-secondary)' }}>👥 {room.members.length}</span>
                                </div>
                                <h2 style={{ color: 'var(--text-main)', margin: '10px 0', fontSize: '1.5rem' }}>{room.title}</h2>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>{room.description}</p>

                                {isUserInRoom(room) ? (
                                    <>
                                        <Button
                                            onClick={() => {
                                                setSelectedRoom(room);
                                                setView('room');
                                            }}
                                            className="btn-primary"
                                            style={{ width: '100%', marginBottom: '10px', borderRadius: '12px' }}
                                        >
                                            Enter Room
                                        </Button>
                                        <Button
                                            onClick={() => handleLeaveRoom(room.id)}
                                            variant="outline-danger"
                                            style={{ width: '100%', borderRadius: '12px' }}
                                        >
                                            Leave Room
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        onClick={() => handleJoinRoom(room.id)}
                                        className="btn-primary"
                                        style={{ width: '100%', borderRadius: '12px' }}
                                    >
                                        Join Room
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Create Room Modal */}
                <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Create New Room</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="roomTitle">
                                <Form.Label>Room Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter room title"
                                    value={newRoomTitle}
                                    onChange={(e) => setNewRoomTitle(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="roomDesc">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="What's this room about?"
                                    value={newRoomDesc}
                                    onChange={(e) => setNewRoomDesc(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="roomTag">
                                <Form.Label>Category</Form.Label>
                                <Form.Select
                                    value={newRoomTag}
                                    onChange={(e) => setNewRoomTag(e.target.value)}
                                >
                                    {createTags.map(tag => (
                                        <option key={tag} value={tag}>{tag}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                            Cancel
                        </Button>
                        <Button className="btn-primary" onClick={handleCreateRoom}>
                            Create Room
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

    // My Rooms View (with improvement grid)
    if (view === 'myrooms') {
        const userRooms = getUserRooms();
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <div style={{ marginTop: '80px', flex: 1, padding: '20px', maxWidth: '1200px', margin: '80px auto 0', width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                        <h1 style={{ color: 'var(--text-main)', margin: 0 }}>My Check-In Rooms</h1>
                        <Button onClick={() => setView('browse')} variant="outline-primary">
                            ← Browse Rooms
                        </Button>
                    </div>

                    {userRooms.length === 0 ? (
                        <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>No rooms yet. Join or create one to get started!</p>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                            {userRooms.map(room => (
                                <div key={room.id} className="glass-card" style={{ padding: '24px' }}>
                                    <h2 style={{ color: 'var(--text-main)', marginBottom: '15px', fontSize: '1.5rem' }}>{room.title}</h2>

                                    {/* Improvement Grid */}
                                    <div style={{ marginBottom: '20px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                            <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Progress</span>
                                            <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>{room.improvement}%</span>
                                        </div>
                                        <div style={{
                                            height: '8px',
                                            background: 'rgba(255,255,255,0.1)',
                                            borderRadius: '4px',
                                            overflow: 'hidden',
                                            marginBottom: '15px'
                                        }}>
                                            <div style={{
                                                height: '100%',
                                                width: `${room.improvement}%`,
                                                background: 'linear-gradient(90deg, var(--primary-color), #60a5fa)',
                                                transition: 'width 0.3s'
                                            }} />
                                        </div>
                                    </div>

                                    {/* My Monthly Check-in Grid */}
                                    <div style={{ marginBottom: '20px' }}>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '8px' }}>Your Check-ins This Month</div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                                            {(() => {
                                                const today = new Date();
                                                const year = today.getFullYear();
                                                const month = today.getMonth();
                                                const firstDay = new Date(year, month, 1).getDay();
                                                const daysInMonth = new Date(year, month + 1, 0).getDate();
                                                const checkIns = room.checkIns?.[currentUser] || [];
                                                const days = [];

                                                for (let i = 0; i < firstDay; i++) {
                                                    days.push(null);
                                                }

                                                for (let day = 1; day <= daysInMonth; day++) {
                                                    const date = new Date(year, month, day);
                                                    const dateStr = date.toDateString();
                                                    const isCheckedIn = checkIns.includes(dateStr);
                                                    days.push({ day, dateStr, isCheckedIn });
                                                }

                                                return days.map((item, idx) => {
                                                    if (!item) {
                                                        return <div key={`empty-${idx}`} style={{ aspectRatio: '1' }} />;
                                                    }
                                                    return (
                                                        <div
                                                            key={item.day}
                                                            style={{
                                                                aspectRatio: '1',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                background: item.isCheckedIn ? 'rgba(96, 165, 250, 0.8)' : 'rgba(255,255,255,0.1)',
                                                                borderRadius: '6px',
                                                                border: '1px solid var(--glass-border)',
                                                                fontSize: '0.75rem',
                                                                fontWeight: '600',
                                                                color: 'var(--text-main)'
                                                            }}
                                                        >
                                                            {item.day}
                                                        </div>
                                                    );
                                                });
                                            })()}
                                        </div>
                                    </div>

                                    {/* Members Progress Grid */}
                                    <div style={{ marginBottom: '20px' }}>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '12px' }}>Team Check-ins</div>
                                        {room.members.map(member => {
                                            const memberCheckIns = room.checkIns?.[member] || [];
                                            return (
                                                <div key={member} style={{ marginBottom: '12px' }}>
                                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '4px' }}>
                                                        {member} • {memberCheckIns.length} check-ins
                                                    </div>
                                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '3px' }}>
                                                        {(() => {
                                                            const today = new Date();
                                                            const year = today.getFullYear();
                                                            const month = today.getMonth();
                                                            const firstDay = new Date(year, month, 1).getDay();
                                                            const daysInMonth = new Date(year, month + 1, 0).getDate();
                                                            const days = [];

                                                            for (let i = 0; i < firstDay; i++) {
                                                                days.push(null);
                                                            }

                                                            for (let day = 1; day <= daysInMonth; day++) {
                                                                const date = new Date(year, month, day);
                                                                const dateStr = date.toDateString();
                                                                const isCheckedIn = memberCheckIns.includes(dateStr);
                                                                days.push({ day, isCheckedIn });
                                                            }

                                                            return days.map((item, idx) => {
                                                                if (!item) {
                                                                    return <div key={`empty-${idx}`} style={{ aspectRatio: '1' }} />;
                                                                }
                                                                return (
                                                                    <div
                                                                        key={item.day}
                                                                        style={{
                                                                            aspectRatio: '1',
                                                                            background: item.isCheckedIn ? 'rgba(96, 165, 250, 0.6)' : 'rgba(255,255,255,0.05)',
                                                                            borderRadius: '3px',
                                                                            border: '1px solid var(--glass-border)'
                                                                        }}
                                                                    />
                                                                );
                                                            });
                                                        })()}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Room Stats */}
                                    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', fontSize: '1.1rem' }}>
                                        <Badge bg="secondary">👥 {room.members.length} members</Badge>
                                        <Badge bg="info" text="dark">{room.tag}</Badge>
                                    </div>

                                    <Button
                                        onClick={() => {
                                            setSelectedRoom(room);
                                            setView('room');
                                        }}
                                        className="btn-primary"
                                        style={{ width: '100%', borderRadius: '12px' }}
                                    >
                                        Enter Room
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Room View (messaging + members)
    if (view === 'room' && selectedRoom) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <div style={{ marginTop: '80px', flex: 1, display: 'flex', maxWidth: '1400px', margin: '80px auto 0', width: '100%', gap: '20px', padding: '20px' }}>
                    {/* Left: Messages */}
                    <div className="glass-card" style={{ flex: 2, display: 'flex', flexDirection: 'column', borderRadius: '16px' }}>
                        <div style={{ padding: '20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h1 style={{ color: 'var(--text-main)', margin: 0, fontSize: '1.5rem' }}>{selectedRoom.title}</h1>
                            <Button onClick={() => setView('myrooms')} variant="outline-secondary" size="sm">
                                ← Back
                            </Button>
                        </div>

                        {/* Messages */}
                        <div style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            minHeight: '300px'
                        }}>
                            {messages.length === 0 ? (
                                <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: 'auto', marginBottom: 'auto' }}>
                                    No messages yet. Start the conversation!
                                </div>
                            ) : (
                                messages.map(msg => (
                                    <div
                                        key={msg.id}
                                        style={{
                                            background: msg.user === currentUser ? 'var(--primary-light)' : 'rgba(255,255,255,0.05)',
                                            padding: '12px 16px',
                                            borderRadius: '12px',
                                            marginLeft: msg.user === currentUser ? 'auto' : 0,
                                            maxWidth: '70%',
                                            wordWrap: 'break-word'
                                        }}
                                    >
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                                            {msg.user} • {msg.timestamp}
                                        </div>
                                        <div style={{ color: 'var(--text-main)' }}>{msg.text}</div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Message Input */}
                        <div style={{ padding: '20px', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '10px' }}>
                            <Form.Control
                                type="text"
                                placeholder="Send a message..."
                                value={newMessage}
                                aria-label="Type a message"
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                style={{ borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }}
                            />
                            <Button onClick={handleSendMessage} className="btn-primary">
                                Send
                            </Button>
                        </div>
                    </div>

                    {/* Right: Members + Actions */}
                    <div className="glass-card" style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', borderRadius: '16px' }}>
                        <h3 style={{ color: 'var(--text-main)', marginBottom: '15px' }}>Members ({selectedRoom.members.length})</h3>

                        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '15px' }}>
                            {selectedRoom.members.map(member => (
                                <div key={member} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '12px',
                                    background: 'rgba(255,255,255,0.05)',
                                    borderRadius: '8px',
                                    marginBottom: '8px'
                                }}>
                                    <div style={{ color: 'var(--text-main)' }}>
                                        {member} {member === selectedRoom.creator && <Badge bg="warning" text="dark" className="ms-2">Owner</Badge>}
                                    </div>
                                    {(currentUser === selectedRoom.creator || currentUser === member) && (
                                        <Button
                                            onClick={() => handleDeleteMember(selectedRoom.id, member)}
                                            variant="danger"
                                            size="sm"
                                            style={{ borderRadius: '6px' }}
                                        >
                                            ✕
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Check-in Button */}
                        <Button
                            onClick={() => handleCheckIn(selectedRoom.id)}
                            disabled={isCheckedInToday(selectedRoom)}
                            variant={isCheckedInToday(selectedRoom) ? 'success' : 'primary'}
                            style={{ width: '100%', marginBottom: '10px', borderRadius: '12px', fontWeight: '600' }}
                        >
                            {isCheckedInToday(selectedRoom) ? 'Checked In Today!' : 'Check In Today'}
                        </Button>

                        <Button
                            onClick={() => handleLeaveRoom(selectedRoom.id)}
                            variant="outline-danger"
                            style={{ width: '100%', borderRadius: '12px' }}
                        >
                            Leave Room
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}
