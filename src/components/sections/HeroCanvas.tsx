import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

/** Lightweight wireframe — no Environment CDN / no transmission (those were blanking the stage). */
function WireframeCore({ dark }: { dark: boolean }) {
  const group = useRef<THREE.Group>(null);
  const accent = dark ? "#8eb6ff" : "#2f6fed";
  const ink = dark ? "#9db7d9" : "#0b1f3a";

  useFrame((state) => {
    if (!group.current) return;
    const x = state.pointer.x;
    const y = state.pointer.y;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.45 + state.clock.elapsedTime * 0.12, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.22, 0.05);
  });

  return (
    <group ref={group} position={[0.15, 0.1, 0]}>
      <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.35}>
        <mesh scale={1.35}>
          <torusKnotGeometry args={[0.7, 0.18, 128, 16]} />
          <meshBasicMaterial color={accent} wireframe transparent opacity={dark ? 0.55 : 0.42} />
        </mesh>
        <mesh scale={0.95} rotation={[0.6, 0.2, 0.4]}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={ink} wireframe transparent opacity={0.28} />
        </mesh>
      </Float>
    </group>
  );
}

export function HeroCanvas({ dark }: { dark: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0.1, 4.2], fov: 36 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor(new THREE.Color(0x000000), 0);
        scene.background = null;
      }}
      style={{ pointerEvents: "auto", touchAction: "none" }}
    >
      <ambientLight intensity={0.8} />
      <WireframeCore dark={dark} />
    </Canvas>
  );
}
