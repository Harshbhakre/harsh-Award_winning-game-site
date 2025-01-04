import React from 'react'
import { FaDiscord, FaGithub, FaTwitch, FaTwitter } from 'react-icons/fa'

const links =[
  { herf: 'http://discord.com', icon: <FaDiscord />},
  { herf: 'http://twitter.com', icon: <FaTwitter />},
  { herf: 'http://github.com', icon: <FaGithub />},
  { herf: 'http://twitch.com', icon: <FaTwitch />},

]
const Footer = () => {
  return (
    <footer className='w-screen bg-[#5624fe] py-4 text-black'>
      <div className='conatainer mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row'>
        <p className='text-center text-sm md:text-left'>
          &copy; Nova 2024. All rights reserved
        </p>
        <div className='flex justify-center gap-4 md:justify-start'>
          {links.map((link,idx)=>(
            <a key={idx} href={link.href} target='_blank'
            rel='noopener noreferrer'
            className='text-black duration-500 cursor-pointer
            ease-in-out hover:text-white hover:scale-150 transition-all'>
              {link.icon}
            </a>
          ))}
        </div>
        <a href='#privacy-policy' className='text-center text-sm 
        hover:underline md:text-right pr-4'>Privacy Policy</a>
      </div>
      
    </footer>
  )
}

export default Footer
