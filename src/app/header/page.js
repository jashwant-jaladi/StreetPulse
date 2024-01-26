import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <div>
      <div className="flex flex-row align-middle p-3 bg-black text-white text-xs border-b-2 border-white">
        <p className="mr-auto pl-6 ">
          Free shipping for standard orders over $100
        </p>
        <div className="flex flex-row px-8 gap-5">
          <button className="hover:text-yellow-400">
            <Link href={"/faqs"}>Help & FAQs</Link>
          </button>
          <button className="hover:text-yellow-400">
            <Link href={"/myAccount"}>My Account</Link>
          </button>
        </div>
      </div>
      <div className="border-b-2 border-yellow-400">
        <div className="flex flex-row bg-black p-3">
          <Image src={"/street-pulse-logo.png"} width={300} height={300} />
          <div className="flex flex-row gap-5  bg-black text-yellow-400">
            <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
              <Link className="mr-5 hover:text-white" href={"/"}>
                Home
              </Link>
              <Link className="mr-5 hover:text-white" href={"/shop"}>
                Shop
              </Link>
              <Link className="mr-5 hover:text-white" href={"/blogs"}>
                Blog
              </Link>
              <Link className="mr-5 hover:text-white" href={"/about"}>
                About
              </Link>
              <Link className="mr-5 hover:text-white" href={"/contact"}>
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex flex-row gap-5 my-auto mx-auto mr-8 bg-black text-yellow-400">
            <li className="list-none hover:text-white">
              <Link href={"/"}>
                <Image src={"/search.svg"} width={30} height={30} />
              </Link>
            </li>
            <li className="list-none hover:text-white">
              <Link href={"/"}>
                <Image src={"/shopping-cart.svg"} width={30} height={30} />
              </Link>
            </li>
            <li className="list-none hover:text-white">
              <Link href={"/"}>
                <Image src={"/heart.svg"} width={30} height={30} />
              </Link>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
