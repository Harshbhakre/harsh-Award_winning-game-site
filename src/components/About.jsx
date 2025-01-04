import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import React, { useRef, useState } from 'react'
import AnimatedTitle from './AnimatedTitle'

const About = () => {
  const [transformStyle, setTransformStyle] = useState('')
  const itemRef = useRef()
  const handleMouseMove= (e)=>{
      if(!itemRef.current) return;

      const{left, top, width, height} = itemRef.current.getBoundingClientRect()
      const relativeX = (e.clientX-left)/width
      const relativeY = (e.clientY-left)/width

      const tiltX = (relativeY-0.5)*10
      const tiltY = (relativeX-0.5)*10
      const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.95, 0.95, 0.95)`
      setTransformStyle(newTransform)
  }

  const handleMouseLeave= (e)=>{
      setTransformStyle('')
  }

gsap.registerPlugin(ScrollTrigger)
  useGSAP(()=>{

    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 1,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });

    clipAnimation.to('#stones',{
      scale:2,
      scrub:3
    })
  })

  return (
    <div id='about' className='min-h-screen w-screen relative ' >
      <div className='relative mb-8 mt-36 flex flex-col items-center gap-5'>
        <h2 className='font-general text-sm uppercase md:text-[10px]'>Welcome to zentry</h2>
       <AnimatedTitle title="Disc<b>o</b>ver the world's <br />
    largest shared <b>a</b>dventure" containerClass="mt-5 !text-black text center" />
        <div className='about-subtext'>
            <p>the Game of Games begins-your life, now an epic MMORPG</p>
           <p> zentry unites every player from countless games and platforms</p>
        </div>
      </div>
      <div className='h-dvh w-screen ' id='clip'>
      <div className="mask-clip-path about-image !rounded-none ">
          <img 
            src="img/about.webp"  
            alt="Background"
            className="absolute left-0 md:top-0 -top-[4] size-full object-cover duration-100  
            "
          />
        </div>
        <div className='absolute top-[1vw] z-[110]' id='stones'  ref={itemRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} >
        <img src="/img/stones.webp" style={{transform: transformStyle}} />
      </div>
      </div>
     
    </div>
  )
}

export default About
