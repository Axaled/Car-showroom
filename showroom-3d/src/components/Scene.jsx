import React, { Suspense } from 'react';
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei';
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

            <OrbitControls
                enablePan={false}
                minPolarAngle={0}
                maxPolarAngle={Math.PI / 2.2} // Limit camera to not go under the floor
            />

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
