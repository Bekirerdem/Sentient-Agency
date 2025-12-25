import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, MeshDistortMaterial, Sphere } from '@react-three/drei';

const LiquidMetal = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;

    // Simple scroll parallax simulation via manual scroll check if not passed explicitly
    // This keeps it self-contained for now without complex prop drilling
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const progress = Math.min(scrollY / viewportHeight, 1);
    
    // Move slightly right and fade scale/opacity based on scroll
    meshRef.current.position.x = progress * 2; // Move right
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.2}>
      <MeshDistortMaterial 
        color="#1a1a1a"
        envMapIntensity={1} 
        clearcoat={1} 
        clearcoatRoughness={0.1} 
        metalness={0.9} 
        roughness={0.1}
        distort={0.4} 
        speed={2} 
      />
    </Sphere>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#CCFF00" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#8F00FF" />
      <LiquidMetal />
      <Environment preset="city" />
    </>
  );
};

export default Scene;
