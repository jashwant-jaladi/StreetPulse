"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import CircleIcon from "../Icons/CircleIcon";

const Carousel = () => {
  const CarouselImages = [
    {
      image: "/home/home1.jpg",
      title: "City Lights Panache 2024",
      context: "Winter Collection",
      buttonText: "Shop Now",
      property: "top",
    },
    {
      image: "/home/home2.jpg",
      title: "Footwear Fusion Line 2024",
      context: "New Season",
      buttonText: "Shop Now",
      property: "center",
    },
    {
      image: "/home/home3.jpg",
      title: "Chic Carry Companion 2024",
      context: "Latest Bag Collection",
      buttonText: "Shop Now",
      property: "bottom",
    },
    {
      image: "/home/sbs.jpg",
      title: "Concrete Wave Series 2024",
      context: "Limited Edition Skateboards",
      buttonText: "Shop Now",
      property: "center",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const LeftClick = () => {
    currentIndex == 0
      ? setCurrentIndex(CarouselImages.length - 1)
      : setCurrentIndex(currentIndex - 1);
  };

  const RightClick = () => {
    currentIndex == CarouselImages.length - 1
      ? setCurrentIndex(0)
      : setCurrentIndex(currentIndex + 1);
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
          <div
            style={{
              backgroundImage: `url(${CarouselImages[currentIndex].image})`,
            }}
            className={`w-full h-full rounded-2xl bg-${CarouselImages[currentIndex].property} bg-cover bg-origin-content duration-500 border-4 border-yellow-700`}
          >
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