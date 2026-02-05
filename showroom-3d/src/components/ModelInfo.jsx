import React from 'react';
import { useApp } from '../store.jsx';

export default function ModelInfo() {
    const { currentModel } = useApp();

    return (
        <div style={{
            position: 'absolute',
            top: '60px',
            left: '60px',
            zIndex: 100,
            color: '#fff',
            fontFamily: 'Outfit, sans-serif'
        }}>
            <h1 style={{
                fontSize: '2rem',
                fontWeight: '700',
                margin: 0,
                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
            }}>
                Mercedes-Benz {currentModel}
            </h1>
            <p style={{
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.7)',
                margin: '4px 0 0 0',
                letterSpacing: '1px'
            }}>
                Electric Vehicle Architecture
            </p>
        </div>
    );
}
