"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    Float,
    OrbitControls,
    Environment,
    ContactShadows,
    RoundedBox,
    useTexture,
    Text,
} from "@react-three/drei";
import * as THREE from "three";

/* -------------------- Shapes -------------------- */

function HeartShape({ color, ...props }: { color: string } & any) {
    const shape = useMemo(() => {
        const s = new THREE.Shape();
        s.moveTo(0.5, 0.5);
        s.bezierCurveTo(0.5, 0.5, 0.4, 0, 0, 0);
        s.bezierCurveTo(-0.6, 0, -0.6, 0.7, -0.6, 0.7);
        s.bezierCurveTo(-0.6, 1.1, -0.3, 1.54, 0.5, 1.9);
        s.bezierCurveTo(1.2, 1.54, 1.6, 1.1, 1.6, 0.7);
        s.bezierCurveTo(1.6, 0.7, 1.6, 0, 1.0, 0);
        s.bezierCurveTo(0.7, 0, 0.5, 0.5, 0.5, 0.5);
        return s;
    }, []);

    return (
        <mesh {...props} rotation={[0, 0, Math.PI]}>
            <extrudeGeometry
                args={[
                    shape,
                    {
                        depth: 0.2,
                        bevelEnabled: true,
                        bevelSize: 0.08,
                        bevelThickness: 0.08,
                        bevelSegments: 2,
                    },
                ]}
            />
            <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
        </mesh>
    );
}

function CloudComment({ color }: { color: string }) {
    return (
        <group scale={0.6}>
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.6, 24, 24]} />
                <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[0.4, 0.2, 0]}>
                <sphereGeometry args={[0.4, 24, 24]} />
                <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[-0.4, 0.1, 0]}>
                <sphereGeometry args={[0.35, 24, 24]} />
                <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[0.2, -0.4, 0]} rotation={[0, 0, -0.5]}>
                <coneGeometry args={[0.15, 0.5, 24]} />
                <meshStandardMaterial color={color} />
            </mesh>
        </group>
    );
}

function LikeIcon() {
  return (
    <Text
      fontSize={0.8}
      color="#FFD700"
      anchorX="center"
      anchorY="middle"
    >
      👍
    </Text>
  );
}

function LaughingIcon() {
  return (
    <Text
      fontSize={0.8}
      color="#FFD700"
      anchorX="center"
      anchorY="middle"
    >
      😂
    </Text>
  );
}

/* -------------------- Floating Icons -------------------- */

function FloatingIcons() {
    const group = useRef<THREE.Group>(null);

    const icons = useMemo(
        () =>
            new Array(12).fill(0).map((_, i) => ({
                type: i % 4,
                speed: 0.4 + Math.random() * 0.4,
                offset: Math.random() * 10,
                x: (Math.random() - 0.5) * 4,
                z: (Math.random() - 0.5) * 2,
                scale: 0.4 + Math.random() * 0.3,
                color:
                    i % 4 === 0
                        ? "#ef4444" // Red Heart
                        : i % 4 === 1
                            ? "#ffffff" // White Cloud Comment
                            : i % 4 === 2
                                ? "#3b82f6" // Blue Like (handled by Text)
                                : "#f59e0b", // Yellow Laugh (handled by Text)
            })),
        []
    );

    useFrame(({ clock }) => {
        if (!group.current) return;
        const t = clock.getElapsedTime();

        group.current.children.forEach((child, i) => {
            const icon = icons[i];
            const y = ((t * icon.speed + icon.offset) % 5) - 1;

            child.position.set(
                icon.x + Math.sin(t + icon.offset) * 0.2,
                y,
                icon.z
            );

            const s = Math.sin(((y + 1) / 5) * Math.PI);
            child.scale.setScalar(icon.scale * s);

            child.rotation.x = Math.sin(t * 0.5) * 0.5;
            child.rotation.y = Math.cos(t * 0.3) * 0.5;
        });
    });

    return (
        <group ref={group}>
            {icons.map((icon, i) => (
                <group key={i}>
                    {icon.type === 0 && <HeartShape color={icon.color} scale={0.5} />}
                    {icon.type === 1 && <CloudComment color={icon.color} />}
                    {icon.type === 2 && <LikeIcon />}
                    {icon.type === 3 && <LaughingIcon />}
                </group>
            ))}
        </group>
    );
}

/* -------------------- Smartphone -------------------- */

function Smartphone() {
    const texture = useTexture("/social_image.jpg");
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.flipY = false;

    return (
        <group>
            {/* Phone body */}
            <RoundedBox args={[3, 6, 0.3]} radius={0.15} smoothness={4}>
                <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.25} />
            </RoundedBox>

            {/* Screen (CRYSTAL CLEAR) */}
            <mesh position={[0, 0, 0.16]}>
                <planeGeometry args={[2.7, 5.7]} />
                <meshBasicMaterial map={texture} toneMapped={false} />
            </mesh>

            {/* Subtle glass reflection (optional but clean) */}
            <mesh position={[0, 0, 0.18]}>
                <planeGeometry args={[2.8, 5.8]} />
                <meshPhysicalMaterial
                    transparent
                    opacity={0.03}
                    roughness={0.05}
                    clearcoat={1}
                    toneMapped={false}
                />
            </mesh>

            {/* Camera notch */}
            {/* <mesh position={[0, 2.7, 0.19]}>
        <capsuleGeometry args={[0.08, 0.4, 4, 8]} />
        <meshBasicMaterial color="#000000" />
      </mesh> */}
        </group>
    );
}

/* -------------------- Model -------------------- */

function Model() {
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group rotation={[0, -0.2, 0]}>
                <Smartphone />
            </group>
            <group position={[0, 0, 0.6]} rotation={[0, -0.2, 0]}>
                <FloatingIcons />
            </group>
        </Float>
    );
}

/* -------------------- Scene -------------------- */

export default function Scene3D() {
    return (
        <div className="w-full h-[500px] flex items-center justify-center">
            <Canvas camera={{ position: [0, 0, 9], fov: 40 }}>
                <ambientLight intensity={0.6} />
                <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={2} />
                <pointLight position={[-10, 0, 10]} intensity={2} />

                <Model />

                <ContactShadows
                    position={[0, -3.5, 0]}
                    opacity={0.6}
                    scale={10}
                    blur={2}
                    far={4}
                />
                <Environment preset="city" />
                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
        </div>
    );
}
