"use server"
import {React} from 'react'
import Link from 'next/link'
import Pagination from './pagination'

async function getData()
{
    const res= await fetch('http://localhost:8080/blogs',{ next: { revalidate: 0 } }  )
    if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
     
      return res.json()
}


const Blog = async() => {
    const blogData= await getData()
  return (
        <div className='bg-black text-yellow-600'>
        <div className='bg-[url("/f7.avif")] h-40 bg-center bg-cover text-white font-bold grid place-content-center text-5xl border-b-2 border-yellow-400'>
          <h1>BLOGS</h1>
          </div>
        {blogData.map((item) =>
        (
        <div key={item.id} className='w-[50vw] ml-20'>
        <div className='pt-20 '>
        <div className='border-2 border-yellow-600 rounded-lg overflow-hidden cursor-pointer grow shrink aspect-[2/1]  '>
        {item.id==5 ? <img src={item.image} className='w-full h-full object-center object-cover transition-transform ease-linear duration-300 hover:scale-110 rounded-lg '/> : <img src={item.image} className='w-full h-full object-top object-cover transition-transform ease-linear duration-300 hover:scale-110 rounded-lg '/>}
        </div>
        </div>
        <div className='w-[700px]'>
        <p className='pt-3 pl-3 text-gray-500'>By {item.name} on {item.date}</p>
        <h2 className='pt-3 pl-3 text-2xl font-bold hover:text-yellow-400 cursor-pointer'>{item.title}</h2>
        <p className='pt-3 pl-3 text-white'>{item.content.slice(0,310)}...<Link href={'/blogs/'+item.id} className='text-blue-500 underline hover:text-blue-300'>Read More</Link></p>
        </div>
        
        </div>
        
        )
        )
    }
        
        <Pagination className='bg-black text-yellow-600' length={blogData.length}/>
        </div>
    
  )
}

export default Blog