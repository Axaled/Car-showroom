import React, { createContext, useContext, useState, useCallback } from 'react';

// Camera Presets Definition
export const CAMERA_PRESETS = {
    DEFAULT: { position: [1.04, 1.66, 4.56], target: [0, 0, 0] },
    FRONT: { position: [0, 1.2, 8], target: [0, 0.5, 0] },
    SIDE: { position: [8, 1.2, 0], target: [0, 0.5, 0] },
    TOP: { position: [0, 12, 0], target: [0, 0, 0] },
    WHEEL: { position: [2.5, 0.8, 2.5], target: [0.8, 0.3, 1.3] },
    REAR: { position: [0, 1.2, -8], target: [0, 0.5, 0] },
    HEADLIGHTS: { position: [1.5, 0.8, 5], target: [0.5, 0.5, 3] },
    PERSPECTIVE: { position: [6, 4, 6], target: [0, 0, 0] },
};

// Model-specific interior camera presets (back seat looking forward)
export const INTERIOR_PRESETS = {
    EQS: { position: [-0.17, 1.61, -1.11], target: [0, 0.9, 1.5] },
    EQE: { position: [-0.02, 1.99, -1.01], target: [0, 0.8, 1.5] },
};

const AppContext = createContext();

export function AppProvider({ children }) {
    const [currentPreset, setCurrentPreset] = useState('DEFAULT');
    const [chatMessages, setChatMessages] = useState([
        { id: 1, text: "Welcome, you are looking at our latest model.", timestamp: new Date(Date.now() - 1000) },
        { id: 2, text: "I can help you select the model that suits you best. What do you think?", timestamp: new Date() }
    ]);
    const [currentModel, setCurrentModel] = useState('EQS'); // EQS or EQE
    const [carColor, setCarColor] = useState('#000000'); // Default to Black
    const [showSimulator, setShowSimulator] = useState(false);

    const addMessage = useCallback((text, isUser = false) => {
        setChatMessages(prev => [...prev, {
            id: Date.now(),
            text,
            timestamp: new Date(),
            isUser
        }]);
    }, []);

    const setCameraView = useCallback((presetName) => {
        // Accept DRIVER preset (handled via INTERIOR_PRESETS) or any preset in CAMERA_PRESETS
        if (presetName === 'DRIVER' || CAMERA_PRESETS[presetName]) {
            setCurrentPreset(presetName);
        }
    }, []);

    return (
        <AppContext.Provider value={{
            currentPreset,
            setCameraView,
            chatMessages,
            addMessage,
            presets: CAMERA_PRESETS,
            currentModel,
            setCurrentModel,
            carColor,
            setCarColor,
            showSimulator,
            setShowSimulator
        }}>
            {children}
        </AppContext.Provider>
    );
}

export const useApp = () => useContext(AppContext);
