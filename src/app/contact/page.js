"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { submitContact } from "./actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
    
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const response = await submitContact({
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        opinion: formData.get("opinion"),
      });
      const showToast = (errorMessage) => {
        toast.error(errorMessage, {
          position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
      };
      const showSuccessToast = (errorMessage) => {
        toast.success(errorMessage, {
          position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
      };
      if (!formData.get("firstName") || !formData.get("lastName") || !formData.get("email") || !formData.get("opinion")) {
        setToastText("Please fill all the fields");
        setToastText((prevError) => {
          showToast(prevError); // Using a callback to access the updated state
          return prevError;
        });
      } else {
        setToastText("Message sent successfully!! Thank you!!");
        showSuccessToast(toastText);
        event.target.reset();
        
      }
     
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <div className='bg-[url("/contact.jpg")] h-40 bg-center  bg-cover blur-sm border-b-2 border-yellow-400'></div>
      <div className=" text-white font-bold grid place-content-center text-5xl absolute top-[190px] left-[610px]">
        CONTACT
      </div>

      <div className="flex flex-row bg-black">
        <form
          className="flex flex-col p-20 w-1/2 bg-black text-yellow-400"
          onSubmit={handleSubmit}
        >
          <h3 className="text-3xl font-bold text-center pb-10">
            Send us a message
          </h3>
          <p className="pb-2">Name </p>
          <div className="flex flex-row justify-between">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              className="mb-5 p-2 bg-black border-2 border-yellow-400 rounded-lg w-5/12"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              className="mb-5 p-2 bg-black border-2 border-yellow-400 rounded-lg w-5/12"
            />
          </div>
          <p className="pb-2">Email </p>
          <input
            type="text"
            placeholder="Enter Your Email Address"
            name="email"
            className="mb-5 p-2 bg-black border-2 border-yellow-400 rounded-lg"
          />
          <p className="pb-2">Comments </p>
          <textarea
            name="opinion"
            id="opinion"
            cols="30"
            rows="10"
            placeholder="Enter your message here"
            className="mb-5 p-2 bg-black border-2 border-yellow-400 rounded-lg"
          ></textarea>
          <input
            type="submit"
            value="Submit"
            className="border-2 border-yellow-400 w-32 p-4 rounded-xl m-auto hover:bg-white hover:text-black"
          />
        </form>

        <div className="flex flex-col p-20 w-1/2 bg-black text-yellow-400">
          <h3 className="text-3xl font-bold text-center pb-10">Get in touch</h3>
          <div className="p-10 flex flex-col gap-10 text-xl justify-center">
            <div className="flex flex-row gap-4">
              <Image src={"/map-pin.svg"} width={30} height={30} />
              <div className="flex flex-col">
                <h3 className="font-bold text-yellow-700">Our Location</h3>
                <p className="">123 Urban Avenue, Cityville, Streetland</p>
              </div>
            </div>

            <div className="flex flex-row gap-4 ">
              <Image src={"/phone.svg"} width={30} height={30} />
              <div className="flex flex-col">
                <h3 className="font-bold text-yellow-700">Call Us</h3>
                <p className="pb-2">123-456-7890</p>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <Image src={"/mail.svg"} width={30} height={30} />
              <div className="flex flex-col">
                <h3 className="font-bold text-yellow-700">Email Us</h3>
                <p className="pb-2">n1nR1@example.com</p>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};
export default Contact;
