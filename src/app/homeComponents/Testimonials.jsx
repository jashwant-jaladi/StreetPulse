import React from 'react';
import FlipMove from 'react-flip-move';
import { useState } from 'react';
import Image from 'next/image';

const Testimonials = () => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const testimonialsData = [
    {
      name: 'Mason Nguyen',
      image: '/home/testimonials/image-1.jpg',
      title: 'Streetwear Fanatic',
      text: "As a streetwear fanatic, I\'m always on the lookout for fresh styles. This brand not only delivers on the latest trends but adds its own flair. Street cred just went up a notch!",
    },
    {
      name: 'Aarav Patel',
      image: '/home/testimonials/image-2.jpeg',
      title: 'Streetwear Enthusiast',
      text: "Unleash your street edge with this brand! From bold graphics to comfortable fits, they've nailed the streetwear game. My go-to for urban chic vibes.",
    },
    {
      name: 'Justin Rombalk',
      image: '/home/testimonials/image3.jpg',
      title: 'Streetwear Blogger',
      text: "Dope designs, top-notch quality! This streetwear brand understands the art of street fashion. Each piece tells a story, and I love being part of that narrative.",
    },
    {
      name: 'Natalie Smith',
      image: '/home/testimonials/image4.jpg',
      title: 'CEO of Urban Threads',
      text: "I've been on the hunt for streetwear-inspired clothing for years. This brand's attention to detail and unique styles make it stand out from the crowd.",
    },
    {
      name: 'Olivia Johnson',
      image: '/home/testimonials/image5.webp',
      title: 'Hypebae newsletter Editor in Chief',
      text: "This streetwear brand is a game-changer! The unique designs and attention to urban style make every piece a statement. Proud to rock these street-savvy threads!"
    },
    {
      name: "Imam Sayashi",
      image: '/home/testimonials/image6.jpg',
      title: 'CMO of rondeur fashion',
      text:"Being a fashion enthusiast, I can't get enough of this streetwear brand. The fusion of global trends with a touch of desi swag is just what I'/ve been looking for. Skylar-approved coolness highly recommended!"

    }
  ]

  return (
    <>
      <div className='bg-black pb-20'>
        <h1 className='text-5xl pt-20 pb-10  text-center bg-black text-yellow-500'>Testimonials</h1>
        <div className={`testimonials-container ${flipped ? 'flipped' : ''} grid grid-cols-3 p-20 gap-y-32  place-items-center bg-black text-yellow-500 border-4 border-yellow-600 rounded-full ring-2 ring-white ring-offset-4 ring-offset-slate-50 dark:ring-offset-slate-900 m-5` }>
    {testimonialsData.map((item) => (
         <div className="card" onClick={handleFlip} key={item.name}>
           <div className="card-inner">
             <div className="card-front">
               <Image src={item.image} alt={item.name} width={150} height={150} className="mb-3 m-auto aspect-[1/1.1] rounded-full" />
               <h2 className='text-center font-bold text-white text-xl'>{item.name}</h2>
               <h3 className='text-center text-sm italic'>{item.title}</h3>
             </div>
             <div className="card-back">
               <p className='text-center'>{item.text}</p>
             </div>
           </div>
         </div>
         ))}
       </div>
       </div>
    </>
  );
};


export default Testimonials;

