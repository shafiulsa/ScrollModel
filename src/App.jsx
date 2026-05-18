
import { useEffect, useRef, Suspense, useState } from "react";
import "./App.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./components/Scene";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

function App() {
  const mainRef = useRef(null);
  const sceneRef = useRef(null);
  const[progress,setProgress]=useState(0);

  useEffect(() => {
  // Set initial position
  // gsap.set(sceneRef.current, {
  //   xPercent: 0,
  //   yPercent: 0,
  // });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: mainRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        setProgress(self.progress);
        // console.log(progress)
      } 
    },
  });

  // Move to section 2
  tl.to(sceneRef.current, {
    xPercent: -25,
    // ease: "none",
  })

    // Move to section 3
    .to(sceneRef.current, {
      xPercent: 25,
      ease: "none",
    })

    // Move to section 4
    .to(sceneRef.current, {
      xPercent: -25,
      ease: "none",
    });


}, []);


  return (
    <main ref={mainRef} className="overflow-x-hidden bg-black">
      <Suspense
        fallback={
          <div className="fixed inset-0 grid place-items-center bg-black text-white z-50">
            Loading...
          </div>
        }
      >
        {/* Fixed 3D Canvas - stays visible during all scroll sections */}
        <div
          ref={sceneRef}
          className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-10"
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <Scene progress={progress} />
          </Canvas>
        </div>

        {/* Hero Section */}
        <section className="relative grid place-items-center h-screen z-20">
          <p className="text-white text-center absolute top-[5%] mx-4 text-8xl font-bold">
            Apple Watch
          </p>
          <p className="text-white text-center absolute bottom-[5%] mx-4 text-8xl font-bold">
            Ultra 2
          </p>
        </section>

        {/* Section 2 */}
        <section className="relative flex items-center justify-evenly h-screen z-20">
          <div className="w-1/2"></div>
          <p className="text-white w-1/2 text-center px-4 text-4xl font-semibold">
            Effortlessly scroll, zoom, and navigate with the re-engineered
            Digital Crown, now more precise than ever.
          </p>
        </section>

        {/* Section 3 */}
        <section className="relative flex items-center justify-evenly h-screen z-20">
          <p className="text-white w-1/2 text-center px-4 text-4xl font-semibold">
            Built for adventure, the rugged straps are as tough as you are,
            ready for any challenge.
          </p>
          <div className="w-1/2"></div>
        </section>

        {/* Section 4 */}
        <section className="relative flex items-center justify-evenly h-screen z-20">
          <div className="w-1/2"></div>
          <p className="text-white w-1/2 text-center px-4 text-4xl font-semibold">
            The brightest display ever on an Apple Watch, so you can see it
            clearly even under the harshest sun.
          </p>
        </section>
      </Suspense>
    </main>
  );
}

export default App;
