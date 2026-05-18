import { Environment, OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React from 'react'
import { Watch } from './watch';
import { WatchModel } from './watchModel';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useEffect } from 'react';
gsap.registerEffect(ScrollTrigger);



export const Scene = ({ modelRef, progress }) => {
    const cameraRef = useRef(null);
    const modelGroupRef = useRef(null);

    // Damping/inertia states for custom drag rotation
    const isDragging = useRef(false);
    const previousPointerPosition = useRef({ x: 0, y: 0 });
    const targetRotation = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handlePointerDown = (e) => {
            isDragging.current = true;
            previousPointerPosition.current = { x: e.clientX, y: e.clientY };
        };

        const handlePointerMove = (e) => {
            if (!isDragging.current) return;

            const deltaX = e.clientX - previousPointerPosition.current.x;
            const deltaY = e.clientY - previousPointerPosition.current.y;

            // Rotate Y based on horizontal drag, X based on vertical drag
            targetRotation.current.y += deltaX * 0.008;
            targetRotation.current.x += deltaY * 0.008;

            // Limit vertical rotation to prevent the watch from flipping completely upside down
            targetRotation.current.x = Math.max(-0.8, Math.min(0.8, targetRotation.current.x));

            previousPointerPosition.current = { x: e.clientX, y: e.clientY };
        };

        const handlePointerUp = () => {
            isDragging.current = false;
        };

        // Listen globally to capture drags anywhere on the screen
        window.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);

        return () => {
            window.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    }, []);

    useFrame(() => {
        if (modelGroupRef.current) {
            // Smoothly interpolate (lerp) the rotation for high-end inertia feedback
            modelGroupRef.current.rotation.y += (targetRotation.current.y - modelGroupRef.current.rotation.y) * 0.06;
            modelGroupRef.current.rotation.x += (targetRotation.current.x - modelGroupRef.current.rotation.x) * 0.06;
        }

        if (cameraRef.current) {
            // Keep the camera locked onto the watch's center coordinates
            cameraRef.current.lookAt(0, -1.5, 0);
        }
    });

    useEffect(() => {
        const updateCamPos = () => {
            const positions = [[3.5, 2.17, 3.7],
            [3.7, .6, .7],
            [2.3, .87, -4.2],
            [0, 2.5, 3.6]];

            if (progress >= 1) {
                gsap.to(cameraRef.current.position, {
                    x: 0,
                    y: 2.5,
                    z: 3.6,
                    duration: .5,
                    ease: 'power1.out'
                })
            }
            else {
                    const segmentProgress = 1 / 3;

            const segmentIndex = Math.floor(progress / segmentProgress);
            //   console.log(segmentIndex);
            const perentage = (progress % segmentProgress) / segmentProgress;
            //   console.log(perentage);
            const [startX, startY, startZ] = positions[segmentIndex];
            const [endX, endY, endZ] = positions[segmentIndex + 1];
            const x = startX + (endX - startX) * perentage;
            const y = startY + (endY - startY) * perentage;
            const z = startZ + (endZ - startZ) * perentage;
            // cameraRef.current.position.set(x, y, z);
            gsap.to(cameraRef.current.position, {
                x,
                y,
                z,
                duration: .5,
                ease: 'power1.out'
            })}
        };
        updateCamPos();
    }, [progress,cameraRef.current])

    return (
        <>

            <perspectiveCamera
                ref={cameraRef}
                fov={45}
                near={.1}
                far={500}
                makeDefault
                position={[3.5, 2.17, 3.7]} 
                //position={[3.7,0.6,0.7]}
                //position={[2.3,0.87,-4.3]}
                // position={[0, 2.5, 3.6]}

            />

            <Environment preset='night' />
            {/* <Watch /> */}
            {/* <WatchModel position={[0,-1,0]}/> */}
            
            {/* Group wrapper centered at the watch model's position to enable rotation about its own center */}
            <group ref={modelGroupRef} position={[0, -1.5, 0]}>
                <WatchModel position={[0, 0, 0]} modelRef={modelRef} />
            </group>
            
            {/* <axesHelper /> */}
        </>
    )
}
