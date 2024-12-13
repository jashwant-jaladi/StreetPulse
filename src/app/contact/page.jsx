"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    opinion: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.opinion) {
      toast.error("All fields are required.", { theme: "dark" });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format.", { theme: "dark" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch("api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message, { theme: "dark" });
        setFormData({ firstName: "", lastName: "", email: "", opinion: "" });
      } else {
        toast.error(data.message, { theme: "dark" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again later.", { theme: "dark" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-[url('/contact.jpg')] h-40 bg-center bg-cover blur-sm border-b-2 border-yellow-400"></div>
      <div className="text-white font-bold grid place-content-center text-5xl absolute top-[190px] left-[610px]">
        CONTACT
      </div>

      <div className="flex flex-row bg-black">
        <form
          className="flex flex-col p-20 w-1/2 bg-black text-yellow-400"
          onSubmit={handleSubmit}
        >
          <h3 className="text-3xl font-bold text-center pb-10">Send us a message</h3>
          <p className="pb-2">Name</p>
          <div className="flex flex-row justify-between">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={loading}
              className="mb-5 p-2 bg-black border-2 border-yellow-400 rounded-lg w-5/12"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={loading}
              className="mb-5 p-2 bg-black border-2 border-yellow-400 rounded-lg w-5/12"
            />
          </div>
          <p className="pb-2">Email</p>
          <input
            type="email"
            placeholder="Enter Your Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            className="mb-5 p-2 bg-black border-2 border-yellow-400 rounded-lg"
          />
          <p className="pb-2">Comments</p>
          <textarea
            name="opinion"
            value={formData.opinion}
            onChange={handleChange}
            disabled={loading}
            cols="30"
            rows="10"
            placeholder="Enter your message here"
            className="mb-5 p-2 bg-black border-2 border-yellow-400 rounded-lg"
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className="border-2 border-yellow-400 w-32 p-4 rounded-xl m-auto hover:bg-white hover:text-black"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        <div className="flex flex-col p-20 w-1/2 bg-black text-yellow-400">
          <h3 className="text-3xl font-bold text-center pb-10">Get in touch</h3>
          <div className="p-10 flex flex-col gap-10 text-xl justify-center">
            <div className="flex flex-row gap-4">
              <Image src={"/map-pin.svg"} width={30} height={30} alt="location" />
              <div className="flex flex-col">
                <h3 className="font-bold text-yellow-700">Our Location</h3>
                <p>123 Urban Avenue, Cityville, Streetland</p>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <Image src={"/phone.svg"} width={30} height={30} alt="phone"/>
              <div className="flex flex-col">
                <h3 className="font-bold text-yellow-700">Call Us</h3>
                <p>123-456-7890</p>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <Image src={"/mail.svg"} width={30} height={30} alt="mail" />
              <div className="flex flex-col">
                <h3 className="font-bold text-yellow-700">Email Us</h3>
                <p>n1nR1@example.com</p>
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
