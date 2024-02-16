import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Newsletter from './Newsletter'
const Footer = () =>{
  return (
    <>
    <div className='flex flex-row gap-10 p-20 align-middle justify-between bg-black text-yellow-400 border-t-2 border-yellow-400'>
        <div className='list-none flex flex-col gap-5'>
        <li className='font-bold'>CATEGORIES</li>
        <Link href={'/apparel'}>Apparel</Link>
        <Link href={'/bags'}>Bags</Link>
        <Link href={'/rugs'}>Rugs</Link>
        <Link href={'/skateboards'}>Skateboards</Link>
        <Link href={'/sneakers'}>Sneakers</Link>
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
            <Newsletter/>
            
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