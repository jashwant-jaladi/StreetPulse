import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Link from 'next/link'



const Blogdisplay = () => {
const [perPage,setPerPage]=useState([])
useEffect(() => {
    axios.get('http://localhost:3000/api/blogs').then((res) => {
        setPerPage(res.data.slice(0,3));

    })},[])
  return (
    <>
    <h3 className='text-5xl font-bold pt-5 text-center bg-black text-yellow-500'>Our Blogs</h3>
    <div className='bg-black flex flex-row w-[100vw] justify-center gap-20'>
    {perPage.map((item) =>
        (
        <div key={item._id} className='w-[25vw] '>
        <div className='pt-16 '>
        <div className='border-2 border-yellow-600 rounded-lg overflow-hidden cursor-pointer grow shrink aspect-[2/1]  '>
        <img src={item.image} className='object-top object-cover transition-transform ease-linear duration-300 hover:scale-110 rounded-lg '/>
        </div>
        </div>
        <div>
        <p className='pt-3 pl-3 text-gray-500'>By {item.name} on {item.date}</p>
        <h2 className='pt-3 pl-3 text-2xl font-bold text-yellow-400 cursor-pointer'><Link href={'/blogs/'+item.id} rel="noopener noreferrer" target="_blank">{item.title}</Link></h2>
        <p className='pt-3 pl-3 text-white'>{item.content.slice(0,310)}...<Link href={'/blogs/'+item.id} className='text-blue-500 underline hover:text-blue-300'rel="noopener noreferrer" target="_blank">Read More</Link></p>
        </div>
        </div>
        )
        )}
        </div>
        </>
  )
}


export default Blogdisplay