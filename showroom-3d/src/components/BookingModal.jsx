import React, { useState } from 'react';
import { useApp } from '../store.jsx';
import './Booking.css';

export default function BookingModal() {
    const { showBookingModal, setShowBookingModal, addMessage, currentModel } = useApp();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [email, setEmail] = useState('');
    const [isBooked, setIsBooked] = useState(false);

    if (!showBookingModal) return null;

    const handleClose = () => {
        setShowBookingModal(false);
        setIsBooked(false);
        setSelectedDate(null);
        setSelectedTime(null);
        setEmail('');
    };

    const handleBook = () => {
        if (!selectedDate || !selectedTime || !email) return;
        setIsBooked(true);
    };

    const handleReturn = () => {
        handleClose();
        addMessage(`Excellent. Your appointment is confirmed for ${selectedDate} at ${selectedTime}. We look forward to welcoming you.`);
    };

    // Mock dates
    const dates = [
        { id: 1, day: 'Fri', number: '07' },
        { id: 2, day: 'Sat', number: '08' },
        { id: 3, day: 'Mon', number: '10' },
        { id: 4, day: 'Tue', number: '11' },
        { id: 5, day: 'Wed', number: '12' }
    ];

    // Mock times
    const timeSlots = [
        '09:00', '10:30', '11:00', '14:00', '15:30', '17:00'
    ];

    return (
        <div className="simulator-overlay">
            <div className="booking-modal-card">
                <button className="close-button" onClick={handleClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                {!isBooked ? (
                    <div className="booking-layout">
                        {/* LEFT SIDE: CONTEXT */}
                        <div className="booking-context">
                            <h2 className="context-title">Experience the {currentModel}</h2>
                            <p className="context-subtitle">
                                We have located a vehicle matching your exact configuration.
                            </p>

                            <div className="location-card">
                                <div className="location-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </div>
                                <div className="location-info">
                                    <span className="distance">642 Meters Away</span>
                                    <span className="address">Mercedes-Benz Flagship<br />Av. des Champs-Élysées</span>
                                </div>
                            </div>

                            <div className="context-footer">
                                <span className="invitation-text">
                                    Book a private demonstration to test drive this specific model logic.
                                </span>
                            </div>
                        </div>

                        {/* RIGHT SIDE: FORM */}
                        <div className="booking-form-section">
                            <div className="form-step">
                                <label className="step-label">1. Select Date</label>
                                <div className="dates-strip">
                                    {dates.map((date) => (
                                        <div
                                            key={date.id}
                                            className={`date-chip ${selectedDate === date.number ? 'selected' : ''}`}
                                            onClick={() => { setSelectedDate(date.number); setSelectedTime(null); }}
                                        >
                                            <span className="chip-day">{date.day}</span>
                                            <span className="chip-number">{date.number}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="form-step fade-in" style={{ opacity: selectedDate ? 1 : 0.3, pointerEvents: selectedDate ? 'auto' : 'none' }}>
                                <label className="step-label">2. Select Time</label>
                                <div className="time-grid">
                                    {timeSlots.map((time) => (
                                        <div
                                            key={time}
                                            className={`time-chip ${selectedTime === time ? 'selected' : ''}`}
                                            onClick={() => setSelectedTime(time)}
                                        >
                                            {time}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="form-step fade-in" style={{ opacity: selectedTime ? 1 : 0.3, pointerEvents: selectedTime ? 'auto' : 'none' }}>
                                <label className="step-label">3. Contact Info</label>
                                <input
                                    className="minimal-input"
                                    placeholder="email@address.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <button
                                className="action-button-large"
                                disabled={!selectedTime || !email}
                                onClick={handleBook}
                            >
                                Confirm Booking
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="success-view">
                        <div className="success-icon-large">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.5">
                                <path d="M20 6L9 17l-5-5" />
                            </svg>
                        </div>
                        <h2 className="success-title">Confirmed</h2>
                        <p className="success-desc">
                            Your appointment is set for <strong>February {selectedDate}</strong> at <strong>{selectedTime}</strong>.
                        </p>
                        <p className="success-subdesc">
                            A calendar invitation has been sent to {email}.
                        </p>
                        <button className="secondary-button" onClick={handleReturn}>
                            Return to Chat
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
