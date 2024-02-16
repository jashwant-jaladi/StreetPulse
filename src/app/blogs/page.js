"use client"
import React from 'react'
import Link from 'next/link'
import Pagination from './pagination'
import { useState, useEffect} from 'react'

import axios from 'axios'


const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  const [perPage, setPerPage] = useState([]);

useEffect(() => {
    axios.get('http://localhost:3000/api/blogs').then((res) => {
        setBlogData(res.data);
        setPerPage(res.data.slice(0,3));

    })},[])
const pageHandler = (page) => {
  const startIndex = (page - 1) * 3;
  const endIndex = page * 3;
  page==3?setPerPage(blogData.slice(startIndex)) :setPerPage(blogData.slice(startIndex, endIndex));
  
}
  return (
        <div className='bg-black text-yellow-600'>
        <div className='bg-[url("/blog/f7.avif")] h-40 bg-center bg-cover text-white font-bold grid place-content-center text-5xl border-b-2 border-yellow-400'>
          <h1>BLOGS</h1>
          </div>

        <div className='flex flex-row'>
        <div>
        {perPage.map((item) =>
        (
        <div key={item._id} className='w-[50vw] ml-20'>
        <div className='pt-20 '>
        <div className='border-2 border-yellow-600 rounded-lg overflow-hidden cursor-pointer grow shrink aspect-[2/1]  '>
        {item._id=="65bb821ed99f677359eb1ba2" ? <img src={item.image} className='w-full h-full object-center object-cover transition-transform ease-linear duration-300 hover:scale-110 rounded-lg '/> : <img src={item.image} className='w-full h-full object-top object-cover transition-transform ease-linear duration-300 hover:scale-110 rounded-lg '/>}
        </div>
        </div>
        <div className='w-[700px]'>
        <p className='pt-3 pl-3 text-gray-500'>By {item.name} on {item.date}</p>
        <h2 className='pt-3 pl-3 text-2xl font-bold hover:text-yellow-400 cursor-pointer'><Link href={'/blogs/'+item.id} rel="noopener noreferrer" target="_blank">{item.title}</Link></h2>
        <p className='pt-3 pl-3 text-white'>{item.content.slice(0,310)}...<Link href={'/blogs/'+item._id} className='text-blue-500 underline hover:text-blue-300'rel="noopener noreferrer" target="_blank">Read More</Link></p>
        </div>
        </div>
        )
        )
    }   
        </div>
        <div className='w-1/2'>
          <input type="text" placeholder='search' className='p-3 m-auto mt-20 flex justify-center content-center border-2 border-yellow-400 rounded-lg bg-black text-yellow-400' />
          <div className='grid place-content-center list-none mt-10 gap-4 text-xl'>
           <h3 className='text-3xl font-bold p-5'>Categories</h3>
           <li>Fashion</li>
           <hr />
           <li>StreetStyle</li>
           <hr />
           <li>Beauty</li>
           <hr />
           <li>Life Style</li>
           <hr />
           <li>DIY & Crafts</li>
           <h3 className='text-3xl font-bold p-5 mt-10'>Featured Products</h3>
           <h3 className='text-3xl font-bold p-5 mt-10'>Tags</h3>
           <div className='grid grid-rows-4 grid-flow-col gap-4 '>
            <button className='border-2 border-yellow-700 rounded-3xl p-3'>Men</button>
            <button className='border-2 border-yellow-700 rounded-3xl p-3'>Women</button>
            <button className='border-2 border-yellow-700 rounded-3xl p-3'>Fashion</button>
            <button className='border-2 border-yellow-700 rounded-3xl p-3'>LifeStyle</button>
            <button className='border-2 border-yellow-700 rounded-3xl p-3'>Denim</button>
            <button className='border-2 border-yellow-700 rounded-3xl p-3'>StreetStyle</button>
            <button className='border-2 border-yellow-700 rounded-3xl p-3'>Crafts</button>

           </div>
           </div>
           <div>
            
           </div>
        </div>
        </div>
        <Pagination className='bg-black text-yellow-600' data={blogData} pageHandler={pageHandler}/>
        </div>
    
  )
}

export default Blog