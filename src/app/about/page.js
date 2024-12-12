import React from 'react'
import Image from 'next/image'

const About = () => {
  return (
    <>
    <div className='bg-[url("/about.jpeg")] h-40 bg-center bg-cover  text-white font-bold grid place-content-center text-5xl border-b-2 border-yellow-400'>ABOUT US</div>
    <div className='p-20 bg-black text-yellow-700'>
    <h3 className='text-3xl font-bold p-5  text-yellow-400'>Our Story</h3>


    <div className='flex flex-row'>
    <div className='w-1/2'>
    <p className='p-5'>Street Pulse emerged from the vibrant energy of urban landscapes, where creativity, individuality, and self-expression collide. Born out of a desire to capture the heartbeat of street culture, the brand seamlessly blends fashion, art, and the raw spirit of the streets to create a unique identity.</p>
    <p className='px-5 pb-5'>Founded by a group of passionate designers and street enthusiasts, Street Pulse began as a small, underground project, fueled by the shared love for the eclectic styles and diverse influences found in urban environments. The founders aimed to break away from mainstream fashion norms and offer a platform for individuals who embrace authenticity and street authenticity.</p>
    <p className='px-5 pb-5'>Street Pulses design philosophy revolves around the concept of constant evolution. Inspired by the ever-changing dynamics of street culture, the brand introduces fresh, edgy designs that resonate with the pulse of the streets. From graphic tees that tell stories to cutting-edge accessories that redefine urban fashion, each piece is a statement of rebellion and individuality.</p>
    </div>
    <div>
        <div className='p-5 mx-40 border-2 border-yellow-400 rounded-lg'>
        <Image src={'/about-2.avif'} width={250} height={250} alt='about Image' />
        </div>
    </div>
    </div>


    <div className='flex flex-row pt-20'>
    <div className='p-5 mx-40 border-2 border-yellow-400 rounded-lg w-1/2'>
        <Image src={'/about-3.avif'} width={250} height={250} alt='about Image' />
        </div>
    
    <div>
        <h3 className='text-3xl font-bold p-5  text-yellow-400 '>VISION</h3>
        <p className='p-5 w-[80%]'>Street Pulse envisions a world where every individual feels empowered to walk their own path, unapologetically and confidently. We strive to be the pulse that resonates with those seeking authenticity, creativity, and a sense of belonging in the tapestry of street culture.</p>
        <p className='px-5 w-[80%]'>Through our designs, community engagement, and commitment to social responsibility, Street Pulse aims to be a global force that not only sets trends but also cultivates a movement where the streets are a source of inspiration, acceptance, and empowerment.</p>
        <p className='px-5 pt-5 w-[80%]'>Join us as we redefine the rhythm of the streets, one unique heartbeat at a time.</p>
    </div>
    </div>
    </div>

    </>

  )
}

export default About