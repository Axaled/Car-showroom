import React, { Suspense } from 'react';
import { Environment, ContactShadows } from '@react-three/drei';
import SceneController from './SceneController.jsx';
import CarModel from './CarModel.jsx';
import ShowroomStage from './ShowroomStage.jsx';

// Main Scene Component in 3D
export default function Scene() {
    return (
        <Suspense fallback={null}>
            {/* The Stage handles the environment geometry */}
            <ShowroomStage />

            <CarModel />
            <SceneController />

            {/* Environment for reflections, but background is handled by Stage */}
            <Environment preset="city" />

            {/* Soft contact shadows for realism */}
            <ContactShadows
                resolution={1024}
                scale={10}
                blur={1}
                opacity={0.5}
                color="#000000"
            />
        </Suspense>
    );
}
