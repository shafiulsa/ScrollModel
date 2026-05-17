import { Environment, OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React from 'react'
import { Watch } from './watch';
gsap.registerEffect(ScrollTrigger);



export const Scene = () => {
    return (
        <>
            <perspectiveCamera fov={45} near={-1} far={10000} makeDefault position={[0, 0, 5]} />

            <Environment preset='night' />
            <Watch />
            <axesHelper />
            <OrbitControls />
        </>
    )
}
