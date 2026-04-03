import React, { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import { MeshDistortMaterial } from "@react-three/drei";

function FloatingOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<any>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.08 + mouse.current.y * 0.15;
      meshRef.current.rotation.y = t * 0.12 + mouse.current.x * 0.15;
      meshRef.current.position.y = Math.sin(t * 0.3) * 0.1;
    }
    if (matRef.current) {
      matRef.current.distort = 0.2 + Math.sin(t * 0.4) * 0.08;
    }
  });

  return (
    <group position={[1.8, 0, 0]}>
      <Float speed={1} rotationIntensity={0.15} floatIntensity={0.4}>
        <mesh ref={meshRef} scale={2.5}>
          <icosahedronGeometry args={[1, 48]} />
          <MeshDistortMaterial
            ref={matRef}
            color="#0a0015"
            emissive="#3b0764"
            emissiveIntensity={0.6}
            roughness={0.1}
            metalness={0.95}
            distort={0.2}
            speed={1.5}
            envMapIntensity={2.5}
          />
        </mesh>

        <mesh scale={3.2} rotation={[Math.PI / 2.5, 0.3, 0]}>
          <torusGeometry args={[1, 0.003, 16, 100]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.2} />
        </mesh>
      </Float>
    </group>
  );
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 150;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
  }

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#c4b5fd"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
        powerPreference: "high-performance",
      }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
      }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <Environment preset="night" background={false} />
        <ambientLight intensity={0.1} />

        <spotLight
          position={[8, 8, 5]}
          angle={0.25}
          penumbra={1}
          intensity={2.5}
          color="#7c3aed"
        />
        <spotLight
          position={[-8, -5, -5]}
          angle={0.3}
          penumbra={1}
          intensity={1.5}
          color="#ec4899"
        />
        <pointLight position={[0, 0, 3]} intensity={0.3} color="#c4b5fd" />

        <FloatingOrb />
        <Particles />
      </Suspense>
    </Canvas>
  );
}
