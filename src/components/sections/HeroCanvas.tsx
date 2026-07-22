import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";

function ClarityField({ dark }: { dark: boolean }) {
  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.6}>
      <Sphere args={[1.35, 64, 64]} scale={1.35}>
        <MeshDistortMaterial
          color={dark ? "#1e3a5f" : "#9db7d9"}
          attach="material"
          distort={0.35}
          speed={1.6}
          roughness={0.28}
          metalness={0.2}
        />
      </Sphere>
      <Sphere args={[0.45, 32, 32]} position={[1.4, 0.5, 0.6]}>
        <meshStandardMaterial color="#2f6fed" roughness={0.35} metalness={0.15} />
      </Sphere>
      <Sphere args={[0.28, 32, 32]} position={[-1.2, -0.4, 0.8]}>
        <meshStandardMaterial color="#0b1f3a" roughness={0.4} metalness={0.1} />
      </Sphere>
    </Float>
  );
}

export function HeroCanvas({ dark }: { dark: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }} dpr={[1, 1.5]}>
      <ambientLight intensity={dark ? 0.45 : 0.75} />
      <directionalLight position={[4, 3, 2]} intensity={1.1} />
      <ClarityField dark={dark} />
    </Canvas>
  );
}
