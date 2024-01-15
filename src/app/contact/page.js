import React from 'react'
import Image from 'next/image'

const Contact = () => {
  return (
    <>
    <div className='bg-[url("/contact.jpg")] h-40 bg-center  bg-cover blur-sm border-b-2 border-yellow-400'></div>
    <div className=' text-white font-bold grid place-content-center text-5xl absolute top-[190px] left-[610px]'>CONTACT</div>
    
    <div className='flex flex-row bg-black'>
    <div className='flex flex-col p-20 w-1/2 bg-black text-yellow-400'>
        <h3 className='text-3xl font-bold text-center pb-10'>Send us a message</h3>
        <p className='pb-2'>Name </p>
        <div className='flex flex-row justify-between'>
        <input type="text" placeholder='First Name' className='mb-5 p-2 bg-black border-2 border-yellow-400 rounded-lg w-5/12'/>
        <input type="text" placeholder='Last Name' className='mb-5 p-2 bg-black border-2 border-yellow-400 rounded-lg w-5/12'/>
        </div>
        <p className='pb-2'>Email </p>
        <input type="text" placeholder='Enter Your Email Address' className='mb-5 p-2 bg-black border-2 border-yellow-400 rounded-lg'/>
        <p className='pb-2'>Comments </p>
        <textarea name="opinion" id="opinion" cols="30" rows="10" placeholder='Enter your message here' className='mb-5 p-2 bg-black border-2 border-yellow-400 rounded-lg'></textarea>
        <input type="button" value="Submit" className='border-2 border-yellow-400 w-32 p-4 rounded-xl m-auto'/>
    </div>

    <div className='flex flex-col p-20 w-1/2 bg-black text-yellow-400'>
        <h3 className='text-3xl font-bold text-center pb-10'>Get in touch</h3>
        <div className='p-10 flex flex-col gap-10 text-xl justify-center'>
        <div className='flex flex-row gap-4'>
        <Image src={'/map-pin.svg'} width={30} height={30} />
        <div className='flex flex-col'>
        <h3 className='font-bold text-yellow-700'>Our Location</h3>
        <p className=''>123 Urban Avenue, Cityville, Streetland</p>
        </div>
        </div>

        <div className='flex flex-row gap-4 '>
        <Image src={'/phone.svg'} width={30} height={30} />
        <div className='flex flex-col'>
        <h3 className='font-bold text-yellow-700'>Call Us</h3>
        <p className='pb-2'>123-456-7890</p>
        </div>
        </div>
        <div className='flex flex-row gap-4'>
        <Image src={'/mail.svg'} width={30} height={30}/>
        <div className='flex flex-col'>
        <h3 className='font-bold text-yellow-700'>Email Us</h3>
        <p className='pb-2'>n1nR1@example.com</p>
        </div>
        </div>
        </div>
         

    </div>
    </div>
    
    </>

  )
}
export default Contact