import React, { useState } from 'react';
import { useApp } from '../store.jsx';

export default function SimulatorModal() {
    const { showSimulator, setShowSimulator } = useApp();
    const [step, setStep] = useState('INPUT'); // INPUT | CALCULATING | RESULTS
    const [formData, setFormData] = useState({
        start: '',
        destination: '',
        time: '08:00'
    });

    if (!showSimulator) return null;

    const handleCalculate = () => {
        if (!formData.start || !formData.destination) return;
        setStep('CALCULATING');
        setTimeout(() => {
            setStep('RESULTS');
        }, 2000);
    };

    const handleClose = () => {
        setShowSimulator(false);
        setStep('INPUT');
        setFormData({ start: '', destination: '', time: '08:00' });
    };

    return (
        <div className="simulator-overlay">
            <div className="simulator-card">
                <button className="close-button" onClick={handleClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                {step === 'INPUT' && (
                    <div className="simulator-content">
                        <div className="input-layout">
                            {/* Visual removed as per user request to maximize space */}

                            <div className="sim-form">
                                <div className="sim-header">
                                    <h2 className="sim-title">Lifestyle Simulator</h2>
                                    <p className="sim-subtitle">Commute Analysis</p>
                                </div>

                                <div className="form-group">
                                    <label>Start Location</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Home Address"
                                        value={formData.start}
                                        onChange={(e) => setFormData({ ...formData, start: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Destination</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Workplace"
                                        value={formData.destination}
                                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Time of Departure</label>
                                    <input
                                        type="time"
                                        value={formData.time}
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                    />
                                </div>

                                <button className="sim-button primary" onClick={handleCalculate}>
                                    ANALYZE ROUTE
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {step === 'CALCULATING' && (
                    <div className="simulator-content center-content">
                        <div className="sim-loader"></div>
                        <p className="sim-status">Analyzing Topography</p>
                        <p className="sim-substatus">Calculatin Energy Consumption...</p>
                    </div>
                )}

                {step === 'RESULTS' && (
                    <div className="simulator-content">
                        <div className="results-dashboard">
                            <div className="sim-map-container">
                                {/* Top Bar Overlay */}
                                <div style={{ position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(0,0,0,0.5)', padding: '8px 16px', borderRadius: 8, zIndex: 10 }}>
                                    <span style={{ color: '#d4af37', fontSize: '0.8rem', fontWeight: 700 }}>OPTIMAL ROUTE FOUND</span>
                                </div>

                                <svg viewBox="0 0 800 500" className="sim-map" preserveAspectRatio="xMidYMid slice">
                                    <rect width="800" height="500" fill="#111" />
                                    {/* Abstract City Grid */}
                                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                                    </pattern>
                                    <rect width="100%" height="100%" fill="url(#grid)" />

                                    {/* Route Line */}
                                    <path
                                        d="M100 420 C 180 420, 200 300, 250 300 C 350 300, 350 400, 450 350 C 580 280, 600 100, 700 170"
                                        fill="none"
                                        stroke="#d4af37"
                                        strokeWidth="4"
                                        className="route-path"
                                    />
                                    {/* Glow */}
                                    <path
                                        d="M100 420 C 180 420, 200 300, 250 300 C 350 300, 350 400, 450 350 C 580 280, 600 100, 700 170"
                                        fill="none"
                                        stroke="rgba(212, 175, 55, 0.4)"
                                        strokeWidth="12"
                                        filter="blur(4px)"
                                        className="route-path"
                                    />

                                    <circle cx="100" cy="420" r="6" fill="#fff" />
                                    <circle cx="700" cy="170" r="6" fill="#ffffffff" />
                                </svg>
                            </div>

                            <div className="sim-right-column">
                                <div className="stats-panel">
                                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 300, color: '#888' }}>Trip Analysis</h3>
                                    <div className="sim-stat-card">
                                        <span className="stat-label">Total Distance</span>
                                        <div>
                                            <span className="stat-value">42<span className="stat-unit">km</span></span>
                                        </div>
                                    </div>
                                    <div className="sim-stat-card">
                                        <span className="stat-label">Elevation Gain</span>
                                        <div>
                                            <span className="stat-value">+120<span className="stat-unit">m</span></span>
                                        </div>
                                    </div>
                                    <div className="sim-stat-card highlight">
                                        <span className="stat-label">Battery Remaining</span>
                                        <div className="battery-indicator">
                                            <div className="battery-level"></div>
                                            <span className="battery-text">78%</span>
                                        </div>
                                    </div>

                                    {/* Cost Comparison */}
                                    <div className="sim-stat-card comparison">
                                        <div className="comparison-header">
                                            <span className="stat-label">Estimated Cost</span>
                                            <span className="saving-badge">Save ~4€</span>
                                        </div>
                                        <div className="cost-bars">
                                            <div className="cost-row">
                                                <span className="cost-label">Electric</span>
                                                <div className="cost-bar-container">
                                                    <div className="cost-bar ev" style={{ width: '35%' }}></div>
                                                </div>
                                                <span className="cost-value">2.10€</span>
                                            </div>
                                            <div className="cost-row">
                                                <span className="cost-label">Gas</span>
                                                <div className="cost-bar-container">
                                                    <div className="cost-bar gas" style={{ width: '100%' }}></div>
                                                </div>
                                                <span className="cost-value">6.20€</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="conclusion-panel">
                                    <div className="dashboard-panel">
                                        <p className="sim-conclusion">
                                            <strong style={{ color: '#fff' }}>Excellent Result.</strong> Based on your {formData.time} departure, traffic flow is moderate. The EQS handles this trip efficiently, consuming only <strong style={{ color: '#d4af37' }}>8%</strong> of its total range.
                                        </p>
                                        <button className="sim-button secondary" onClick={() => setStep('INPUT')}>
                                            RUN ANOTHER SIMULATION
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
