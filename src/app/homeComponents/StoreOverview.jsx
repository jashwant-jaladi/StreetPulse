import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { StarIcon } from "@chakra-ui/icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const StoreOverview = () => {
  const [getdata, setData] = useState([]);
  const [display, setDisplay] = useState([]);
  const [activeSort, setActiveSort] = useState(""); 

  useEffect(() => {
    axios.get("http://localhost:4000/Shop")
      .then((res) => {
        const sortedData = res.data
        setData(sortedData);
        setDisplay(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSort = (sortingOption) => {
    let sortedData;

    switch (sortingOption) {
      case "Best Seller":
        sortedData = getdata.filter(item => item.bestSeller == true)
        break;
      case "Newest":
        sortedData = [...getdata].filter(item=>item.newest==true);
        break;
      case "Discount":
        sortedData = [...getdata].sort((a, b) => b.discount - a.discount);
        break;
      case "Top Rated":
        sortedData = [...getdata].sort((a, b) => b.rating - a.rating);
        break;
      default:
        sortedData = [...getdata]; 
        break;
    }

    setDisplay(sortedData.slice(0, 8));
    setActiveSort(sortingOption);
    
  };
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
  };

  return (
    <div className="bg-black">
      <h3 className="text-5xl font-bold text-yellow-500 pt-28 flex justify-center">Store Overview</h3>
     
      <div className="flex flex-row justify-center gap-10 pt-10 bg-black text-yellow-500 font-semibold">
        <button className={`hover:underline ${activeSort === "Best Seller" ? 'active' : ''}`} onClick={() => handleSort("Best Seller")}>Best Seller</button>
        <button className={`hover:underline ${activeSort === "Newest" ? 'active' : ''}`} onClick={() => handleSort("Newest")}>Newest</button>
        <button className={`hover:underline ${activeSort === "Discount" ? 'active' : ''}`} onClick={() => handleSort("Discount")}>Discount</button>
        <button className={`hover:underline ${activeSort === "Top Rated" ? 'active' : ''}`} onClick={() => handleSort("Top Rated")}>Top Rated</button>
      </div>

      
      <div className='bg-black text-slate-300 pb-10'>
      <Slider {...settings} className="w-[1200px] mx-auto mt-10">
        {display.map((item) => (
          <div
            key={item.id}
            className="border-2 border-yellow-700 w-[320px] p-3 rounded-xl overflow-hidden cursor-pointer"
          >
            <Image
              src={item.image}
              width={300}
              height={300}
              className="w-[300px] h-[300px] object-center object-cover transition-transform ease-linear duration-300 hover:scale-105"
            />

            <div className="flex justify-between gap-4">
              <div className="line-clamp-1 pt-3 mb-1 font-semibold text-md w-[270px] cursor-pointer">
                {item.name}
              </div>
              <button className="pt-2 flex items-center">
                <Image src="/heart.svg" width={25} height={25} />
              </button>
            </div>

            {item.rating <= 3 ? (
              <span className="inline bg-red-600 p-1 font-semibold">
                <span>{item.rating}</span>
                <StarIcon className="fill-white inline pl-1 pb-1" />
              </span>
            ) : item.rating <= 4 ? (
              <span className="inline bg-yellow-600 p-1 font-semibold">
                <span>{item.rating}</span>
                <StarIcon className="fill-white inline pl-1 pb-1" />
              </span>
            ) : (
              <span className="inline bg-green-700 p-1 font-semibold">
                <span>{item.rating}</span>
                <StarIcon className="fill-white inline pl-1 pb-1" />
              </span>
            )}

            <span className="pl-2">({item.noOfRatings})</span>
            <div className="flex gap-3 mt-1">
              <span className="font-semibold">{item.prices}</span>
              <span className="line-through text-slate-500">
                {item.preOffer}
              </span>
              <span className="text-green-500">{item.discount}% off</span>
            </div>
          </div>
          
        ))}
        </Slider>
        </div>
        
      </div>
      
    
  );
};

export default StoreOverview;
