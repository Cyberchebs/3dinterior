import {Canvas,} from '@react-three/fiber';
import ModelDrink from './3dcomponents/Energy_drink_can_500ml_-_demon_juice';
import gsap from 'gsap';
import {useGSAP} from "@gsap/react"
import { Environment } from '@react-three/drei'
import {useRef} from 'react';
import { useMediaQuery } from 'react-responsive'
import ScrollTrigger from 'gsap/ScrollTrigger';
import Nutrients from './components/Nutrients';
import Chilled from './components/Chilled';
import { useTheme } from './context/3dcontext.jsx';
import Modelcube from './3dcomponents/Ice_cube_texture.jsx';
import '@fontsource/bebas-neue';
import Snow from './3dcomponents/Snow'
import { Suspense } from 'react'
import  Loader from "./components/Loader.jsx"
import { useState } from 'react';



gsap.registerPlugin( ScrollTrigger );



const App = () => {


   const [appLoaded, setAppLoaded] = useState(false)
  const { modelRef,isSection2Visible, setIsSection2Visible} = useTheme();
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
   const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  useGSAP(()=>{

    const rows = containerRef.current.querySelectorAll('.rb-row');

    rows.forEach((row, i) => {
      const main = row.querySelector('.rb-main');
      const divider = row.querySelector('.rb-divider');
      const sub = row.querySelector('.rb-sub');

      gsap.set(main, { x: -120, opacity: 0 });
      gsap.set(divider, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(sub, { opacity: 0, y: 6 });

      const tl = gsap.timeline({ delay: i * 0.35 });

      tl.to(main, {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
      })
      .to(divider, {
        scaleX: 1,
        duration: 0.3,
        ease: 'power2.out',
      }, '-=0.1')
      .to(sub, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      }, '-=0.1');
    });

  }, { scope: containerRef })


 useGSAP(() => {
  const interval = setInterval(() => {
    if (!modelRef.current) return  // not ready yet

    clearInterval(interval)  // model is ready, stop polling

    ScrollTrigger.refresh()

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: '#section2',  // don't forget the #
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
      }
    })

    tl2.to(modelRef.current.rotation, { y: 3.9, duration: 1, })
    tl2.to(modelRef.current.position,{z:isTabletOrMobile ? 20 : 30,y:-6,x:isTabletOrMobile ? 0.5 : 0, duration: 1,}, '<')
    tl2.from('#nuitrents', {opacity: 0, duration: 1 }, '1.3')
    tl2.from('#nuitrents', {x:-400, y: 50, duration: 1 }, '1.5')
    tl2.to('#nuitrents', { y:-300, duration:3}, '1.7')

     const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: '#section3',  // don't forget the #
        start: 'top bottom',
        end: 'top top',
        onEnter: () => setIsSection2Visible(true),
        onLeaveBack: () => setIsSection2Visible(false),
        scrub: 1,
      }
    })

    tl3.to(modelRef.current.rotation, { y: -0.2, z:isTabletOrMobile ? 7 : 5, duration: 1, })
    tl3.to(modelRef.current.position,{z:isTabletOrMobile ? -15 : 3,y:1, duration: 1,}, '<')
    tl3.to('#bg-overlay', { opacity: 1, duration: 1 }, '<')

  }, 100)

  return () => clearInterval(interval)  // cleanup
})

  return (
    <div style={{ overflow: appLoaded ? 'auto' : 'hidden' }}>
        <Loader onLoaded={() => setAppLoaded(true)} />
     <div ref={sectionRef} style={{
        width: '100%',
        height: '100dvh',}}>
          <div ref={containerRef} className="rb-container">
        <div className="rb-row">
          <span className="rb-main">RUN</span>
          <div>
            <div className="rb-divider" />
            <span className="rb-sub">move 100 miles per hour<br />every single day</span>
          </div>
        </div>

        <div className="rb-row">
          <span className="rb-main">Jump</span>
          <div>
            <div className="rb-divider" />
            <span className="rb-sub">Defy gravity<br />reach higher</span>
          </div>
        </div>

        <div className="rb-row">
          <span className="rb-main">Think</span>
          <div>
            <div className="rb-divider" />
            <span className="rb-sub">Sharpen your mind<br />stay ahead</span>
          </div>
        </div>
      </div>
      <div className="canvas-container">
      <Canvas 
        camera={{ position: [0, 0, 40], fov: 50 }}
        dpr={[1, isTabletOrMobile ? 1 : 1.5]}
        gl={{ powerPreference: 'high-performance', antialias: !isTabletOrMobile }}
      >

      
        <ambientLight intensity={6} />
        <ModelDrink ref={modelRef} position={[isTabletOrMobile ? 3: 0, 0, isTabletOrMobile ? -4 : 4]} scale={1} />
        <Environment preset="city" />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <pointLight position={[-5, -5, -5]} intensity={1} />

        
       {isSection2Visible && (
        <group  visible={isSection2Visible}>
          <ambientLight intensity={0.5} />
            <Snow count={80} />
          <Modelcube position={[isTabletOrMobile ? -6 : 25,isTabletOrMobile ? 11 : 5, 1]} scale={13} />
          <Modelcube position={[isTabletOrMobile ? -4 :-20,isTabletOrMobile ? -7 :-10,6]} scale={isTabletOrMobile ? 10 :15} />
          <Modelcube position={[isTabletOrMobile ? 7 :20, isTabletOrMobile ? -14:-10,6]} scale={20} />
          <Modelcube position={[-12,4,6]} scale={10} />
         </group>
        )}
      </Canvas>
      </div>
    </div>
    <Nutrients/>
    <Chilled/>
    </div>
  )
}

export default App