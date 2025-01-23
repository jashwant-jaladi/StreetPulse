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
      property: "top",
    },
    {
      image: "https://res.cloudinary.com/dm7ntehzl/image/upload/f_auto,q_auto/v1737646758/StreetPulse/HomepageImages%20and%20headers/home2_c6wd70.jpg",
      title: "Footwear Fusion Line 2024",
      context: "New Season",
      buttonText: "Shop Now",
      property: "center",
    },
    {
      image: "https://res.cloudinary.com/dm7ntehzl/image/upload/f_auto,q_auto/v1737646762/StreetPulse/HomepageImages%20and%20headers/home3_chqy8i.jpg",
      title: "Chic Carry Companion 2024",
      context: "Latest Bag Collection",
      buttonText: "Shop Now",
      property: "bottom",
    },
    {
      image: "https://res.cloudinary.com/dm7ntehzl/image/upload/f_auto,q_auto/v1737646760/StreetPulse/HomepageImages%20and%20headers/sbs_i5vrlp.jpg",
      title: "Concrete Wave Series 2024",
      context: "Limited Edition Skateboards",
      buttonText: "Shop Now",
      property: "center",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const LeftClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? CarouselImages.length - 1 : prevIndex - 1
    );
  };

  const RightClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === CarouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="bg-black">
      <div className="flex flex-row items-center">
        {/* Left Arrow */}
        <ArrowLeftIcon
          className="m-auto text-2xl sm:text-3xl cursor-pointer"
          color="yellow.700"
          onClick={LeftClick}
        />

        {/* Carousel Container */}
        <div className="max-w-[1400px] h-[300px] sm:h-[400px] md:h-[600px] w-[90%] sm:w-[75%] m-auto py-4 sm:py-8 px-4 relative">
          <div className="w-full h-full rounded-2xl overflow-hidden relative border-4 border-yellow-700">
            <Image
              src={CarouselImages[currentIndex].image}
              alt={CarouselImages[currentIndex].title}
              fill
              className="object-cover"
              priority={currentIndex === 0} // Preload the first image
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px"
            />
            {/* Overlay Text */}
            <div className="glass text-white opacity-100 absolute top-[70%] left-[50%] bg-black rounded-2xl p-4 sm:p-7 translate-x-[-50%] translate-y-[-50%] w-[90%] sm:w-[80%] md:w-[50%]">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold transition-all ease-in">
                {CarouselImages[currentIndex].title}
              </h3>
              <p className="text-sm sm:text-xl">
                {CarouselImages[currentIndex].context}
              </p>
              <button className="text-sm sm:text-xl my-2 sm:my-3 p-1 rounded-lg border-2 border-white bg-black cursor-pointer hover:text-black hover:bg-white">
                <Link href={"/shop"} target="_blank">
                  {CarouselImages[currentIndex].buttonText}
                </Link>
              </button>
            </div>
          </div>
        </div>

        {/* Right Arrow */}
        <ArrowRightIcon
          className="m-auto text-2xl sm:text-3xl cursor-pointer"
          color="yellow.700"
          onClick={RightClick}
        />
      </div>

      {/* Dots Navigation */}
      <div className="flex flex-row justify-center gap-2 sm:gap-3 py-4">
        {CarouselImages.map((item, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className="cursor-pointer"
          >
            <CircleIcon
              color={index === currentIndex ? "white" : "yellow.600"}
              className="hover:text-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;