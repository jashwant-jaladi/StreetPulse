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
      {/* Header Section */}
      <div className="relative h-32 sm:h-40 border-b-2 border-yellow-400">
      {/* Background Image */}
      <Image
        src="https://res.cloudinary.com/dm7ntehzl/image/upload/f_auto,q_auto/v1737648404/StreetPulse/HomepageImages%20and%20headers/contact_t6xcug.jpg"
        alt="Contact Background"
        fill // Replaces layout="fill"
        style={{ objectFit: 'cover', objectPosition: 'center' }} // Ensures the image covers the container and is centered
        quality={75} // Adjust quality as needed
        className="absolute inset-0 z-0"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-5"></div>
      {/* Content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-3xl sm:text-4xl md:text-5xl text-center z-10">
        CONTACT
      </div>
    </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row bg-black">
        {/* Form Section */}
        <form
          className="flex flex-col p-6 sm:p-10 lg:p-20 w-full lg:w-1/2 bg-black text-yellow-400"
          onSubmit={handleSubmit}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-center pb-6 sm:pb-10">
            Send us a message
          </h3>
          <p className="pb-2">Name</p>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={loading}
              className="mb-5 p-2 bg-black border-2 border-yellow-400 rounded-lg w-full sm:w-5/12"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={loading}
              className="mb-5 p-2 bg-black border-2 border-yellow-400 rounded-lg w-full sm:w-5/12"
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
            className="mb-5 p-2 bg-black border-2 border-yellow-400 rounded-lg w-full"
          />
          <p className="pb-2">Comments</p>
          <textarea
            name="opinion"
            value={formData.opinion}
            onChange={handleChange}
            disabled={loading}
            cols="30"
            rows="6"
            placeholder="Enter your message here"
            className="mb-5 p-2 bg-black border-2 border-yellow-400 rounded-lg w-full"
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className="border-2 border-yellow-400 w-32 p-3 sm:p-4 rounded-xl m-auto hover:bg-white hover:text-black transition-colors"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {/* Contact Info Section */}
        <div className="flex flex-col p-6 sm:p-10 lg:p-20 w-full lg:w-1/2 bg-black text-yellow-400">
          <h3 className="text-2xl sm:text-3xl font-bold text-center pb-6 sm:pb-10">
            Get in touch
          </h3>
          <div className="p-6 sm:p-10 flex flex-col gap-6 sm:gap-10 text-lg sm:text-xl justify-center">
            <div className="flex flex-row gap-4">
              <Image src={"/map-pin.svg"} width={24} height={24} alt="location" />
              <div className="flex flex-col">
                <h3 className="font-bold text-yellow-700">Our Location</h3>
                <p>123 Urban Avenue, Cityville, Streetland</p>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <Image src={"/phone.svg"} width={24} height={24} alt="phone" />
              <div className="flex flex-col">
                <h3 className="font-bold text-yellow-700">Call Us</h3>
                <p>123-456-7890</p>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <Image src={"/mail.svg"} width={24} height={24} alt="mail" />
              <div className="flex flex-col">
                <h3 className="font-bold text-yellow-700">Email Us</h3>
                <p>n1nR1@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default Contact;