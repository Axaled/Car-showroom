import React, { useState, useRef } from 'react';
import { useApp } from '../store.jsx';

// Chat UI Component
export default function ChatUI() {
    const { chatMessages, addMessage, setCameraView, setCurrentModel, currentModel, carColor, setCarColor, setShowSimulator } = useApp();
    const [inputValue, setInputValue] = useState('');
    const [awaitingSimulatorConfirmation, setAwaitingSimulatorConfirmation] = useState(false);
    const messagesEndRef = useRef(null);

    // Semantic Similarity Helper (Dice Coefficient)
    const calculateSimilarity = (str1, str2) => {
        const s1 = str1.toLowerCase();
        const s2 = str2.toLowerCase();

        if (s1 === s2) return 1;
        if (s1.length < 2 || s2.length < 2) return 0;

        const bigrams1 = new Map();
        for (let i = 0; i < s1.length - 1; i++) {
            const bigram = s1.substring(i, i + 2);
            bigrams1.set(bigram, (bigrams1.get(bigram) || 0) + 1);
        }

        let intersection = 0;
        for (let i = 0; i < s2.length - 1; i++) {
            const bigram = s2.substring(i, i + 2);
            if (bigrams1.get(bigram) > 0) {
                bigrams1.set(bigram, bigrams1.get(bigram) - 1);
                intersection++;
            }
        }

        return (2.0 * intersection) / (s1.length + s2.length - 2);
    };

    // Command Registry
    const COMMANDS = [
        { keywords: ['front', 'face', 'forward'], action: () => handleAction('FRONT', 'Front View'), label: 'Front View' },
        { keywords: ['side', 'profile', 'lateral'], action: () => handleAction('SIDE', 'Side View'), label: 'Side View' },
        { keywords: ['rear', 'back', 'behind'], action: () => handleAction('REAR', 'Rear View'), label: 'Rear View' },
        { keywords: ['inside', 'interior', 'cabin', 'cockpit', 'driver'], action: () => handleAction('DRIVER', 'Interior'), label: 'Interior' },
        { keywords: ['top', 'above', 'roof', 'bird'], action: () => handleAction('TOP', 'Top View'), label: 'Top View' },
        { keywords: ['wheel', 'rims', 'tires', 'tyres'], action: () => handleAction('WHEEL', 'Rims'), label: 'Rims' },
        { keywords: ['light', 'headlight', 'lamp'], action: () => handleAction('HEADLIGHTS', 'Headlights'), label: 'Headlights' },
        { keywords: ['eqs', 'limousine', 'luxury'], action: () => { setCurrentModel('EQS'); addMessage("Switching to EQS model."); }, label: 'EQS Model' },
        { keywords: ['eqe', 'sedan', 'sport'], action: () => { setCurrentModel('EQE'); addMessage("Switching to EQE model."); }, label: 'EQE Model' },
        { keywords: ['black', 'dark', 'night'], action: () => { setCarColor('#000000'); addMessage("Changing color to Black."); }, label: 'Black Paint' },
        { keywords: ['silver', 'grey', 'gray', 'metallic'], action: () => { setCarColor('#C0C0C0'); addMessage("Changing color to Silver."); }, label: 'Silver Paint' },
        { keywords: ['blue', 'navy', 'deep'], action: () => { setCarColor('#001e50'); addMessage("Changing color to Blue."); }, label: 'Blue Paint' },
        { keywords: ['red', 'crimson', 'scarlet'], action: () => { setCarColor('#960018'); addMessage("Changing color to Red."); }, label: 'Red Paint' },
        {
            keywords: ['sim', 'simulator', 'range', 'battery', 'charge'], action: () => {
                addMessage("That is understandable. We can simulate your daily commute to see how an EV fits your lifestyle. Sounds good?");
                setAwaitingSimulatorConfirmation(true);
            }, label: 'Simulator'
        }
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    const handleSend = () => {
        if (inputValue.trim() === '') return;

        // Add user message first
        const userText = inputValue;
        addMessage(userText, true);
        setInputValue('');

        // Validation Logic for Simulator
        if (awaitingSimulatorConfirmation) {
            const lowerText = userText.toLowerCase();
            if (lowerText.includes('yes') || lowerText.includes('sure') || lowerText.includes('ok') || lowerText.includes('sound') || lowerText.includes('good')) {
                addMessage("Great! Launching the simulator now...");
                setAwaitingSimulatorConfirmation(false);
                setTimeout(() => {
                    setShowSimulator(true);
                }, 1500);
            } else {
                addMessage("Understood. Let me know if you change your mind.");
                setAwaitingSimulatorConfirmation(false);
            }
            return;
        }

        // Semantic Command Matching
        let bestMatch = null;
        let highestScore = 0;

        COMMANDS.forEach(cmd => {
            cmd.keywords.forEach(keyword => {
                // Check whole word match or high similarity
                const score = calculateSimilarity(keyword, userText);
                // Boost score if the keyword is actually present as a word
                const wordPresent = userText.toLowerCase().includes(keyword);
                const finalScore = wordPresent ? 1 : score;

                if (finalScore > highestScore) {
                    highestScore = finalScore;
                    bestMatch = cmd;
                }
            });
        });

        if (bestMatch && highestScore > 0.6) {
            setTimeout(() => {
                bestMatch.action();
            }, 500);
            return;
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleAction = (viewName, label) => {
        setCameraView(viewName);
        addMessage(`I want to see the ${label.toLowerCase()}.`, true);
        setTimeout(() => {
            addMessage(`Here is the ${label.toLowerCase()}.`);
        }, 500);
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <div className="header-content">
                    {/* Mercedes Logo Image */}
                    <img
                        src="/assets/mercedes_logo.webp"
                        alt="Mercedes Logo"
                        width="32"
                        height="32"
                        style={{
                            filter: 'invert(1) drop-shadow(0 0 8px rgba(255,255,255,0.3))',
                            objectFit: 'contain'
                        }}
                    />
                    <div>
                        <h2 style={{ fontSize: '1.4rem', letterSpacing: '1px', textTransform: 'none' }}>Mercedes Benz Assistant</h2>
                        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                            <div className="status-indicator" style={{ width: '6px', height: '6px' }}></div>
                            <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '2px' }}>Online</span>
                        </div>
                    </div>
                </div>
                {/* Close button visualization to match image */}
                <div style={{ position: 'absolute', right: '20px', top: '24px', opacity: 0.5 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </div>
            </div>

            <div className="messages-container">
                {chatMessages.map((message, index) => (
                    <div
                        key={message.id}
                        className={`message-bubble ${message.isUser ? 'user-message' : ''}`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="message-content">{message.text}</div>
                        <div className="message-time">
                            {message.timestamp.toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="actions-wrapper">
                <button className="scroll-button" onClick={() => {
                    const container = document.querySelector('.actions-container');
                    if (container) container.scrollLeft -= 100;
                }}>
                    <div className="arrow-icon left"></div>
                </button>

                <div className="actions-container">
                    {/* Color Presets (Only if EQE or general) */}
                    <div style={{ display: 'flex', gap: '8px', paddingRight: '12px', borderRight: '1px solid rgba(255,255,255,0.1)', marginRight: '4px' }}>
                        {[
                            { color: '#000000', label: 'Black' },
                            { color: '#C0C0C0', label: 'Silver' }, // Silver
                            { color: '#001e50', label: 'Blue' },  // Deep Blue
                            { color: '#960018', label: 'Red' }, // Carmine Red
                        ].map((preset) => (
                            <button
                                key={preset.color}
                                className="action-chip"
                                style={{
                                    padding: '6px',
                                    minWidth: '32px',
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    background: preset.color,
                                    border: carColor === preset.color ? '2px solid #d4af37' : '1px solid rgba(255,255,255,0.2)',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                                }}
                                onClick={() => {
                                    addMessage(`I would like the color ${preset.label.toLowerCase()}.`, true);
                                    setTimeout(() => {
                                        setCarColor(preset.color);
                                        addMessage(`Here is the ${preset.label.toLowerCase()} version. Great choice.`);
                                    }, 500);
                                }}
                                title={preset.label}
                            />
                        ))}
                    </div>

                    <button className="action-chip" style={{ borderColor: currentModel === 'EQS' ? '#d4af37' : 'rgba(212, 175, 55, 0.3)', background: currentModel === 'EQS' ? 'rgba(212, 175, 55, 0.3)' : 'rgba(212, 175, 55, 0.1)' }} onClick={() => {
                        addMessage("I would like to see the EQS model.", true);
                        setTimeout(() => {
                            setCurrentModel('EQS');
                            addMessage("Here is the Mercedes-Benz EQS.");
                        }, 500);
                    }}>
                        EQS Model
                    </button>
                    <button className="action-chip" style={{ borderColor: currentModel === 'EQE' ? '#d4af37' : 'rgba(212, 175, 55, 0.3)', background: currentModel === 'EQE' ? 'rgba(212, 175, 55, 0.3)' : 'rgba(212, 175, 55, 0.1)' }} onClick={() => {
                        addMessage("I would like to see the EQE model.", true);
                        setTimeout(() => {
                            setCurrentModel('EQE');
                            addMessage("Here is the Mercedes-Benz EQE AMG.");
                        }, 500);
                    }}>
                        EQE Model
                    </button>
                    <button className="action-chip" style={{ borderColor: 'rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.05)' }} onClick={() => {
                        addMessage("I am hesitant about switching to electric.", true);
                        setTimeout(() => {
                            addMessage("That is understandable. We can simulate your daily commute to see how an EV fits your lifestyle. Sounds good?");
                            setAwaitingSimulatorConfirmation(true);
                        }, 500);
                    }}>
                        Hesitant about EV?
                    </button>
                    <button className="action-chip" onClick={() => handleAction('FRONT', 'Front View')}>
                        Front View
                    </button>
                    <button className="action-chip" onClick={() => handleAction('SIDE', 'Side View')}>
                        Side View
                    </button>
                    <button className="action-chip" onClick={() => handleAction('REAR', 'Rear View')}>
                        Rear View
                    </button>
                    <button className="action-chip" onClick={() => handleAction('PERSPECTIVE', 'Perspective')}>
                        Perspective
                    </button>
                    <button className="action-chip" onClick={() => handleAction('DRIVER', 'Interior')}>
                        Interior
                    </button>
                    <button className="action-chip" onClick={() => handleAction('TOP', 'Top View')}>
                        Top View
                    </button>
                    <button className="action-chip" onClick={() => handleAction('WHEEL', 'Rims')}>
                        Rims
                    </button>
                    <button className="action-chip" onClick={() => handleAction('HEADLIGHTS', 'Headlights')}>
                        Headlights
                    </button>
                </div>

                <button className="scroll-button" onClick={() => {
                    const container = document.querySelector('.actions-container');
                    if (container) container.scrollLeft += 100;
                }}>
                    <div className="arrow-icon right"></div>
                </button>
            </div>

            <div className="input-container">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask a question about the vehicle..."
                    className="chat-input"
                />
                <button
                    onClick={handleSend}
                    className="send-button"
                    disabled={inputValue.trim() === ''}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
