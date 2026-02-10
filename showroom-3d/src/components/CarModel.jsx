import React, { useRef } from 'react';
import { useGLTF, Center } from '@react-three/drei';
import { useApp } from '../store.jsx';

// Car Model Component
export default function CarModel() {
    const groupRef = useRef();
    const { currentModel } = useApp();

    // Determine path based on state
    const modelPath = currentModel === 'EQS'
        ? '/models/eqs/scene.gltf'
        : '/models/eqe/scene.gltf';

    const { scene } = useGLTF(modelPath);
    const { carColor } = useApp();

    // Store original logo colors
    const logoColorsRef = React.useRef(new Map());

    React.useEffect(() => {


        // First pass: Store original colors of logo materials

        scene.traverse((child) => {
            if (child.isMesh && child.material) {
                const matName = child.material.name.toLowerCase();

                // Store original colors for logo materials
                if (matName.includes('frontst') || matName.includes('rearst') ||
                    matName.includes('logo') || matName.includes('star') ||
                    matName.includes('stern') || matName.includes('emblem') ||
                    matName.includes('badge') || matName.includes('mercedes')) {

                    if (!logoColorsRef.current.has(child.material.name)) {
                        const originalColor = child.material.color.clone();
                        logoColorsRef.current.set(child.material.name, originalColor);

                    }
                }
            }
        });



        // Second pass: Apply color changes


        scene.traverse((child) => {
            if (child.isMesh && child.material) {
                const matName = child.material.name.toLowerCase();
                const objName = child.name.toLowerCase();

                // EXCLUSION: Skip badges, logos, and chrome trim
                if (matName.includes('frontst') || matName.includes('rearst') ||
                    matName.includes('logo') || objName.includes('logo') ||
                    matName.includes('star') || objName.includes('star') ||
                    matName.includes('stern') || objName.includes('stern') ||
                    matName.includes('emblem') || objName.includes('emblem') ||
                    matName.includes('badge') || objName.includes('badge') ||
                    matName.includes('mercedes') || objName.includes('mercedes') ||
                    matName.includes('chrome') || matName.includes('glass')) {



                    // Restore original color if we have it stored
                    const originalColor = logoColorsRef.current.get(child.material.name);
                    if (originalColor) {
                        child.material.color.copy(originalColor);

                    }
                    return;
                }

                if (matName.includes('paint') ||
                    matName.includes('body') ||
                    matName.includes('lacquer') ||
                    matName.includes('coating') ||
                    matName.includes('ext_') ||
                    matName.includes('kapot') ||
                    matName.includes('boot') ||
                    matName.includes('door') ||
                    matName.includes('bump') ||
                    objName.includes('body') ||
                    objName.includes('shell') ||
                    objName.includes('door') ||
                    objName.includes('bumper')) {


                    child.material.color.set(carColor);
                }
            }
        });


    }, [scene, carColor, currentModel]);

    // If EQS, we use Center. If EQE (or others), we display directly.
    const ModelContent = () => (
        <primitive
            key={modelPath}
            object={scene}
            scale={currentModel === 'EQS' ? 0.32 : 0.7}
            rotation={[0, currentModel === 'EQS' ? -Math.PI / 2 : Math.PI / 2, 0]}
        />
    );

    return (
        <group ref={groupRef} position={[0, 0, 0]} dispose={null}>
            {currentModel === 'EQS' ? (
                <Center key="eqs-center" top>
                    <ModelContent />
                </Center>
            ) : (
                <Center key="eqe-center" top>
                    <ModelContent />
                </Center>
            )}
        </group>
    );
}

// Preload the models
useGLTF.preload('/models/eqs/scene.gltf');
useGLTF.preload('/models/eqe/scene.gltf');
