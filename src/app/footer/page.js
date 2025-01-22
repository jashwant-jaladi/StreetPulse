"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Newsletter from "./Newsletter";

const Footer = () => {
  return (
    <>
      {/* Footer Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 p-8 sm:p-12 md:p-20 bg-black text-yellow-400 border-t-2 border-yellow-400">
        {/* Categories */}
        <div className="list-none flex flex-col gap-3">
          <li className="font-bold text-lg sm:text-xl mb-2">CATEGORIES</li>
          <Link href="/apparel" className="hover:text-white text-sm sm:text-base">
            Apparel
          </Link>
          <Link href="/bags" className="hover:text-white text-sm sm:text-base">
            Bags
          </Link>
          <Link href="/rugs" className="hover:text-white text-sm sm:text-base">
            Rugs
          </Link>
          <Link href="/skateboards" className="hover:text-white text-sm sm:text-base">
            Skateboards
          </Link>
          <Link href="/sneakers" className="hover:text-white text-sm sm:text-base">
            Sneakers
          </Link>
        </div>

        {/* Help */}
        <div className="list-none flex flex-col gap-3">
          <li className="font-bold text-lg sm:text-xl mb-2">HELP</li>
          <li className="text-sm sm:text-base">Track Orders</li>
          <Link href="/contact" className="hover:text-white text-sm sm:text-base">
            Contact Us
          </Link>
          <Link href="/faqs" className="hover:text-white text-sm sm:text-base">
            FAQs
          </Link>
        </div>

        {/* Get in Touch */}
        <div className="list-none flex flex-col gap-3">
          <li className="font-bold text-lg sm:text-xl mb-2">GET IN TOUCH</li>
          <div className="flex items-center gap-2">
            <Image src="/instagram.svg" alt="instagram logo" width={20} height={20} />
            <Link href="#" className="hover:text-white text-sm sm:text-base">
              Instagram
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/facebook.svg" alt="facebook logo" width={20} height={20} />
            <Link href="#" className="hover:text-white text-sm sm:text-base">
              Facebook
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/mail.svg" alt="gmail logo" width={20} height={20} />
            <Link href="#" className="hover:text-white text-sm sm:text-base">
              Gmail
            </Link>
          </div>
        </div>

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
    </>
  );
};

export default Footer;