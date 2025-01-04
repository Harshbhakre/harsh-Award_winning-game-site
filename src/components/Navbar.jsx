import React, { useEffect, useRef, useState } from 'react'
import { TiLocationArrow } from "react-icons/ti";
import Button from './Button'
import { useWindowScroll } from 'react-use'
import gsap from 'gsap'

const navItems= ['Nexus', 'vault', 'Prologue',
    'About', 'Contact'
]
const Navbar = () => {
    const navContainerRef = useRef(null)
    const audioelementRef = useRef(null)
    const [isAudioPlaying, setIsAudioPlaying] = useState(false) 
    const [isIndicatorActive, setIsIndicatorActive] = useState(false) 
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isNavVisible, setIsNavVisible] = useState(true);


    const toggleAudioIndicatior =()=>{
        setIsAudioPlaying( (prev)=>!prev)
        setIsIndicatorActive((prev)=>!prev)
    }
    useEffect(() => {
      if(isAudioPlaying){
        audioelementRef.current.play()
      }
      else{
        audioelementRef.current.pause()
      } 
    }, [isAudioPlaying])
    
    const {y:currentScrollY} =useWindowScroll()

    useEffect(() => {
      if(currentScrollY ===0){
        setIsNavVisible(true)
        navContainerRef.current.classList.remove('floating-nav')
      } else if(currentScrollY > lastScrollY){
        setIsNavVisible(false)
        navContainerRef.current.classList.add('floating-nav')
      } else if( currentScrollY < lastScrollY){
        setIsNavVisible(true)
        navContainerRef.current.classList.add('floating-nav')
      }

      setLastScrollY(currentScrollY)
    }, [currentScrollY, lastScrollY ])
    
    useEffect(() => {
        gsap.to(navContainerRef.current,{
            y:isNavVisible?0:-100,
            opacity:isNavVisible?1:0,
            duration:0.1
        })
       
    }, [isNavVisible]);

  return (
    <div ref={navContainerRef} className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'>
      <header className='absolute top-1/2 w-full transition-all -translate-y-1/2'>
      <nav className='flex size-full items-center justify-between p-4'>
        <div className='flex items-cemter gap-7'>
            <img src="/img/Group 1.png" alt="logo" className='w-10'/>

            <Button id='product-button'
            title='Products'
            rightIcon={<TiLocationArrow />}
            containerClass="!bg-blue-50 md:flex hidden mt-3 items-center justify-center h-[2vw] w-[9vw]
            gap-1"/>
             <Button id='WhitePaper-button'
            title='WHITEPAPER'
            rightIcon={<TiLocationArrow />}
            containerClass="!bg-blue-50 md:flex hidden mt-3 items-center justify-center h-[2vw] w-[9vw]
            gap-1"/>

        </div>
        <div className='flex h-4 items-center'>
            <div className='hidden md:block'>
            {navItems.map((items,idx)=>(
                <a key={idx} className='nav-hover-btn' href={`#${items.toLowerCase() }`}>{items}</a>
            ))}
            </div>
            <button className='ml-10 flex items-center space-x-0.5 rounded-full ' onClick={toggleAudioIndicatior}>
                <audio src="/audio/loop.mp3" loop ref={audioelementRef} className='hidden' />
                {[1, 2, 3, 4].map((bar)=>(
                    <div key={bar} className={`indicator-line ${isIndicatorActive ?'active': ''}`} 
                    style={{animationDelay:`${bar * 0.1}s`}}/>
                ))}
                
            </button>
        </div>
      </nav> 
      </header>
    </div>
  )
}

export default Navbar
