"use client";
import { useEffect, useState, useRef } from "react";
import Avatar from "react-avatar";
import Link from "next/link";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaChevronDown,
} from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = (e) => {
    e.stopPropagation();
    logout();
    setDropdownOpen(false);
  };

  const cartCount = user?.cart?.length || 0;

  const isActive = (path) => pathname === path;

  // Close user dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDashboard = () => {
    if (user.gst_verified) {
      router.push("/admin");
    } else {
      router.push("/profile");
    }
    setDropdownOpen(false);
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="bg-gray-100 py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mr-6">
            <Image
              src="/assets/images/solarmait-logo.webp"
              width={50}
              height={50}
              alt="Solar-Mait Logo"
            />
            <h1 className="text-xl font-bold hidden lg:block">SOLAR-MAIT</h1>
          </Link>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {isOpen ? (
                <HiX className="text-3xl" />
              ) : (
                <HiMenuAlt3 className="text-3xl" />
              )}
            </button>
          </div>

          {/* Navigation links */}
          <ul
            className={`absolute md:static top-16 left-0 w-full md:w-auto bg-gray-100 md:bg-transparent md:flex flex-col md:flex-row items-start md:items-center p-4 md:p-0 space-y-2 md:space-y-0 md:space-x-4 z-50 transition-all duration-300 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <li className="relative group w-full md:w-auto">
              <Link
                href="/"
                className={`inline-flex items-center px-3 py-1 rounded-md transition-colors duration-300 ${
                  isActive("/")
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:text-white hover:bg-blue-600"
                }`}
              >
                Home
              </Link>
            </li>
            <li className="relative group w-full md:w-auto">
              <Link
                href="/enquiries"
                className={`inline-flex items-center px-3 py-1 rounded-md transition-colors duration-300 ${
                  isActive("/enquiries")
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:text-white hover:bg-blue-600"
                }`}
              >
                Enquiry & Orders
              </Link>
            </li>
            <li className="relative group w-full md:w-auto">
              <Link
                href="/contactUs"
                className={`inline-flex items-center px-3 py-1 rounded-md transition-colors duration-300 ${
                  isActive("/contactUs")
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:text-white hover:bg-blue-600"
                }`}
              >
                Contact Us
              </Link>
            </li>
          </ul>

          {/* Right side icons */}
          <div className="flex items-center gap-6">
            <Link href={`${user ? "/cart" : "/login"}`}>
              <Badge badgeContent={cartCount} color="primary" showZero={false}>
                <ShoppingCartIcon
                  fontSize="large"
                  className="cursor-pointer text-gray-700"
                />
              </Badge>
            </Link>

            {user ? (
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 focus:outline-none"
                >
                  <Avatar
                    name={user.name}
                    color="#6A0DAD"
                    round={true}
                    size="40"
                    textSizeRatio={2}
                  />
                  <span className="hidden md:block font-medium text-gray-900">
                    {user.name.toUpperCase()}
                  </span>
                  <FaChevronDown className="text-gray-600" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-md z-[20000]">
                    <button
                      onClick={handleDashboard}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {user.gst_verified
                        ? "Go to Dashboard"
                        : "Get GST Verified"}
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <button className="bg-transparent hover:bg-yellow-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                  Login / Register
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
