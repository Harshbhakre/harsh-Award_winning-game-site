import React, { useRef, useState } from 'react'
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";


const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1)
    const [hasClicked, setHasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [loadedvideos, setLoadedvideos] = useState(0)
    const totalVideos = 4;
    const upcomingvideoIndex = (currentIndex % totalVideos) +1
 
    const nextVideoRef = useRef(null)
    const handleMinivideoClick =()=>{

      setHasClicked(true)
      setCurrentIndex(upcomingvideoIndex)
    }

    //Gsap
    gsap.registerPlugin(ScrollTrigger);
    useGSAP(()=>{
      if(hasClicked){
        gsap.set('#next-video',{visibility:'visible'})
        gsap.to('#next-video',{
          
          transformOrigin:'center center',
          scale:1,
          width:'100%',
          height:'100%',
          duration:1,
          ease:'power1.inOut',
          onStart:()=>nextVideoRef.current.play(),
        })
        gsap.from('#current-video',{
          transformOrigin:'cennter center',
          scale:0,
          duration:1,
          ease:'power1.inOut'
        })
      
      }
     
    },{dependencies:[currentIndex], revertOnUpdate:true})

    useGSAP(()=>{
      gsap.set('#video-frame',{
        clipPath: 'polygon(20% 0%, 80% 0%, 90% 80%, 10% 90%)'
      })
      gsap.from('#video-frame',{
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        ease:'power1.inOut',
        scrollTrigger:{
          trigger:'#video-frame',
          start:'center center',
          end:'50%',
          scrub:2
        }
      })
    })

    const getVideoSrc = (index)=>{
        return `/videos/hero-${index}.mp4`
    }

   const handleVideoLoad= ()=>{

    setLoadedvideos((prev)=>prev++)
   }
  return (
    <>
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden
      rounded-lg bg-blue-75"
      >
        <div
          className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer
        overflow-hidden rounded-lg"
        >
          <div onClick={handleMinivideoClick} className='origin-center scale-50 opacity-0 transition-all
          duration-300 ease-in hover:scale-100 hover:opacity-100'>
            <video ref={nextVideoRef} src={getVideoSrc(upcomingvideoIndex)}
            loop muted id='current-video'
            className=' size-64 origin-center scale-150 object-cover object-center'
            onLoadedData={handleVideoLoad}></video>
            </div>
        </div>
        <video id='next-video' loop muted ref={nextVideoRef} src={getVideoSrc(currentIndex)}
        className='absolute-center invisible absolute z-20 size-64 object-cover object-center'></video>
        <video autoPlay  loop muted className=' absolute left-0 top-0 size-full object-cover object-center'
        onLoadedData={handleVideoLoad} src={getVideoSrc(currentIndex ===totalVideos-1?1:currentIndex)}></video>
           <div className='absolute left-0 right-0 z-40 size-full'>
        <div className='mt-24 px-5 sm:px-10'>
        <h1 className='special-font absolute bottom-5 !right-12 z-40 text-blue-75 hero-heading !text-[12vw]'>
        G<b>a</b>ming
      </h1>
          <h1 className='special-font hero-heading text-blue-75 !text-[12vw]'>redefi<b>n</b>e</h1>
          <p className='mb-5 max-w-64 font-robert-regular text-blue-100'>
            Enter the Metagame<br /> Unleash the Play Economy
          </p>
          <Button id="watch-trailer" title="Watch Trailer" leftIcon={<TiLocationArrow /> } 
          containerClass="bg-yellow-300 flex-center gap-1" />
        </div>
      </div>
      </div>
      <h1 className='special-font absolute bottom-5 text-black hero-heading !text-[12vw] !right-12'>
        G<b>a</b>ming
      </h1>
   
    </div>

    </>
  );
};

export default Hero;
