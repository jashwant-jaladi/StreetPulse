"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import CircleIcon from "../Icons/CircleIcon";

const Carousel = () => {
  const CarouselImages = [
    {
      image: "https://res.cloudinary.com/dm7ntehzl/image/upload/f_auto,q_auto/v1737646759/StreetPulse/HomepageImages%20and%20headers/home1_kxgvrc.jpg",
      title: "City Lights Panache 2024",
      context: "Winter Collection",
      buttonText: "Shop Now",
    },
    {
      image: "https://res.cloudinary.com/dm7ntehzl/image/upload/f_auto,q_auto/v1737646758/StreetPulse/HomepageImages%20and%20headers/home2_c6wd70.jpg",
      title: "Footwear Fusion Line 2024",
      context: "New Season",
      buttonText: "Shop Now",
    },
    {
      image: "https://res.cloudinary.com/dm7ntehzl/image/upload/f_auto,q_auto/v1737646762/StreetPulse/HomepageImages%20and%20headers/home3_chqy8i.jpg",
      title: "Chic Carry Companion 2024",
      context: "Latest Bag Collection",
      buttonText: "Shop Now",
    },
    {
      image: "https://res.cloudinary.com/dm7ntehzl/image/upload/f_auto,q_auto/v1737646760/StreetPulse/HomepageImages%20and%20headers/sbs_i5vrlp.jpg",
      title: "Concrete Wave Series 2024",
      context: "Limited Edition Skateboards",
      buttonText: "Shop Now",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLeftClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? CarouselImages.length - 1 : prevIndex - 1
    );
  };

  const handleRightClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === CarouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="bg-black pt-10">
      <div className="flex items-center">
        {/* Left Arrow */}
        <ArrowLeftIcon
          className="hidden ml-8 sm:block text-2xl sm:text-3xl cursor-pointer text-yellow-500 hover:text-white"
          onClick={handleLeftClick}
        />

        {/* Carousel Container */}
        <div className="relative w-full max-w-[1400px] mx-auto h-[250px] sm:h-[400px] md:h-[600px] px-4">
          <div className="w-full h-full relative border-4 border-yellow-600 rounded-lg overflow-hidden">
            <Image
              src={CarouselImages[currentIndex].image}
              alt={CarouselImages[currentIndex].title}
              fill
              className="object-cover"
              priority={currentIndex === 0} // Preload the first image
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px"
            />

            {/* Overlay Text */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 rounded-xl text-white p-4 sm:p-6 w-[90%] sm:w-[80%] md:w-[60%]">
              <h3 className="text-lg sm:text-2xl md:text-4xl font-bold mb-2">
                {CarouselImages[currentIndex].title}
              </h3>
              <p className="text-sm sm:text-lg md:text-xl mb-4">
                {CarouselImages[currentIndex].context}
              </p>
              <Link
                href="/shop"
                className="block text-center bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-lg"
              >
                {CarouselImages[currentIndex].buttonText}
              </Link>
            </div>
          </div>
        </div>

        {/* Right Arrow */}
        <ArrowRightIcon
          className="hidden mr-8 sm:block text-2xl sm:text-3xl cursor-pointer text-yellow-500 hover:text-white"
          onClick={handleRightClick}
        />
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-4 space-x-2">
        {CarouselImages.map((_, index) => (
          <CircleIcon
            key={index}
            color={index === currentIndex ? "white" : "yellow.500"}
            className="cursor-pointer"
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
