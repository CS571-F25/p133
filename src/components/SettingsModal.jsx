import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function SettingsModal({ show, onHide }) {
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isChinese, setIsChinese] = useState(false);

    useEffect(() => {
        // Load saved settings from localStorage
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const savedSettings = localStorage.getItem(`settings_${currentUser}`);
            if (savedSettings) {
                const settings = JSON.parse(savedSettings);
                setBackgroundColor(settings.backgroundColor || '#ffffff');
                setIsDarkMode(settings.mode === 'night');
                setIsChinese(settings.language === 'zh');
            }
        }
    }, [show]);

    const handleSave = () => {
        if (isChinese) {
            alert('Coming soon 敬请期待');
            setIsChinese(false);
            return;
        }

        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const settings = {
                backgroundColor,
                mode: isDarkMode ? 'night' : 'day',
                language: isChinese ? 'zh' : 'en'
            };
            localStorage.setItem(`settings_${currentUser}`, JSON.stringify(settings));
            
            // Apply settings immediately
            document.body.style.backgroundColor = backgroundColor;
            
            alert('Settings saved successfully!');
            onHide();
            // Reload page to apply settings
            window.location.reload();
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* Background Color */}
                    <Form.Group className="mb-4">
                        <Form.Label>Background Color</Form.Label>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <Form.Control
                                type="color"
                                value={backgroundColor}
                                onChange={(e) => setBackgroundColor(e.target.value)}
                                style={{ width: '60px', height: '40px' }}
                            />
                            <Form.Control
                                type="text"
                                value={backgroundColor}
                                onChange={(e) => setBackgroundColor(e.target.value)}
                                placeholder="#ffffff"
                            />
                        </div>
                        <Form.Text className="text-muted">
                            Choose your preferred background color
                        </Form.Text>
                    </Form.Group>

                    {/* Mode Toggle (Day/Night) */}
                    <Form.Group className="mb-4">
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            marginBottom: '5px'
                        }}>
                            <Form.Label style={{ margin: 0 }}>
                                {isDarkMode ? '🌙 Night Mode' : '☀️ Day Mode'}
                            </Form.Label>
                            <Form.Check
                                type="switch"
                                id="mode-switch"
                                checked={isDarkMode}
                                onChange={(e) => setIsDarkMode(e.target.checked)}
                                style={{ transform: 'scale(1.3)' }}
                            />
                        </div>
                        <Form.Text className="text-muted">
                            Toggle between light and dark theme
                        </Form.Text>
                    </Form.Group>

                    {/* Language Toggle */}
                    <Form.Group className="mb-3">
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            marginBottom: '5px'
                        }}>
                            <Form.Label style={{ margin: 0 }}>
                                {isChinese ? '🇨🇳 中文' : '🇺🇸 English'}
                            </Form.Label>
                            <Form.Check
                                type="switch"
                                id="language-switch"
                                checked={isChinese}
                                onChange={(e) => setIsChinese(e.target.checked)}
                                style={{ transform: 'scale(1.3)' }}
                            />
                        </div>
                        <Form.Text className="text-muted">
                            Switch between English and Chinese
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
