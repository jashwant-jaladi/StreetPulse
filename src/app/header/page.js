"use client";

import React, { useState, useMemo, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import HandleSearch from "./HandleSearch";
import useCartStore from "@/zustand/cartStore";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Header = memo(() => {
  const { data: session } = useSession();
  const [searchVisible, setSearchVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cart = useCartStore((state) => state.cart);

  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleSearch = () => setSearchVisible((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/blogs", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-black text-white">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-2 sm:p-3 border-b-2 border-white">
        <p className="text-center sm:text-left text-xs sm:pl-6">
          Free shipping for standard orders over $100
        </p>
        <div className="flex gap-3 sm:gap-5 mt-2 sm:mt-0 text-xs sm:text-sm">
          {session ? (
            <>
              <div className="flex items-center space-x-2 text-yellow-400 font-semibold">
                👋 <span>{session.user.name}</span>
              </div>
              <Link href="/faqs" className="hover:text-yellow-400">
                Help & FAQs
              </Link>
              <button onClick={handleLogout} className="hover:text-yellow-400">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/myAccount" className="hover:text-yellow-400">
                My Account
              </Link>
              <Link href="/faqs" className="hover:text-yellow-400">
                Help & FAQs
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b-2 border-yellow-400">
        <div className="flex items-center justify-between p-3 sm:px-6">
          {/* Logo */}
          <Image
            src="/street-pulse-logo.png"
            alt="logo"
            width={200}
            height={200}
            className="w-28 sm:w-36"
            priority
          />

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="sm:hidden text-yellow-400 hover:text-white"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <CloseIcon boxSize={6} /> : <HamburgerIcon boxSize={6} />}
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden sm:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-yellow-400 hover:text-white text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button onClick={toggleSearch} aria-label="Search" className="hover:text-white">
              <Image src="/search.svg" alt="search" width={24} height={24} />
            </button>
            <Link href="/cart" className="relative hover:text-white">
              <Image src="/shopping-cart.svg" alt="cart" width={24} height={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link href="/wishlist" className="hover:text-white">
              <Image src="/heart.svg" width={24} height={24} alt="wishlist" />
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <nav className="sm:hidden bg-black text-white p-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-yellow-400 hover:text-white text-base"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>

      {/* Search Modal */}
      {searchVisible && <HandleSearch onClose={toggleSearch} />}
    </header>
  );
});

Header.displayName = "Header";

export default Header;
