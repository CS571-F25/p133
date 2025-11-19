import Navbar from './Navbar';
import EventModal from './EventModal';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';

export default function Calendar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [viewMode, setViewMode] = useState('month'); // 'year', 'month', 'day'

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        setIsLoggedIn(!!currentUser);
        
        if (currentUser) {
            const savedEvents = localStorage.getItem(`events_${currentUser}`);
            if (savedEvents) {
                setEvents(JSON.parse(savedEvents));
            }
            
            // Apply saved settings
            const savedSettings = localStorage.getItem(`settings_${currentUser}`);
            if (savedSettings) {
                const settings = JSON.parse(savedSettings);
                if (settings.backgroundColor) {
                    document.body.style.backgroundColor = settings.backgroundColor;
                }
            }
        }
    }, []);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const getDaysInMonth = (m, y) => new Date(y, m + 1, 0).getDate();
    const getFirstDayOfMonth = (m, y) => new Date(y, m, 1).getDay();

    const previousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const handleDateClick = (day) => {
        setSelectedDate(day);
        setViewMode('day');
    };

    const handleMonthClick = (monthIndex) => {
        setCurrentDate(new Date(year, monthIndex, 1));
        setViewMode('month');
    };

    const saveEvent = (eventText) => {
        if (!selectedDate) return;
        
        const dateKey = `${year}-${month}-${selectedDate}`;
        const newEvents = { ...events };
        if (!newEvents[dateKey]) {
            newEvents[dateKey] = [];
        }
        newEvents[dateKey].push(eventText);
        setEvents(newEvents);
        
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            localStorage.setItem(`events_${currentUser}`, JSON.stringify(newEvents));
        }
        
        setShowModal(false);
    };

    const deleteEvent = (day, eventIndex) => {
        const dateKey = `${year}-${month}-${day}`;
        const newEvents = { ...events };
        if (newEvents[dateKey]) {
            newEvents[dateKey].splice(eventIndex, 1);
            if (newEvents[dateKey].length === 0) {
                delete newEvents[dateKey];
            }
            setEvents(newEvents);
            
            const currentUser = localStorage.getItem('currentUser');
            if (currentUser) {
                localStorage.setItem(`events_${currentUser}`, JSON.stringify(newEvents));
            }
        }
    };

    const renderYearView = () => {
        return (
            <div style={{ padding: '20px', height: '100%', overflow: 'auto' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '30px'
                }}>
                    <button
                        onClick={() => setCurrentDate(new Date(year - 1, 0, 1))}
                        style={{
                            padding: '12px 24px',
                            fontSize: '16px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        ← {year - 1}
                    </button>
                    <h1 style={{ margin: 0, fontSize: '36px', color: '#333' }}>{year}</h1>
                    <button
                        onClick={() => setCurrentDate(new Date(year + 1, 0, 1))}
                        style={{
                            padding: '12px 24px',
                            fontSize: '16px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        {year + 1} →
                    </button>
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '20px'
                }}>
                    {monthNames.map((monthName, idx) => {
                        const monthDays = getDaysInMonth(idx, year);
                        let monthEventCount = 0;
                        for (let day = 1; day <= monthDays; day++) {
                            const dateKey = `${year}-${idx}-${day}`;
                            if (events[dateKey]) {
                                monthEventCount += events[dateKey].length;
                            }
                        }
                        
                        return (
                            <div
                                key={idx}
                                onClick={() => handleMonthClick(idx)}
                                style={{
                                    padding: '30px',
                                    border: '2px solid #ddd',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    backgroundColor: month === idx ? '#e3f2fd' : 'white',
                                    transition: 'all 0.2s',
                                    textAlign: 'center'
                                }}
                                onMouseOver={(e) => {
                                    if (month !== idx) e.currentTarget.style.backgroundColor = '#f5f5f5';
                                }}
                                onMouseOut={(e) => {
                                    if (month !== idx) e.currentTarget.style.backgroundColor = 'white';
                                }}
                            >
                                <h3 style={{ margin: '0 0 15px 0', color: '#007bff', fontSize: '20px' }}>{monthName}</h3>
                                <div style={{ fontSize: '16px', color: '#666' }}>
                                    {monthEventCount > 0 ? `${monthEventCount} event${monthEventCount > 1 ? 's' : ''}` : 'No events'}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderMonthView = () => {
        const daysInMonth = getDaysInMonth(month, year);
        const firstDay = getFirstDayOfMonth(month, year);
        const cells = [];

        // Empty cells
        for (let i = 0; i < firstDay; i++) {
            cells.push(
                <div key={`empty-${i}`} style={{ 
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #dee2e6'
                }}></div>
            );
        }

        // Day cells
        for (let day = 1; day <= daysInMonth; day++) {
            const dateKey = `${year}-${month}-${day}`;
            const dayEvents = events[dateKey] || [];
            const isToday = new Date().getDate() === day && 
                           new Date().getMonth() === month && 
                           new Date().getFullYear() === year;

            cells.push(
                <div
                    key={day}
                    onClick={() => handleDateClick(day)}
                    style={{
                        padding: '10px',
                        border: '1px solid #dee2e6',
                        backgroundColor: isToday ? '#fff3cd' : 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => {
                        if (!isToday) e.currentTarget.style.backgroundColor = '#f8f9fa';
                    }}
                    onMouseOut={(e) => {
                        if (!isToday) e.currentTarget.style.backgroundColor = 'white';
                    }}
                >
                    <div style={{ 
                        fontWeight: isToday ? 'bold' : 'normal',
                        fontSize: '16px',
                        marginBottom: '8px',
                        color: isToday ? '#007bff' : '#333'
                    }}>
                        {day}
                    </div>
                    <div style={{ 
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        flex: 1,
                        overflow: 'hidden'
                    }}>
                        {dayEvents.slice(0, 3).map((event, idx) => (
                            <div key={idx} style={{ 
                                padding: '4px 8px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                borderRadius: '3px',
                                fontSize: '11px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}>
                                {event}
                            </div>
                        ))}
                        {dayEvents.length > 3 && (
                            <div style={{ 
                                fontSize: '11px',
                                color: '#007bff',
                                fontWeight: 'bold'
                            }}>
                                +{dayEvents.length - 3} more
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return (
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100%',
                padding: '10px'
            }}>
                {/* Month Navigation */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '10px'
                }}>
                    <button 
                        onClick={previousMonth}
                        style={{
                            padding: '12px 24px',
                            fontSize: '16px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        ← Previous
                    </button>
                    <h2 style={{ margin: 0, fontSize: '28px' }}>
                        {monthNames[month]} {year}
                    </h2>
                    <button 
                        onClick={nextMonth}
                        style={{
                            padding: '12px 24px',
                            fontSize: '16px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Next →
                    </button>
                </div>

                {/* Day Headers */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    gap: '0',
                    marginBottom: '0'
                }}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} style={{
                            padding: '12px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            backgroundColor: '#007bff',
                            color: 'white',
                            fontSize: '14px',
                            border: '1px solid #0056b3'
                        }}>
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    gridTemplateRows: 'repeat(6, 1fr)',
                    gap: '0',
                    flex: 1,
                    minHeight: 0,
                    border: '1px solid #dee2e6'
                }}>
                    {cells}
                </div>
            </div>
        );
    };

    const renderDayView = () => {
        if (!selectedDate) {
            setSelectedDate(new Date().getDate());
            return null;
        }

        const dateKey = `${year}-${month}-${selectedDate}`;
        const dayEvents = events[dateKey] || [];
        const date = new Date(year, month, selectedDate);
        const dayOfWeek = dayNames[date.getDay()];

        return (
            <div style={{ 
                padding: '30px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'auto'
            }}>
                <div style={{ marginBottom: '30px' }}>
                    <h2 style={{ 
                        fontSize: '32px', 
                        margin: '0 0 10px 0',
                        color: '#007bff'
                    }}>
                        {dayOfWeek}, {monthNames[month]} {selectedDate}
                    </h2>
                    <p style={{ 
                        fontSize: '20px',
                        color: '#666',
                        margin: 0
                    }}>
                        {year}
                    </p>
                </div>

                <div style={{
                    borderTop: '2px solid #e0e0e0',
                    paddingTop: '20px'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '20px'
                    }}>
                        <h3 style={{ margin: 0, fontSize: '24px' }}>Events</h3>
                        <button
                            onClick={() => setShowModal(true)}
                            style={{
                                padding: '12px 24px',
                                fontSize: '16px',
                                backgroundColor: '#28a745',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            + Add Event
                        </button>
                    </div>

                    {dayEvents.length === 0 ? (
                        <p style={{ fontSize: '16px', color: '#999', fontStyle: 'italic' }}>
                            No events scheduled for this day.
                        </p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {dayEvents.map((event, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        padding: '16px 20px',
                                        backgroundColor: '#f8f9fa',
                                        borderLeft: '4px solid #007bff',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <span style={{ fontSize: '16px', flex: 1 }}>{event}</span>
                                    <button
                                        onClick={() => deleteEvent(selectedDate, idx)}
                                        style={{
                                            padding: '8px 16px',
                                            backgroundColor: '#dc3545',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '14px'
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    if (!isLoggedIn) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: 'white', paddingTop: '60px' }}>
                <Navbar />
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 'calc(100vh - 60px)',
                    padding: '20px'
                }}>
                    <h2 style={{ fontSize: '32px', marginBottom: '20px', color: '#333' }}>
                        Login Required
                    </h2>
                    <p style={{ fontSize: '18px', marginBottom: '30px', color: '#666' }}>
                        Please log in to access the calendar and manage your events.
                    </p>
                    <Link 
                        to="/login"
                        style={{
                            padding: '12px 30px',
                            fontSize: '18px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '4px'
                        }}
                    >
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            backgroundColor: 'white'
        }}>
            <Navbar />
            
            <div style={{ 
                marginTop: '60px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}>
                {/* View Mode Navigation */}
                <div style={{
                    display: 'flex',
                    gap: '0',
                    borderBottom: '2px solid #dee2e6',
                    backgroundColor: '#f8f9fa'
                }}>
                    <button
                        onClick={() => setViewMode('year')}
                        style={{
                            padding: '16px 40px',
                            fontSize: '16px',
                            backgroundColor: viewMode === 'year' ? '#007bff' : 'transparent',
                            color: viewMode === 'year' ? 'white' : '#666',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: viewMode === 'year' ? 'bold' : 'normal',
                            transition: 'all 0.2s',
                            borderRight: '1px solid #dee2e6'
                        }}
                    >
                        Year Plan
                    </button>
                    <button
                        onClick={() => setViewMode('month')}
                        style={{
                            padding: '16px 40px',
                            fontSize: '16px',
                            backgroundColor: viewMode === 'month' ? '#007bff' : 'transparent',
                            color: viewMode === 'month' ? 'white' : '#666',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: viewMode === 'month' ? 'bold' : 'normal',
                            transition: 'all 0.2s',
                            borderRight: '1px solid #dee2e6'
                        }}
                    >
                        Month Plan
                    </button>
                    <button
                        onClick={() => {
                            if (!selectedDate) {
                                setSelectedDate(new Date().getDate());
                            }
                            setViewMode('day');
                        }}
                        style={{
                            padding: '16px 40px',
                            fontSize: '16px',
                            backgroundColor: viewMode === 'day' ? '#007bff' : 'transparent',
                            color: viewMode === 'day' ? 'white' : '#666',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: viewMode === 'day' ? 'bold' : 'normal',
                            transition: 'all 0.2s'
                        }}
                    >
                        Day Plan
                    </button>
                </div>

                {/* Content Area */}
                <div style={{ flex: 1, overflow: 'hidden' }}>
                    {viewMode === 'year' && renderYearView()}
                    {viewMode === 'month' && renderMonthView()}
                    {viewMode === 'day' && renderDayView()}
                </div>
            </div>

            <EventModal 
                show={showModal}
                onHide={() => setShowModal(false)}
                onSave={saveEvent}
                selectedDate={selectedDate ? `${monthNames[month]} ${selectedDate}, ${year}` : ''}
            />
        </div>
    );
}
