import React from 'react';
import Image from 'next/image';

// Metadata for SEO
export const metadata = {
  title: 'About Us - Street Pulse',
  description: 'Learn about Street Pulse, our story, and our vision. Discover how we blend fashion, art, and street culture to create unique urban styles.',
};

const About = () => {
  return (
    <>
      {/* Header Section */}
      <div className="relative h-32 sm:h-40 text-white font-bold grid place-content-center text-3xl sm:text-4xl md:text-5xl border-b-2 border-yellow-400">
        {/* Background Image */}
        <Image
          src="https://res.cloudinary.com/dm7ntehzl/image/upload/f_auto,q_auto/v1737648399/StreetPulse/HomepageImages%20and%20headers/about_gpetn6.jpg"
          alt="About Us Background"
          fill
          style={{ objectFit: 'cover', objectPosition: 'right' }}
          quality={75}
          priority 
          className="absolute inset-0 z-0"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-5"></div>
        {/* Content */}
        <div className="relative z-10">ABOUT US</div>
      </div>

      {/* Main Content */}
      <div className="p-6 sm:p-10 md:p-20 bg-black text-yellow-700">
        {/* Our Story Section */}
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold p-5 text-yellow-400">Our Story</h3>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Text Block 1 */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <p className="p-5 text-sm sm:text-base md:text-lg">
              Street Pulse emerged from the vibrant energy of urban landscapes, where creativity, individuality, and self-expression collide. Born out of a desire to capture the heartbeat of street culture, the brand seamlessly blends fashion, art, and the raw spirit of the streets to create a unique identity.
            </p>
            <p className="px-5 pb-5 text-sm sm:text-base md:text-lg">
              Founded by a group of passionate designers and street enthusiasts, Street Pulse began as a small, underground project, fueled by the shared love for the eclectic styles and diverse influences found in urban environments. The founders aimed to break away from mainstream fashion norms and offer a platform for individuals who embrace authenticity and street authenticity.
            </p>
            <p className="px-5 pb-5 text-sm sm:text-base md:text-lg">
              Street Pulses design philosophy revolves around the concept of constant evolution. Inspired by the ever-changing dynamics of street culture, the brand introduces fresh, edgy designs that resonate with the pulse of the streets. From graphic tees that tell stories to cutting-edge accessories that redefine urban fashion, each piece is a statement of rebellion and individuality.
            </p>
          </div>
          {/* Image Block 1 */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center items-center">
            <div className="p-5 border-2 border-yellow-400 rounded-lg">
              <Image
                src="https://res.cloudinary.com/dm7ntehzl/image/upload/v1737648399/StreetPulse/HomepageImages%20and%20headers/about-2_e9hugc.avif"
                alt="About Image"
                width={500}
                height={500}
                style={{ width: '100%', height: 'auto' }}
                sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
                className="rounded-lg"
                priority 
              />
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="flex flex-col lg:flex-row gap-6 pt-10 sm:pt-20">
          {/* Image Block 2 */}
          <div className="w-full lg:w-1/3 order-1 lg:order-1 flex justify-center items-center">
            <div className="p-5 border-2 border-yellow-400 rounded-lg w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px]">
              <Image
                src="https://res.cloudinary.com/dm7ntehzl/image/upload/v1737648401/StreetPulse/HomepageImages%20and%20headers/about-3_rdqxmh.avif"
                alt="About Image"
                width={500}
                height={500}
                style={{ width: '100%', height: 'auto' }}
                sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
                className="rounded-lg"
                priority 
              />
            </div>
          </div>
          {/* Text Block 2 */}
          <div className="w-full lg:w-2/3 order-2 lg:order-2">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold p-5 text-yellow-400">VISION</h3>
            <p className="p-5 text-sm sm:text-base md:text-lg">
              Street Pulse envisions a world where every individual feels empowered to walk their own path, unapologetically and confidently. We strive to be the pulse that resonates with those seeking authenticity, creativity, and a sense of belonging in the tapestry of street culture.
            </p>
            <p className="px-5 text-sm sm:text-base md:text-lg">
              Through our designs, community engagement, and commitment to social responsibility, Street Pulse aims to be a global force that not only sets trends but also cultivates a movement where the streets are a source of inspiration, acceptance, and empowerment.
            </p>
            <p className="px-5 pt-5 text-sm sm:text-base md:text-lg">
              Join us as we redefine the rhythm of the streets, one unique heartbeat at a time.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;