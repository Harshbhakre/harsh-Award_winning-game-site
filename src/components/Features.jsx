import React, { Children, useRef, useState } from 'react'
import { TiLocationArrow } from 'react-icons/ti'

const Bentotilt= ({children,className = ''})=>{
    const [transformStyle, setTransformStyle] = useState('')
    const itemRef = useRef()
   
    const handleMouseMove= (e)=>{
        if(!itemRef.current) return;

        const{left, top, width, height} = itemRef.current.getBoundingClientRect()
        const relativeX = (e.clientX-left)/width
        const relativeY = (e.clientY-left)/width

        const tiltX = (relativeY-0.5)*5
        const tiltY = (relativeX-0.5)*5
        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.95, 0.95, 0.95)`
        setTransformStyle(newTransform)
    }

    const handleMouseLeave= (e)=>{
        setTransformStyle('')
    }


    
    return(
        <div className={className} ref={itemRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} 
        style={{transform: transformStyle}} >
            {children} 
        </div>
    )
 }
 




const BentoCards = ({src, title, description}) => {
 
    return (
      <div className='relative size-full cursor-pointer'>
          <video src={src} 
          loop
          muted
          autoPlay 
          className='absolute left-0 top-0 size-full object-cover object-center'/>
          <div className='relative z-10 flex size-full flex-col justify-between p-5 text-blue-50'>
            <div>
                <h1 className='bento-title special-font'>{title}</h1>
                {description && (
                    <p className='mt-3 max-w-64 text-xs md:text-base'>{description}</p>
                )}
            </div>
           
          </div>
      </div>
    )
  }

const Features = () => {
  return (
    <section className='bg-black pb-52 mt-[-1px]'>
        <div className='container mx-auto px-3 mg:px-10'>
            <div className='px-5 py-32'>
                <p className='font-[circular-web] text-lg text-blue-50'>
                <b>Dive into the Zentry Universe</b>
                </p>
            
            <p className='max-w-md font-[circular-web] text-lg text-blue-50 opacity-50'>Immerse yourself in a rich and ever-expanding 
             ecosystem where a vibrant array of products converge
            into an interconnected universe.</p>
            </div>
       
       <Bentotilt className='border-hsla relative mb-7 h-96 w-full rounded-md md:h-[65vh] overflow-hidden'>
        <BentoCards 
        src='/videos/feature-1.mp4'
        title={<>radia<b>n</b>t</>}
        description={'A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure.'}/>
       </Bentotilt> 
       <div className='grid h-[135vh] grid-cols-2 grid-rows-3 gap-7'>
        <Bentotilt className='bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2 '>
            <BentoCards
            src="/videos/feature-2.mp4"
            title={<>Zig<b>m</b>a</>} 
            description="An anime and gaming-inspired NFT collection - the IP primed
            for expansion."/>
        </Bentotilt>
        <Bentotilt className='bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0'>
                <BentoCards
                 src="/videos/feature-3.mp4"
                 title={<>n<b>e</b>xus</>}
                 description="A gamified social hub, adding a new 
                 dimension of play to your identity, Web3 engagement and
                 socail interaction"/>
            </Bentotilt>
            <Bentotilt className='bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0'>
                <BentoCards
                 src="/videos/feature-4.mp4"
                 title={<>az<b>u</b>l</>}
                 description="A gamified social hub, adding a new dimension
                  of play to your identity, Web3 engagement and social interaction"/>
            </Bentotilt>
            <Bentotilt className='bento-tilt_2 mx-1'>
                <div className='flex size-full flex-col justify-between
                bg-[#5624fe] p-5'>
                    <h1 className='bento-title max-w-64 text-black'>M<b>o</b>re co<b>m</b>ing s<b>o</b>on!</h1>
                    <TiLocationArrow className='m-5 scale-[5] self-end' />
                </div>
            </Bentotilt>
            <Bentotilt className='bento-tile_2'>
                <video 
                src="/videos/feature-5.mp4"
                loop
                muted
                autoPlay 
                className='size-full object-cover object-center '/>
            </Bentotilt>
       </div>
       </div>  
    </section>
  )
}

export default Features
