"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import HandleSearch from "./HandleSearch";
import useCartStore from "@/zustand/cartStore";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons"; // Chakra UI Icons

const Header = () => {
  const { data: session } = useSession();
  const [searchVisible, setSearchVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cart = useCartStore((state) => state.cart);

  // Memoize the total items calculation
  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const handleLogout = async () => {
    try {
      const res = await signOut({ redirect: false });
      console.log("Logout response", res);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleSearch = () => {
    setSearchVisible((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Reusable navigation links
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/blogs", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div>
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-2 sm:p-3 bg-black text-white text-xs border-b-2 border-white">
        <p className="text-center sm:text-left sm:pl-6">Free shipping for standard orders over $100</p>
        <div className="flex flex-row gap-3 sm:gap-5 mt-2 sm:mt-0">
          {session ? (
            <>
              <div className="flex items-center text-sm sm:text-lg font-semibold text-yellow-400 space-x-2">
                <span role="img" aria-label="wave" className="transition-transform duration-300 ease-in-out hover:rotate-12">
                  👋
                </span>
                <span>{session.user.name}</span>
              </div>
              <Link href="/faqs" className="hover:text-yellow-400 text-sm sm:text-base">
                Help & FAQs
              </Link>
              <button onClick={handleLogout} className="hover:text-yellow-400 text-sm sm:text-base">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/myAccount" className="hover:text-yellow-400 text-sm sm:text-base">
                My Account
              </Link>
              <Link href="/faqs" className="hover:text-yellow-400 text-sm sm:text-base">
                Help & FAQs
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b-2 border-yellow-400">
        <div className="flex flex-col sm:flex-row items-center justify-between bg-black p-3">
          {/* Logo and Mobile Menu Toggle */}
          <div className="flex items-center justify-between w-full sm:w-auto">
            <Image
              src="/street-pulse-logo.png"
              alt="logo"
              width={200}
              height={200}
              className="w-32 sm:w-48"
              priority
            />
            <button
              onClick={toggleMobileMenu}
              className="sm:hidden text-yellow-400 hover:text-white"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <CloseIcon boxSize={6} /> : <HamburgerIcon boxSize={6} />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav
            className={`${isMobileMenuOpen ? "block" : "hidden"} sm:flex sm:items-center sm:space-x-4 mt-4 sm:mt-0 w-full sm:w-auto`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block sm:inline-block text-yellow-400 hover:text-white text-lg sm:text-base py-2 sm:py-0"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex flex-row gap-5  ">
            <button onClick={toggleSearch} aria-label="Search" className="hover:text-white">
              <Image src="/search.svg" alt="search" width={24} height={24} />
            </button>
            <Link href="/cart" className="relative hover:text-white">
              <Image src="/shopping-cart.svg" alt="cart" width={24} height={24} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link href="/wishlist" className="hover:text-white">
              <Image src="/heart.svg" width={24} height={24} alt="wishlist" />
            </Link>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {searchVisible && <HandleSearch onClose={toggleSearch} />}
    </div>
  );
};

export default Header;