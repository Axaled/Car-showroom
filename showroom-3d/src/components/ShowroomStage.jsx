import React from 'react';
import { useTexture, MeshReflectorMaterial, Ring } from '@react-three/drei';
import * as THREE from 'three';

export default function ShowroomStage() {
    // Load marble texture
    const marbleMap = useTexture('/t_marble.png');
    marbleMap.wrapS = marbleMap.wrapT = THREE.RepeatWrapping;
    marbleMap.repeat.set(4, 4);

    return (
        <group>
            {/* Reflective Marble Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
                <circleGeometry args={[15, 64]} />
                <MeshReflectorMaterial
                    blur={[300, 100]}
                    resolution={2048}
                    mixBlur={1}
                    mixStrength={80}
                    roughness={0.2} // Glossy but slight roughness for realism
                    depthScale={1.2}
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.4}
                    color="#1a1a1a"
                    metalness={0.5}
                    map={marbleMap} // Apply generated texture
                />
            </mesh>

            {/* Gold Ring Platform */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <ringGeometry args={[3.8, 3.85, 64]} />
                <meshStandardMaterial
                    color="#d4af37"
                    metalness={1}
                    roughness={0.1}
                    emissive="#b8860b"
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Background Walls (Textured effect via geometry or simple dark cylinder) */}
            <mesh position={[0, 5, 0]}>
                <cylinderGeometry args={[14.5, 14.5, 10, 32, 1, true]} />
                <meshStandardMaterial
                    color="#050505"
                    side={THREE.BackSide}
                    metalness={0.2}
                    roughness={0.8}
                />
            </mesh>

            {/* Cinematic Lights */}
            <spotLight
                position={[5, 10, 5]}
                angle={0.5}
                penumbra={1}
                intensity={20}
                castShadow
                color="#ffffff"
            />
            <spotLight
                position={[-5, 10, -5]}
                angle={0.5}
                penumbra={1}
                intensity={10}
                color="#ffd700" // Warm gold fill
            />
        </group>
    );
}
