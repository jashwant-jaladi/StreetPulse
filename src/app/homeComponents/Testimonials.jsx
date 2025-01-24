// app/testimonials/page.js
import React from 'react';
import { useState } from 'react';
import Image from 'next/image';

const Testimonials = () => {
  const testimonialsData = [
    {
      name: 'Mason Nguyen',
      image: 'https://res.cloudinary.com/dm7ntehzl/image/upload/f_auto,q_auto/v1737645803/StreetPulse/testimonial%20images/image-1_f7jh87.jpg',
      title: 'Streetwear Fanatic',
      text: "As a streetwear fanatic, I'm always on the lookout for fresh styles. This brand not only delivers on the latest trends but adds its own flair. Street cred just went up a notch!",
    },
    {
      name: 'Aarav Patel',
      image: 'https://res.cloudinary.com/dm7ntehzl/image/upload/f_auto,q_auto/v1737645802/StreetPulse/testimonial%20images/image-2_g9delo.jpg',
      title: 'Streetwear Enthusiast',
      text: "Unleash your street edge with this brand! From bold graphics to comfortable fits, they've nailed the streetwear game. My go-to for urban chic vibes.",
    },
    {
      name: 'Justin Rombalk',
      image: 'https://res.cloudinary.com/dm7ntehzl/image/upload/f_auto,q_auto/v1737645802/StreetPulse/testimonial%20images/image3_g75bma.jpg',
      title: 'Streetwear Blogger',
      text: "Dope designs, top-notch quality! This streetwear brand understands the art of street fashion. Each piece tells a story, and I love being part of that narrative.",
    },
    {
      name: 'Natalie Smith',
      image: 'https://res.cloudinary.com/dm7ntehzl/image/upload/f_auto,q_auto/v1737645803/StreetPulse/testimonial%20images/image4_tfvzbt.jpg',
      title: 'CEO of Urban Threads',
      text: "I've been on the hunt for streetwear-inspired clothing for years. This brand's attention to detail and unique styles make it stand out from the crowd.",
    },
    {
      name: 'Olivia Johnson',
      image: 'https://res.cloudinary.com/dm7ntehzl/image/upload/v1737645802/StreetPulse/testimonial%20images/image5_ezu6z1.webp',
      title: 'Hypebae newsletter Editor in Chief',
      text: "This streetwear brand is a game-changer! The unique designs and attention to urban style make every piece a statement. Proud to rock these street-savvy threads!",
    },
    {
      name: 'Imam Sayashi',
      image: 'https://res.cloudinary.com/dm7ntehzl/image/upload/f_auto,q_auto/v1737645803/StreetPulse/testimonial%20images/image6_dcr99g.jpg',
      title: 'CMO of Rondeur Fashion',
      text: "Being a fashion enthusiast, I can't get enough of this streetwear brand. The fusion of global trends with a touch of desi swag is just what I've been looking for. Skylar-approved coolness highly recommended!",
    },
  ];

  return (
    <div className="bg-black min-h-screen py-20">
      {/* Page Title */}
      <h1 className="text-5xl font-bold text-center text-yellow-500 mb-10">
        Testimonials
      </h1>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-10 lg:px-20">
        {testimonialsData.map((item, index) => (
          <div key={index} className="flip-card">
            <div className="flip-card-inner">
              {/* Front Side */}
              <div className="flip-card-front bg-yellow-800 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={120}
                  height={120}
                  className="rounded-full mb-4"
                />
                <h2 className="text-2xl font-bold text-black">{item.name}</h2>
                <h3 className="text-lg italic font-bold text-gray-800">{item.title}</h3>
              </div>

              {/* Back Side */}
              <div className="flip-card-back bg-black p-6 rounded-lg shadow-lg flex items-center justify-center text-center border-2 border-yellow-500">
                <p className="text-yellow-500 text-lg">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;