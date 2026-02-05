import React, { useRef } from 'react';
import { CameraControls } from '@react-three/drei';
import { useApp, CAMERA_PRESETS, INTERIOR_PRESETS } from '../store.jsx';

// Component to handle camera transitions based on state
export default function SceneController() {
    const { currentPreset, currentModel } = useApp();
    const controlsRef = useRef();

    React.useEffect(() => {
        if (controlsRef.current) {
            let preset;


            // Use model-specific interior preset for DRIVER view
            if (currentPreset === 'DRIVER') {
                preset = INTERIOR_PRESETS[currentModel] || INTERIOR_PRESETS.EQS;

            } else {
                preset = CAMERA_PRESETS[currentPreset];

            }

            if (preset) {
                const { position, target } = preset;

                controlsRef.current.setLookAt(
                    position[0], position[1], position[2],
                    target[0], target[1], target[2],
                    true // enable transition
                );
            }
        }
    }, [currentPreset, currentModel]);

    return (
        <CameraControls
            ref={controlsRef}
            minDistance={0.5}
            maxDistance={15}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.1} // Prevent going below ground
        />
    );
}
