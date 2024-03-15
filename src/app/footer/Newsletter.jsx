"use client"
import React from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Newsletter = () => {
  const [email,setEmail]=useState("")
  const handleClick = (e) => {
      if(email.trim() === ""){
        toast.error("Please enter your email.", {
          theme: "dark",
        });
      }else{
        toast.success("Thank you for subscribing.", {
          theme: "dark",
        });
        setTimeout(() => {
          setEmail("")
        },100)
      }
  }
    return (
    <>
    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Enter your email' className='border-2 border-yellow-400 px-3 py-2 bg-black text-yellow-400'/>
    <button className="border-2 border-yellow-400 p-2 w-auto rounded-lg hover:bg-yellow-500 hover:text-black hover:font-bold" onClick={handleClick}>Subscibe</button>
    <ToastContainer/>
    </>
  )
}

export default Newsletter