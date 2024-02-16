import React from 'react'


const BlogDetails = async({params}) => {
  const data = await fetch(`http://localhost:3000/api/blogs/${params.id}`, {cache: 'no-store'}, { next: { revalidate: 3600 } })
  const posts = await data.json()
  return ( 
    <div className='flex flex-row bg-black text-yellow-400'>
      <div className='bg-black text-yellow-600 p-10 pb-20'>
        <div key={posts._id} className='w-[50vw] ml-20'>
          <div className='pt-20 '>
            <div className='border-2 border-yellow-600 rounded-lg overflow-hidden cursor-pointer grow shrink aspect-[2/1]  '>
              {posts._id == 5 ? <img src={`/blog/${posts.image}`} className='w-full h-full object-center object-cover transition-transform ease-linear duration-300 hover:scale-110 rounded-lg ' /> : <img src={posts.image} className='w-full h-full object-top object-cover transition-transform ease-linear duration-300 hover:scale-110 rounded-lg ' />}
            </div>
          </div>
          <div className='w-[700px]'>
            <p className='pt-5 pl-3 text-gray-500'>By {posts.name} on {posts.date}</p>
            <h2 className='pt-5 pl-3 text-2xl font-bold'>{posts.title}</h2>
            <p className='pt-5 pl-3 text-white'>{posts.content}</p>
          </div>
          <h3 className='mt-10 mb-5 text-xl'>Comments :</h3>
          <div className='p-10 border-2 border-yellow-600 w-[700px]'></div>
          <div className='flex flex-col'>
            <h3 className='mt-10 mb-5 text-xl'>Leave a comment :</h3>
            <textarea className='bg-black p-2 border-2 border-yellow-600 w-[700px]' placeholder="Enter your comment here!!"></textarea>
            <button className='w-40 border-2 border-yellow-600 rounded-2xl p-2 mt-10'>Submit</button>
          </div>
        </div>
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
          <div className='grid grid-rows-4 grid-flow-col gap-4 text-sm '>
            <button className='border-2 border-yellow-700 rounded-3xl p-2'>Men</button>
            <button className='border-2 border-yellow-700 rounded-3xl p-2'>Women</button>
            <button className='border-2 border-yellow-700 rounded-3xl p-2'>Fashion</button>
            <button className='border-2 border-yellow-700 rounded-3xl p-2'>LifeStyle</button>
            <button className='border-2 border-yellow-700 rounded-3xl p-2'>Denim</button>
            <button className='border-2 border-yellow-700 rounded-3xl p-2'>StreetStyle</button>
            <button className='border-2 border-yellow-700 rounded-3xl p-2'>Crafts</button>

          </div>
        </div>
      </div>
    </div>
  )

}


 export default BlogDetails