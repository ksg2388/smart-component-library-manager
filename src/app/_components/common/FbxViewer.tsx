"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useFBX, Environment } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";

interface FbxViewerProps {
  fbxUrl: string;
}

function FbxModel({ fbxUrl }: { fbxUrl: string }) {
  const modelRef = useRef<THREE.Group | null>(null);
  const fbx = useFBX(fbxUrl);

  useEffect(() => {
    if (!fbx) return;

    // 모델의 중심을 원점으로 이동
    fbx.position.set(0, 0, 0);

    // 모델 회전 - 기본 방향 설정
    fbx.rotation.set(
      -Math.PI / 2, // x축으로 -90도 회전
      0, // y축 회전 초기화
      0 // z축 회전 초기화
    );

    const scale = 0.01; // 뷰포트에 맞게 크기 조정
    fbx.scale.setScalar(scale);
  }, [fbx]);

  return <primitive ref={modelRef} object={fbx} />;
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#4a90e2" />
    </mesh>
  );
}

export default function FbxViewer({ fbxUrl }: FbxViewerProps) {
  const fullUrl = fbxUrl.startsWith("http")
    ? fbxUrl
    : `${process.env.NEXT_PUBLIC_API_URL}${fbxUrl}`;

  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{
          position: [3, 3, 3],
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
        className="w-full h-full"
        gl={{
          antialias: true,
          preserveDrawingBuffer: true,
          powerPreference: "high-performance",
          alpha: true,
          stencil: true,
          depth: true,
        }}
      >
        <color attach="background" args={["#ced4df"]} />

        <Suspense fallback={<LoadingFallback />}>
          <Stage
            environment="city"
            intensity={0.6}
            adjustCamera={false}
            shadows={{
              type: "accumulative",
              color: "#111827",
              colorBlend: 1,
              opacity: 0.3,
              blur: 2,
            }}
            preset="portrait"
          >
            <FbxModel fbxUrl={fullUrl} />
          </Stage>

          <Environment preset="city" background={false} blur={0.6} />

          <ambientLight intensity={0.6} color="#ffffff" />

          <directionalLight
            position={[5, 8, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0001}
            color="#ffffff"
          />

          <pointLight position={[-5, 2, -5]} intensity={0.4} color="#ffffff" />

          <pointLight position={[0, 0, 5]} intensity={0.3} color="#ffffff" />

          <OrbitControls
            makeDefault
            autoRotate={true}
            autoRotateSpeed={0.5}
            enableZoom={true}
            enablePan={true}
            minDistance={0.5}
            maxDistance={30}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            dampingFactor={0.05}
            enableDamping={true}
            target={[0, 0, 0]} // 카메라가 원점을 바라보도록 설정
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
