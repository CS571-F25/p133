import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function SettingsModal({ show, onHide }) {
    const [description, setDescription] = useState('');
    const [hobbies, setHobbies] = useState('');

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const savedProfile = localStorage.getItem(`profile_${currentUser}`);
            if (savedProfile) {
                const profile = JSON.parse(savedProfile);
                setDescription(profile.description || '');
                setHobbies(profile.hobbies || '');
            } else {
                setDescription('');
                setHobbies('');
            }
        }
    }, [show]);

    const handleSave = () => {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const profile = {
                description,
                hobbies
            };
            localStorage.setItem(`profile_${currentUser}`, JSON.stringify(profile));
            alert('Personal info saved successfully!');
            onHide();
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered contentClassName="settings-modal-glass">
            <Modal.Header closeButton className="border-0">
                <Modal.Title style={{ color: 'var(--text-main)' }}>Personal Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label style={{ color: 'var(--text-main)' }}>Description (About Me)</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Tell us a bit about yourself..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{
                                background: 'var(--bg-offset)',
                                border: '1px solid var(--glass-border)',
                                color: 'var(--text-main)',
                                borderRadius: '12px'
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label style={{ color: 'var(--text-main)' }}>Hobbies & Interests</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            placeholder="e.g. Reading, Hiking, Coding..."
                            value={hobbies}
                            onChange={(e) => setHobbies(e.target.value)}
                            style={{
                                background: 'var(--bg-offset)',
                                border: '1px solid var(--glass-border)',
                                color: 'var(--text-main)',
                                borderRadius: '12px'
                            }}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="border-0">
                <Button variant="secondary" onClick={onHide} style={{ borderRadius: '20px' }}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSave} className="btn-primary" style={{ color: 'white' }}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
