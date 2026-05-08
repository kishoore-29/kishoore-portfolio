import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Network({ count = 140 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const lineRef = useRef<THREE.LineSegments>(null);

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      velocities[i * 3] = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    return { positions, velocities };
  }, [count]);

  const lineGeo = useMemo(() => new THREE.BufferGeometry(), []);
  const lineSegArray = useMemo(() => new Float32Array(count * count * 3), [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];
      if (Math.abs(arr[i * 3]) > 10) velocities[i * 3] *= -1;
      if (Math.abs(arr[i * 3 + 1]) > 6) velocities[i * 3 + 1] *= -1;
      if (Math.abs(arr[i * 3 + 2]) > 4) velocities[i * 3 + 2] *= -1;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = Math.sin(t * 0.05) * 0.15;

    // build lines
    let li = 0;
    const max = 1.6;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = arr[i * 3] - arr[j * 3];
        const dy = arr[i * 3 + 1] - arr[j * 3 + 1];
        const dz = arr[i * 3 + 2] - arr[j * 3 + 2];
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < max * max) {
          lineSegArray[li++] = arr[i * 3];
          lineSegArray[li++] = arr[i * 3 + 1];
          lineSegArray[li++] = arr[i * 3 + 2];
          lineSegArray[li++] = arr[j * 3];
          lineSegArray[li++] = arr[j * 3 + 1];
          lineSegArray[li++] = arr[j * 3 + 2];
        }
      }
    }
    lineGeo.setAttribute("position", new THREE.BufferAttribute(lineSegArray.slice(0, li), 3));
    lineGeo.setDrawRange(0, li / 3);
    lineGeo.attributes.position.needsUpdate = true;
  });

  return (
    <>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
        </bufferGeometry>
        <pointsMaterial size={0.06} color={new THREE.Color("#7df9ff")} transparent opacity={0.9} />
      </points>
      <lineSegments ref={lineRef} geometry={lineGeo}>
        <lineBasicMaterial color={new THREE.Color("#9d4dff")} transparent opacity={0.18} />
      </lineSegments>
    </>
  );
}

export default function ParticleField({ count = 120, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 9], fov: 60 }} gl={{ antialias: true, alpha: true }}>
        <Network count={count} />
      </Canvas>
    </div>
  );
}
