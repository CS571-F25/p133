import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function EventModal({ show, onHide, onSave, onDelete, selectedDate, initialStartTime, initialEndTime, initialDescription }) {
    const [eventText, setEventText] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    // Update state when modal opens with new initial values
    useEffect(() => {
        if (show) {
            setStartTime(initialStartTime || '');
            setEndTime(initialEndTime || '');
            setEventText(initialDescription || ''); // Pre-fill description if editing
        }
    }, [show, initialStartTime, initialEndTime, initialDescription]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!eventText.trim()) {
            alert('Please enter an event description');
            return;
        }

        if (startTime && endTime) {
            if (startTime >= endTime) {
                alert('End time must be after start time');
                return;
            }
        }

        // Pass structured data instead of just a string
        const eventData = {
            id: Date.now(), // Generate a simple ID (could rely on existing ID if editing, but for simplicity creating new/updating parent handles it)
            text: eventText,
            startTime: startTime || '',
            endTime: endTime || ''
        };

        onSave(eventData);
        resetForm();
    };

    const handleDelete = () => {
        if (onDelete && window.confirm('Are you sure you want to delete this event?')) {
            onDelete();
            resetForm();
        }
    };

    const resetForm = () => {
        setEventText('');
        setStartTime('');
        setEndTime('');
        onHide();
    };

    const isEditing = !!onDelete; // Function existence implies editing existing event

    return (
        <Modal show={show} onHide={resetForm} centered contentClassName="event-modal-glass">
            <Modal.Header closeButton className="border-0">
                <Modal.Title style={{ color: 'var(--text-main)' }}>{isEditing ? 'Edit Event' : 'Add Event'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedDate && (
                    <div style={{
                        marginBottom: '20px',
                        padding: '10px',
                        background: 'var(--primary-light)',
                        borderRadius: '8px',
                        color: 'var(--primary-color)',
                        fontWeight: '600'
                    }}>
                        📅 {selectedDate}
                    </div>
                )}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label style={{ color: 'var(--text-main)' }}>Event Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="What's happening?"
                            value={eventText}
                            onChange={(e) => setEventText(e.target.value)}
                            autoFocus
                            style={{
                                background: 'var(--bg-offset)',
                                border: '1px solid var(--glass-border)',
                                color: 'var(--text-main)',
                                borderRadius: '12px'
                            }}
                        />
                    </Form.Group>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label style={{ color: 'var(--text-main)' }}>Start Time</Form.Label>
                                <Form.Control
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    style={{
                                        background: 'var(--bg-offset)',
                                        border: '1px solid var(--glass-border)',
                                        color: 'var(--text-main)',
                                        borderRadius: '12px'
                                    }}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label style={{ color: 'var(--text-main)' }}>End Time</Form.Label>
                                <Form.Control
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    style={{
                                        background: 'var(--bg-offset)',
                                        border: '1px solid var(--glass-border)',
                                        color: 'var(--text-main)',
                                        borderRadius: '12px'
                                    }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer className="border-0 justify-content-between">
                <div>
                    {isEditing && (
                        <Button variant="danger" onClick={handleDelete} style={{ borderRadius: '20px' }}>
                            Delete
                        </Button>
                    )}
                </div>
                <div>
                    <Button variant="secondary" onClick={resetForm} style={{ borderRadius: '20px', marginRight: '10px' }}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit} className="btn-primary" style={{ color: 'white' }}>
                        {isEditing ? 'Update Event' : 'Save Event'}
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
