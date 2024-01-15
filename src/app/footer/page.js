import React from 'react'
import Image from 'next/image'

const Footer = () =>{
  return (
    <>
    <div className='flex flex-row gap-10 p-20 align-middle justify-between bg-black text-yellow-400 border-t-2 border-yellow-400'>
        <div className='list-none flex flex-col gap-5'>
        <li className='font-bold'>CATEGORIES</li>
        <li>Women</li>
        <li>Men</li>
        <li>Bags</li>
        <li>Footwears</li>
        <li>Watches</li>
        </div>
        <div className='list-none flex flex-col gap-5'>
            <li className='font-bold'>HELP</li>
            <li>Track Orders</li>
            <li>Contact Us</li>
            <li>FAQS</li>
        </div>
        <div className='list-none flex flex-col gap-5'>
            <li className='font-bold'>GET IN TOUCH</li>
            <div className='flex flex-row gap-2'>
             <Image src={'/instagram.svg'} width={20} height={20}/>    
            <li>Instagram</li>
            </div>
            <div className='flex flex-row gap-2'>
             <Image src={'/facebook.svg'} width={20} height={20}/>
            <li>Facebook</li>
            </div>
             <div className='flex flex-row gap-2'>
            <Image src={'/mail.svg'} width={20} height={20}/>
            <li>Gmail</li>
            </div>
        </div>
        <div className='list-none flex flex-col gap-5'>
            <li className='font-bold flex align-middle justify-center'>NEWSLETTER</li>
            <input type="text" placeholder='Enter your email' className='border-2 border-yellow-400 px-3 py-2 bg-black text-yellow-400'/>
            <button className="border-2 border-yellow-400 p-2 w-auto rounded-lg hover:bg-yellow-500 hover:text-black hover:font-bold">Subscibe</button>
        </div>
    </div>
    <div className='flex flex-row gap-5 justify-center align-middle bg-black pb-8'>
    <p className='text-white text-md'>100% Secure Payment</p>
    <Image src={'/payments-logo.svg'} width={200} height={200}/>
    </div>
    </>
  )
}
export default Footer