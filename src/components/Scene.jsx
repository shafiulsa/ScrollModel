import { Environment, OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React from 'react'
import { Watch } from './watch';
import { WatchModel } from './watchModel';
gsap.registerEffect(ScrollTrigger);



export const Scene = ({ modelRef }) => {
    return (
        <>
            <perspectiveCamera fov={45} near={.1} far={500} makeDefault position={[0, 10, 5]} />

            <Environment preset='night' />
            {/* <Watch /> */}
            {/* <WatchModel position={[0,-1,0]}/> */}
            <WatchModel  position={[0,-1.5,0]} modelRef={modelRef} />
            <axesHelper />
            <OrbitControls enableZoom={false} />
        </>
    )
}
