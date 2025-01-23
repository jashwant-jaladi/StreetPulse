"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Newsletter from "./Newsletter";

const Footer = () => {
  // Example: Conditionally render sections if they have content
  const categories = [
    { name: "Apparel", href: "/apparel" },
    { name: "Bags", href: "/bags" },
    { name: "Rugs", href: "/rugs" },
    { name: "Skateboards", href: "/skateboards" },
    { name: "Sneakers", href: "/sneakers" },
  ];

  const helpLinks = [
    { name: "Track Orders", href: "#" },
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "/faqs" },
  ];

  const socialLinks = [
    { name: "Instagram", icon: "/instagram.svg", href: "#" },
    { name: "Facebook", icon: "/facebook.svg", href: "#" },
    { name: "Gmail", icon: "/mail.svg", href: "#" },
  ];

  return (
    <div className="bg-black">
      {/* Footer Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 p-8 sm:p-12 md:p-20 bg-black text-yellow-400 border-t-2 border-yellow-400">
        {/* Categories */}
        {categories.length > 0 && (
          <div className="list-none flex flex-col gap-3">
            <li className="font-bold text-lg sm:text-xl mb-2">CATEGORIES</li>
            {categories.map((category, index) => (
              <Link
                key={index}
                href={category.href}
                className="hover:text-white text-sm sm:text-base"
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}

        {/* Help */}
        {helpLinks.length > 0 && (
          <div className="list-none flex flex-col gap-3">
            <li className="font-bold text-lg sm:text-xl mb-2">HELP</li>
            {helpLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="hover:text-white text-sm sm:text-base"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}

        {/* Get in Touch */}
        {socialLinks.length > 0 && (
          <div className="list-none flex flex-col gap-3">
            <li className="font-bold text-lg sm:text-xl mb-2">GET IN TOUCH</li>
            {socialLinks.map((social, index) => (
              <div key={index} className="flex items-center gap-2">
                <Image
                  src={social.icon}
                  alt={`${social.name} logo`}
                  width={20}
                  height={20}
                />
                <Link href={social.href} className="hover:text-white text-sm sm:text-base">
                  {social.name}
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Newsletter */}
        <div className="list-none flex flex-col gap-3">
          <li className="font-bold text-lg sm:text-xl mb-2">NEWSLETTER</li>
          <Newsletter />
        </div>
      </div>

      {/* Payment Section */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 bg-black pb-8">
        <p className="text-white text-sm sm:text-md">100% Secure Payment</p>
        <Image
          src="/payments-logo.svg"
          alt="payment logos"
          width={150}
          height={50}
          className="w-32 sm:w-48"
        />
      </div>
    </div>
  );
};

export default Footer;