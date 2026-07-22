import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Float, MeshTransmissionMaterial, Stars } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

function LocalEnvironment() {
  const { gl, scene } = useThree();

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    pmrem.compileEquirectangularShader();
    const envScene = new RoomEnvironment();
    const envMap = pmrem.fromScene(envScene as unknown as THREE.Scene, 0.04).texture;
    scene.environment = envMap;
    return () => {
      scene.environment = null;
      envMap.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);

  return null;
}

function GlassKnot() {
  const group = useRef<THREE.Group>(null);
  const materialProps = useMemo(
    () => ({
      backside: true,
      samples: 8,
      resolution: 384,
      transmission: 1,
      roughness: 0.12,
      thickness: 1.8,
      ior: 1.42,
      chromaticAberration: 0.06,
      anisotropy: 0.25,
      distortion: 0.22,
      distortionScale: 0.35,
      temporalDistortion: 0.14,
      color: "#6fd3c2",
      attenuationColor: "#0d3b36",
      attenuationDistance: 0.85,
    }),
    [],
  );

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const x = state.pointer.x;
    const y = state.pointer.y;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      t * 0.18 + x * 0.45,
      0.04,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.22 + 0.25, 0.04);
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, 0.55 + x * 0.15, 0.05);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, 0.1 + y * 0.08, 0.05);
  });

  return (
    <group ref={group}>
      <Float speed={1.05} rotationIntensity={0.28} floatIntensity={0.45}>
        <mesh scale={1.72}>
          <torusKnotGeometry args={[0.78, 0.26, 220, 36]} />
          <MeshTransmissionMaterial {...materialProps} />
        </mesh>
        <mesh position={[1.15, 0.65, 0.4]} scale={0.16}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#f0b35a"
            emissive="#f0b35a"
            emissiveIntensity={0.55}
            roughness={0.25}
            metalness={0.4}
          />
        </mesh>
        <mesh position={[-1.05, -0.55, 0.35]} scale={0.11}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#7ee0d0"
            emissive="#1a6b60"
            emissiveIntensity={0.35}
            roughness={0.3}
          />
        </mesh>
      </Float>
    </group>
  );
}

function GroundGlow() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.4, -1.55, 0]} receiveShadow>
      <circleGeometry args={[4.2, 64]} />
      <meshStandardMaterial
        color="#061018"
        metalness={0.85}
        roughness={0.25}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

export function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0.35, 5.1], fov: 36 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor(new THREE.Color("#050a10"), 0);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.15;
        scene.background = null;
      }}
      style={{ width: "100%", height: "100%", touchAction: "none" }}
    >
      <LocalEnvironment />
      <fog attach="fog" args={["#050a10", 7, 16]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4.5, 5.5, 2.5]} intensity={1.45} color="#dff7f2" />
      <directionalLight position={[-3, 1.5, -2]} intensity={0.55} color="#f0b35a" />
      <pointLight position={[1.2, 0.2, 2]} intensity={0.8} color="#6fd3c2" />
      <Stars radius={40} depth={30} count={1200} factor={2.2} saturation={0} fade speed={0.4} />
      <GlassKnot />
      <GroundGlow />
      <ContactShadows
        position={[0.4, -1.52, 0]}
        opacity={0.65}
        scale={14}
        blur={2.8}
        far={5}
        color="#02060a"
      />
    </Canvas>
  );
}
