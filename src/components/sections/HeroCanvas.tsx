import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

function ClaritySculpture({ dark }: { dark: boolean }) {
  const materialProps = useMemo(
    () => ({
      backside: true,
      samples: 6,
      resolution: 256,
      transmission: dark ? 0.92 : 0.96,
      roughness: 0.18,
      thickness: 1.4,
      ior: 1.4,
      chromaticAberration: 0.04,
      anisotropy: 0.2,
      distortion: 0.15,
      distortionScale: 0.3,
      temporalDistortion: 0.1,
      color: dark ? "#8eb6ff" : "#d7e6ff",
      attenuationColor: dark ? "#1e3a5f" : "#9db7d9",
      attenuationDistance: 1.2,
    }),
    [dark],
  );

  return (
    <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.55}>
      <mesh rotation={[0.4, 0.6, 0.2]} scale={1.55}>
        <torusKnotGeometry args={[0.72, 0.24, 180, 28]} />
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
      <mesh position={[1.35, 0.55, 0.35]} scale={0.28}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#2f6fed"
          roughness={0.25}
          metalness={0.35}
          emissive="#2f6fed"
          emissiveIntensity={dark ? 0.35 : 0.15}
        />
      </mesh>
      <mesh position={[-1.2, -0.55, 0.45]} scale={0.18}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#0b1f3a" roughness={0.35} metalness={0.2} />
      </mesh>
    </Float>
  );
}

export function HeroCanvas({ dark }: { dark: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0.15, 4.4], fov: 38 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor(new THREE.Color(0x000000), 0);
        scene.background = null;
      }}
    >
      <ambientLight intensity={dark ? 0.55 : 0.9} />
      <directionalLight position={[5, 4, 3]} intensity={dark ? 1.15 : 1.35} />
      <directionalLight position={[-3, -1, -2]} intensity={0.35} color="#9db7d9" />
      <ClaritySculpture dark={dark} />
      <ContactShadows
        position={[0, -1.55, 0]}
        opacity={dark ? 0.45 : 0.28}
        scale={12}
        blur={2.6}
        far={4}
      />
      <Environment preset="city" />
    </Canvas>
  );
}
