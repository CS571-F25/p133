import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';

export default function EventModal({ show, onHide, onSave, selectedDate }) {
    const [eventText, setEventText] = useState('');
    const [eventTime, setEventTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (eventText.trim()) {
            const eventData = eventTime 
                ? `${eventTime} - ${eventText}` 
                : eventText;
            onSave(eventData);
            setEventText('');
            setEventTime('');
            onHide();
        }
    };

    const handleClose = () => {
        setEventText('');
        setEventTime('');
        onHide();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedDate && (
                    <p style={{ marginBottom: '15px', color: '#666' }}>
                        <strong>Date:</strong> {selectedDate}
                    </p>
                )}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Event Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter event description"
                            value={eventText}
                            onChange={(e) => setEventText(e.target.value)}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Time (optional)</Form.Label>
                        <Form.Control
                            type="time"
                            value={eventTime}
                            onChange={(e) => setEventTime(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Add Event
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
