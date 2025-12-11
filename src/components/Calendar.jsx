import Navbar from './Navbar';
import EventModal from './EventModal';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import './Calendar.css';

export default function Calendar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState({});
    const [showModal, setShowModal] = useState(false);

    // Daily Stickers State
    const [stickers, setStickers] = useState({});
    const [showStickerPicker, setShowStickerPicker] = useState(false);
    const stickerOptions = ['😊', '🤩', '🥳', '😎', '🤔', '😐', '😴', '😤', '😭', '🤯', '🔥', '🎉', '💻', '📚', '🏃', '☕', '🍷', '🍕', '🏆', '⭐'];

    // Year Selection Drawer State
    const [showYearDrawer, setShowYearDrawer] = useState(false);

    const [viewMode, setViewMode] = useState('year');
    const [direction, setDirection] = useState('forward');

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

            const savedStickers = localStorage.getItem(`stickers_${currentUser}`);
            if (savedStickers) {
                setStickers(JSON.parse(savedStickers));
            }

            const savedSettings = localStorage.getItem(`settings_${currentUser}`);
            if (savedSettings) {
                const settings = JSON.parse(savedSettings);
                if (settings.mode === 'night') {
                    document.body.classList.add('night-mode');
                } else {
                    document.body.classList.remove('night-mode');
                }
            }
        }
    }, []);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const getDaysInMonth = (m, y) => new Date(y, m + 1, 0).getDate();
    const getFirstDayOfMonth = (m, y) => new Date(y, m, 1).getDay();

    const handleMonthClick = (monthIndex) => {
        setCurrentDate(new Date(year, monthIndex, 1));
        setDirection('forward');
        setViewMode('month');
        setSelectedDate(null);
    };

    const handleDateClick = (day) => {
        setSelectedDate(day);
        setDirection('forward');
        setViewMode('day');
    };

    const handleBackToYear = () => {
        setDirection('backward');
        setViewMode('year');
        setSelectedDate(null);
    };

    const handleBackToMonth = () => {
        setDirection('backward'); // Corrected direction for going back
        setViewMode('month');
        setSelectedDate(null);
    };


    const renderSidebar = () => {
        if (viewMode === 'year') {
            return null;
        }

        if (viewMode === 'month') {
            return (
                <div className="sidebar-list">
                    <h3 className="sidebar-year">{year}</h3>
                    <div className="sidebar-scroll">
                        {monthNames.map((mName, idx) => (
                            <div
                                key={idx}
                                className={`sidebar-item ${month === idx ? 'active' : ''}`}
                                onClick={() => handleMonthClick(idx)}
                            >
                                {mName}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        if (viewMode === 'day' && selectedDate) {
            // Expand context to +/- 4 days (total 9 days range)
            const daysToShow = [];
            for (let i = -4; i <= 4; i++) {
                const d = new Date(year, month, selectedDate + i);
                daysToShow.push(d);
            }

            return (
                <div className="sidebar-list">
                    <button onClick={handleBackToMonth} className="btn-back-sidebar">
                        ← {monthNames[month]}
                    </button>
                    <div className="sidebar-days-context">
                        {daysToShow.map((dateObj, idx) => {
                            const d = dateObj.getDate();
                            const m = dateObj.getMonth();
                            const isSelected = d === selectedDate && m === month;

                            return (
                                <div
                                    key={idx}
                                    className={`sidebar-day-item ${isSelected ? 'active-day' : ''}`}
                                    onClick={() => {
                                        if (m !== month) {
                                            setCurrentDate(new Date(year, m, 1));
                                        }
                                        setSelectedDate(d);
                                    }}
                                >
                                    <div className="day-name">{dayNames[dateObj.getDay()].substring(0, 3)}</div>
                                    <div className="day-num">{d}</div>
                                </div>
                            );
                        })}
                    </div>
                    {/* Add scroll indicators if needed, or rely on overflow */}
                </div>
            );
        }
        return null;
    };

    const renderHeaderTitle = () => {
        if (viewMode === 'year') {
            return (
                <div className="year-navigator">
                    <button onClick={() => setCurrentDate(new Date(year - 1, month, 1))} className="nav-arrow">
                        ‹
                    </button>

                    <div className="year-drawer-container">
                        <h1
                            className="calendar-title year-clickable"
                            onClick={() => setShowYearDrawer(!showYearDrawer)}
                        >
                            {year} <span style={{ fontSize: '1rem' }}>▼</span>
                        </h1>

                        {showYearDrawer && (
                            <div className="year-drawer glass-card">
                                <div className="year-grid-select">
                                    {Array.from({ length: 12 }, (_, i) => year - 4 + i).map(y => (
                                        <div
                                            key={y}
                                            className={`year-option ${y === year ? 'active' : ''}`}
                                            onClick={() => {
                                                setCurrentDate(new Date(y, month, 1));
                                                setShowYearDrawer(false);
                                            }}
                                        >
                                            {y}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <button onClick={() => setCurrentDate(new Date(year + 1, month, 1))} className="nav-arrow">
                        ›
                    </button>
                </div>
            );
        } else {
            return (
                <div className="calendar-header-simple">
                    {viewMode === 'month' && (
                        <button onClick={handleBackToYear} className="nav-btn">← Year</button>
                    )}
                    <h2 className="calendar-title">{monthNames[month]} {year}</h2>
                    {/* Spacer or directional buttons for month */}
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="nav-arrow small">‹</button>
                        <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="nav-arrow small">›</button>
                    </div>
                </div>
            );
        }
    };

    const renderYearView = () => {
        return (
            <div className="main-content-wrapper year-view-full">
                <div className="calendar-header-wrapper">
                    {renderHeaderTitle()}
                </div>
                <div className="year-grid">
                    {monthNames.map((monthName, idx) => {
                        const monthDays = getDaysInMonth(idx, year);
                        const firstDayIdx = getFirstDayOfMonth(idx, year);
                        const miniCells = [];
                        for (let i = 0; i < firstDayIdx; i++) miniCells.push(<div key={`empty-${i}`} className="mini-day empty"></div>);
                        for (let d = 1; d <= monthDays; d++) {
                            const dateKey = `${year}-${idx}-${d}`;
                            const dayEventCount = events[dateKey] ? events[dateKey].length : 0;
                            miniCells.push(
                                <div key={d} className={`mini-day ${dayEventCount > 0 ? 'has-event' : ''}`}></div>
                            );
                        }
                        return (
                            <div key={idx} onClick={() => handleMonthClick(idx)} className={`month-card ${month === idx ? 'active' : ''}`}>
                                <h3 className="month-name">{monthName}</h3>
                                <div className="month-preview-grid">{miniCells}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };


    // State to pass initial times to modal
    const [modalInitialTimes, setModalInitialTimes] = useState({ start: '', end: '', description: '' });
    const [editingEventIndex, setEditingEventIndex] = useState(null); // Track index of event being edited

    const saveEvent = (eventData) => {
        if (!selectedDate) return;

        const dateKey = `${year}-${month}-${selectedDate}`;
        const newEvents = { ...events };
        if (!newEvents[dateKey]) {
            newEvents[dateKey] = [];
        }

        if (editingEventIndex !== null) {
            // Update existing event
            newEvents[dateKey][editingEventIndex] = eventData;
        } else {
            // Add new event
            newEvents[dateKey].push(eventData);
        }

        setEvents(newEvents);

        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            localStorage.setItem(`events_${currentUser}`, JSON.stringify(newEvents));
        }

        setShowModal(false);
        setEditingEventIndex(null); // Reset edit state
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
        setShowModal(false); // Close modal if open
    };

    const handleStickerSelect = (emoji) => {
        if (!selectedDate) return;
        const dateKey = `${year}-${month}-${selectedDate}`;
        const newStickers = { ...stickers, [dateKey]: emoji };
        setStickers(newStickers);

        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            localStorage.setItem(`stickers_${currentUser}`, JSON.stringify(newStickers));
        }
        setShowStickerPicker(false);
    };

    const getTopOffset = (timeStr) => {
        if (!timeStr) return 0;
        const [h, m] = timeStr.split(':').map(Number);
        return (h * 60) + m;
    };

    // Calculate layout for overlapping events
    const calculateEventLayout = (dayEvents) => {
        // 1. Convert to measurable objects with indices
        let items = dayEvents.map((ev, idx) => {
            let startStr = typeof ev === 'string' ? '09:00' : ev.startTime;
            let endStr = typeof ev === 'string' ? '10:00' : ev.endTime;
            return {
                event: ev,
                index: idx, // Original index in the dayEvents array
                start: getTopOffset(startStr),
                end: getTopOffset(endStr) || (getTopOffset(startStr) + 60), // Ensure end is after start, default 1hr
                col: 0,
                maxCols: 1
            };
        });

        // 2. Sort by start time
        items.sort((a, b) => a.start - b.start);

        // 3. Assign columns (Greedy packing)
        const columns = []; // Each element is an array of events in that column
        items.forEach(item => {
            let placed = false;
            for (let i = 0; i < columns.length; i++) {
                const col = columns[i];
                const lastInCol = col[col.length - 1];
                // Check if the current item can be placed in this column without overlapping the last event
                if (lastInCol.end <= item.start) {
                    col.push(item);
                    item.col = i;
                    placed = true;
                    break;
                }
            }
            if (!placed) {
                // If no existing column can take the event, create a new column
                columns.push([item]);
                item.col = columns.length - 1;
            }
        });

        // 4. Determine max columns for layout width
        const totalColumns = columns.length;

        return items.map(item => ({
            ...item,
            width: 100 / totalColumns, // Each column takes an equal percentage of the available width
            left: (item.col / totalColumns) * 100 // Position based on its column index
        }));
    };

    // Month view render remains similar but header is extracted
    const renderMonthView = () => {
        const daysInMonth = getDaysInMonth(month, year);
        const firstDay = getFirstDayOfMonth(month, year);
        const cells = [];
        for (let i = 0; i < firstDay; i++) cells.push(<div key={`empty-${i}`} className="day-cell empty"></div>);
        for (let day = 1; day <= daysInMonth; day++) {
            const dateKey = `${year}-${month}-${day}`;
            const dayEvents = events[dateKey] || [];
            const daySticker = stickers[dateKey];
            const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;
            cells.push(
                <div key={day} onClick={() => handleDateClick(day)} className={`day-cell ${isToday ? 'today' : ''}`}>
                    <div className="day-number">{day}</div>
                    {daySticker && <div className="day-sticker">{daySticker}</div>}
                    <div className="event-dots">
                        {dayEvents.slice(0, 3).map((_, i) => <div key={i} className="dot"></div>)}
                    </div>
                </div>
            );
        }

        return (
            <div className="main-content-wrapper">
                <div className="calendar-header-wrapper">
                    {renderHeaderTitle()}
                </div>
                <div className="week-days-header">
                    {dayNames.map(d => <div key={d} className="week-day-label">{d.substring(0, 3)}</div>)}
                </div>
                <div className="days-grid">{cells}</div>
            </div>
        );
    };

    // Day View Render (Timeline Style)
    const renderDayView = () => {
        if (!selectedDate) return null;
        const dateObj = new Date(year, month, selectedDate);
        const dateKey = `${year}-${month}-${selectedDate}`;
        const daysEvents = events[dateKey] || [];
        const currentSticker = stickers[dateKey];

        const layoutItems = calculateEventLayout(daysEvents);

        const handleTimelineClick = (hour) => {
            const startStr = `${hour.toString().padStart(2, '0')}:00`;
            const endHour = hour + 1;
            const endStr = `${endHour.toString().padStart(2, '0')}:00`;
            setModalInitialTimes({ start: startStr, end: endStr, description: '' });
            setEditingEventIndex(null); // New event
            setShowModal(true);
        };

        const handleEventClick = (e, ev, idx) => {
            e.stopPropagation();
            setEditingEventIndex(idx);

            // Populate modal with existing event data
            let isLegacy = typeof ev === 'string';
            setModalInitialTimes({
                start: isLegacy ? '09:00' : ev.startTime,
                end: isLegacy ? '10:00' : ev.endTime,
                description: isLegacy ? ev : ev.text
            });
            setShowModal(true);
        };

        return (
            <div className="main-content-wrapper day-mode-content" style={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
                <div className="calendar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 className="calendar-title">{dayNames[dateObj.getDay()]}, {monthNames[month]} {selectedDate}</h2>

                    <div style={{ position: 'relative' }}>
                        <button
                            className="sticker-btn"
                            onClick={() => setShowStickerPicker(!showStickerPicker)}
                        >
                            {currentSticker ? <span>{currentSticker} Mood set</span> : <span>+ Set Mood</span>}
                        </button>

                        {showStickerPicker && (
                            <div className="sticker-picker-popover">
                                <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-main)' }}>How was your day?</h4>
                                <div className="sticker-grid">
                                    {stickerOptions.map(emoji => (
                                        <div
                                            key={emoji}
                                            className="sticker-option"
                                            onClick={() => handleStickerSelect(emoji)}
                                        >
                                            {emoji}
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => handleStickerSelect(null)}
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
                        )}
                    </div>
                </div>

                <div className="timeline-view">
                    {/* Render grid lines for 24 hours */}
                    {Array.from({ length: 24 }).map((_, hour) => (
                        <div
                            key={hour}
                            className="timeline-row"
                            onClick={() => handleTimelineClick(hour)}
                            style={{ cursor: 'pointer' }}
                            title={`Click to add event at ${hour}:00`}
                        >
                            <div className="time-label">
                                {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                            </div>
                            <div className="timeline-content"></div>
                        </div>
                    ))}

                    {/* Render Events with Layout */}
                    {layoutItems.map((item) => {
                        let ev = item.event;
                        let isLegacy = typeof ev === 'string';
                        let title = isLegacy ? ev : ev.text;
                        let start = isLegacy ? '09:00' : ev.startTime;
                        let end = isLegacy ? '10:00' : ev.endTime;

                        const height = item.end - item.start; // Duration in mins/pixels

                        return (
                            <div
                                key={item.index} // Use the original index for key
                                className="timeline-event"
                                style={{
                                    top: `${item.start}px`,
                                    height: `${height}px`,
                                    left: `calc(70px + ${item.left}%)`, // Offset 70px for time labels, then % of remaining width
                                    width: `calc((100% - 80px) * ${item.width / 100})`, // Width proportional to remaining space (10px padding on right)
                                    zIndex: 10 + item.col // Stack z-index slightly for overlapping events
                                }}
                                onClick={(e) => handleEventClick(e, ev, item.index)}
                            >
                                <div className="event-time">
                                    {start} - {end}
                                </div>
                                <div className="event-title">{title}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    if (!isLoggedIn) {
        return (
            <div className="calendar-container">
                <Navbar />
                <div style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '64px'
                }}>
                    <div className="glass-card" style={{
                        padding: '40px',
                        textAlign: 'center',
                        maxWidth: '400px'
                    }}>
                        <h2 style={{ marginBottom: '20px', color: 'var(--text-main)' }}>Log In Required</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
                            Log in to access your personal calendar and explore more functions.
                        </p>
                        <Link to="/login" className="btn-primary" style={{
                            padding: '12px 30px',
                            color: 'white',
                            textDecoration: 'none',
                            display: 'inline-block'
                        }}>
                            Log In to Get Started
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="calendar-container">
            <Navbar />
            <div className="calendar-content-wrapper">
                <div className={`calendar-layout ${viewMode}`}>
                    <div className={`calendar-sidebar ${viewMode === 'year' ? 'hidden' : ''}`}>
                        {renderSidebar()}
                    </div>
                    <div className="calendar-main">
                        {viewMode === 'year' && renderYearView()}
                        {viewMode === 'month' && renderMonthView()}
                        {viewMode === 'day' && renderDayView()}
                    </div>
                </div>
            </div>
            <EventModal
                show={showModal}
                onHide={() => setShowModal(false)}
                onSave={saveEvent}
                selectedDate={selectedDate ? `${monthNames[month]} ${selectedDate}, ${year}` : ''}
                initialStartTime={modalInitialTimes.start}
                initialEndTime={modalInitialTimes.end}
                initialDescription={modalInitialTimes.description}
                onDelete={editingEventIndex !== null ? () => deleteEvent(selectedDate, editingEventIndex) : null}
            />
        </div>
    );
}
