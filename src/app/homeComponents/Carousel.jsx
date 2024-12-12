"use client"
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
      <div className="flex flex-row">
        <ArrowLeftIcon
          className="m-auto text-3xl"
          color="yellow.700"
          onClick={LeftClick}
        />
       
        <div className="max-w-[1400px] h-[600px] w-[75%] m-auto py-8 px-4 relative ">
          <div
            style={{
              backgroundImage: `url(${CarouselImages[currentIndex].image})`,
            }}
            className={`w-full h-full rounded-2xl bg-${CarouselImages[currentIndex].property} bg-cover bg-origin-content duration-500 border-4 border-yellow-700`}
          >
            <div className="glass text-white opacity-100 absolute top-[70%] left-[50%] bg-black  rounded-2xl p-7 translate-x-[-50%] translate-y-[-50%] w-[50%]">
              <h3 className="text-3xl font-bold transition-all ease-in ">
                {CarouselImages[currentIndex].title}
              </h3>
              <p className="text-xl">{CarouselImages[currentIndex].context}</p>
              <button className="text-xl my-3 p-1 rounded-lg border-2 border-white bg-black cursor-pointer hover:text-black hover:bg-white">
                <Link href={"/shop"} target="_blank">
                  {CarouselImages[currentIndex].buttonText}
                </Link>
              </button>
            </div>
          </div>
        </div>
        
        <ArrowRightIcon
          className="m-auto text-3xl"
          color="yellow.700"
          onClick={RightClick}
        />
      </div>
      <div className="flex flex-row justify-center gap-3 ">
        {CarouselImages.map((item, currentIndex) => (
          <div
            key={currentIndex}
            onClick={() => goToSlide(currentIndex)}
          >
            <CircleIcon color="yellow.600" className="cursor-pointer hover:text-white" />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Carousel;
