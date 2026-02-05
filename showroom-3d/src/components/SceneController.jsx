import React, { useRef } from 'react';
import { CameraControls } from '@react-three/drei';
import { useApp, CAMERA_PRESETS } from '../store.jsx';

// Component to handle camera transitions based on state
export default function SceneController() {
    const { currentPreset } = useApp();
    const controlsRef = useRef();

    React.useEffect(() => {
        if (controlsRef.current && CAMERA_PRESETS[currentPreset]) {
            const { position, target } = CAMERA_PRESETS[currentPreset];
            controlsRef.current.setLookAt(
                position[0], position[1], position[2],
                target[0], target[1], target[2],
                true // enable transition
            );
        }
    }, [currentPreset]);

    return (
        <CameraControls
            ref={controlsRef}
            minDistance={2}
            maxDistance={15}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.1} // Prevent going below ground
        />
    );
}
