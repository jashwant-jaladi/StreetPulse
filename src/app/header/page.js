"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import HandleSearch from "./HandleSearch"; // Import the component
import useCartStore from "@/zustand/cartStore";

const Header = () => {
  const { data: session } = useSession();
  const [searchVisible, setSearchVisible] = useState(false);
  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const handleLogout = async () => {
    const res = await signOut({
      redirect: false,
    });
    console.log("Logout response", res);
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible); // Toggle the search visibility
  };

  return (
    <div>
      <div className="flex flex-row align-middle p-3 bg-black text-white text-xs border-b-2 border-white">
        <p className="mr-auto pl-6">
          Free shipping for standard orders over $100
        </p>
        <div className="flex flex-row px-8 gap-5">
          {session ? (
            <>
              <div className="flex items-center text-lg font-semibold text-yellow-400 space-x-2">
                <span role="img" aria-label="wave" className="transition-transform duration-300 ease-in-out hover:rotate-12">
                  👋
                </span>
                <span>{session.user.name}</span>
              </div>
              <button className="hover:text-yellow-400">
                <Link href={"/faqs"}>Help & FAQs</Link>
              </button>
              <button className="hover:text-yellow-400" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="hover:text-yellow-400">
                <Link href={"/myAccount"}>My Account</Link>
              </button>
              <button className="hover:text-yellow-400">
                <Link href={"/faqs"}>Help & FAQs</Link>
              </button>
            </>
          )}
        </div>
      </div>
      <div className="border-b-2 border-yellow-400">
        <div className="flex flex-row bg-black p-3">
          <Image src={"/street-pulse-logo.png"} alt="logo" width={300} height={300} />
          <div className="flex flex-row gap-5 bg-black text-yellow-400">
            <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
              <Link className="mr-5 hover:text-white" href={"/"}>Home</Link>
              <Link className="mr-5 hover:text-white" href={"/shop"}>Shop</Link>
              <Link className="mr-5 hover:text-white" href={"/blogs"}>Blog</Link>
              <Link className="mr-5 hover:text-white" href={"/about"}>About</Link>
              <Link className="mr-5 hover:text-white" href={"/contact"}>Contact</Link>
            </nav>
          </div>
          <div className="flex flex-row gap-5 my-auto mx-auto mr-8 bg-black text-yellow-400">
            <li className="list-none hover:text-white">
              <button onClick={toggleSearch}>
                <Image src={"/search.svg"} alt="search" width={30} height={30} />
              </button>
            </li>
            <li className="list-none hover:text-white relative">
  <Link href={"/cart"} className="relative inline-block">
    <Image
      src={"/shopping-cart.svg"}
      alt="cart"
      width={30}
      height={30}
      className="relative"
    />
    {totalItems > 0 && (
      <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
        {totalItems}
      </span>
    )}
  </Link>
</li>
            <li className="list-none hover:text-white">
              <Link href={"/wishlist"}>
                <Image src={"/heart.svg"} width={30} height={30} alt="wishlist" />
              </Link>
            </li>
          </div>
        </div>
      </div>

      {/* Conditionally render HandleSearch component inside the modal */}
      {searchVisible && <HandleSearch onClose={toggleSearch} />}
    </div>
  );
};

export default Header;
