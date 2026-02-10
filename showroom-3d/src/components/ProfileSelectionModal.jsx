import React, { useState } from 'react';
import { useApp } from '../store.jsx';
import './ProfileSelection.css';

export default function ProfileSelectionModal() {
    const { showProfileSelection, setShowProfileSelection, setSelectedProfile, addMessage, setCurrentModel } = useApp();
    const [selections, setSelections] = useState({
        price: 'standard',      // budget | standard | premium
        space: 'spacious',      // compact | spacious | maximum
        power: 'balanced',      // efficient | balanced | performance
        range: 'mixed',         // city | mixed | long-distance
        luxury: 'comfort'       // essential | comfort | ultimate
    });

    if (!showProfileSelection) return null;

    const criteria = {
        price: {
            label: 'Investment',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
            ),
            options: [
                { value: 'budget', label: 'Essential', desc: 'Core Efficiency' },
                { value: 'standard', label: 'Advanced', desc: 'Balanced Profile' },
                { value: 'premium', label: 'Pinnacle', desc: 'Ultimate Luxury' }
            ]
        },
        space: {
            label: 'Interior Volume',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M3 5h18v14H3zM3 12h18M12 5v14" />
                </svg>
            ),
            options: [
                { value: 'compact', label: 'Focused', desc: 'Driver Centric' },
                { value: 'spacious', label: 'Spacious', desc: 'First Class Travel' },
                { value: 'maximum', label: 'Executive', desc: 'Lounge Experience' }
            ]
        },
        power: {
            label: 'Performance',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
            ),
            options: [
                { value: 'efficient', label: 'Efficient', desc: 'Optimized Range' },
                { value: 'balanced', label: 'Dynamic', desc: 'Sport & Comfort' },
                { value: 'performance', label: 'AMG', desc: 'Race Engineering' }
            ]
        },
        range: {
            label: 'Range Capabilities',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                    <circle cx="12" cy="12" r="10" />
                </svg>
            ),
            options: [
                { value: 'city', label: 'Urban', desc: 'Daily Mobility' },
                { value: 'mixed', label: 'Versatile', desc: 'Mixed Usage' },
                { value: 'long-distance', label: 'Grand Tourer', desc: 'Long Distance' }
            ]
        },
        luxury: {
            label: 'Refinement',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            ),
            options: [
                { value: 'essential', label: 'Pure', desc: 'Mercedes Standard' },
                { value: 'comfort', label: 'Exclusive', desc: 'Enhanced Comfort' },
                { value: 'ultimate', label: 'Manufaktur', desc: 'Bespoke Quality' }
            ]
        }
    };

    const calculateRecommendation = () => {
        // Score-based recommendation
        let eqsScore = 0;
        let eqeScore = 0;

        // Price: Premium → EQS
        if (selections.price === 'premium') eqsScore += 2;
        else if (selections.price === 'standard') { eqsScore += 1; eqeScore += 1; }
        else eqeScore += 2;

        // Space: Maximum → EQS
        if (selections.space === 'maximum') eqsScore += 2;
        else if (selections.space === 'spacious') { eqsScore += 1; eqeScore += 1; }
        else eqeScore += 2;

        // Power: Performance → EQE AMG
        if (selections.power === 'performance') eqeScore += 2;
        else if (selections.power === 'balanced') { eqsScore += 1; eqeScore += 1; }
        else eqsScore += 1;

        // Range: Long-distance → EQS
        if (selections.range === 'long-distance') eqsScore += 2;
        else if (selections.range === 'mixed') { eqsScore += 1; eqeScore += 1; }
        else eqeScore += 1;

        // Luxury: Ultimate → EQS
        if (selections.luxury === 'ultimate') eqsScore += 2;
        else if (selections.luxury === 'comfort') { eqsScore += 1; eqeScore += 1; }
        else eqeScore += 1;

        return eqsScore >= eqeScore ? 'EQS' : 'EQE';
    };

    const handleConfirm = () => {
        const recommendation = calculateRecommendation();
        setSelectedProfile(selections);
        setShowProfileSelection(false);

        addMessage(`Given your refined preferences, the Mercedes-Benz ${recommendation === 'EQS' ? 'EQS Limousine' : 'EQE Sedan'} aligns perfectly with your lifestyle.`);
        setTimeout(() => {
            setCurrentModel(recommendation);
            addMessage(`Allow me to present the ${recommendation}. A masterpiece of electric intelligence.`);
        }, 1000);
    };

    const handleClose = () => {
        setShowProfileSelection(false);
    };

    return (
        <div className="simulator-overlay">
            <div className="profile-selection-card">
                <button className="close-button" onClick={handleClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                <div className="profile-content">
                    <div className="profile-header">
                        <h2 className="profile-title">Bespoke Configuration</h2>
                        <p className="profile-subtitle">Define your requirements for a tailored recommendation</p>
                    </div>

                    <div className="criteria-grid">
                        {Object.entries(criteria).map(([key, criterion]) => (
                            <div key={key} className="criterion-card">
                                <div className="criterion-header">
                                    <span className="criterion-icon">{criterion.icon}</span>
                                    <span className="criterion-label">{criterion.label}</span>
                                </div>
                                <div className="criterion-options">
                                    {criterion.options.map((option) => (
                                        <button
                                            key={option.value}
                                            className={`option-button ${selections[key] === option.value ? 'selected' : ''}`}
                                            onClick={() => setSelections({ ...selections, [key]: option.value })}
                                        >
                                            <div className="option-label">{option.label}</div>
                                            <div className="option-desc">{option.desc}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="profile-footer">
                    <div className="recommendation-preview">
                        <span className="preview-label">Current Match:</span>
                        <span className="preview-model">{calculateRecommendation()}</span>
                    </div>
                    <button className="confirm-button" onClick={handleConfirm}>
                        CONFIRM CONFIGURATION
                    </button>
                </div>
            </div>
        </div>
    );
}
