"use client";
import { useEffect, useState } from "react";
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
import { useRouter, usePathname } from "next/navigation"; // Updated for active route
import { useAuth } from "@/contexts/AuthContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); // Get current path

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    logout();
  };

  const cartCount = user?.cart?.length || 0;

  const isActive = (path: string): boolean => pathname === path;

  return (
    <header className="bg-white shadow-sm">
      <nav className="bg-gray-100 py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <Link href="/" className="flex items-center gap-2 mr-6">
            <Image
              src="/assets/images/solarmait-logo.webp"
              width={50}
              height={50}
              alt="Solar-Mait Logo"
            />
            <h1 className="text-xl font-bold hidden lg:block">SOLAR-MAIT</h1>
          </Link>

          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {isOpen ? (
                <HiX className="text-3xl" />
              ) : (
                <HiMenuAlt3 className="text-3xl" />
              )}
            </button>
          </div>

          <ul
            className={`absolute md:static top-16 left-0 w-full md:w-auto bg-gray-100 md:bg-transparent md:flex flex-col md:flex-row items-start md:items-center p-4 md:p-0 space-y-2 md:space-y-0 md:space-x-4 z-50 transition-all duration-300 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            {/* home menu */}
            <li className="relative group w-full md:w-auto">
              <Link
                href="/"
                className={`inline-flex items-center px-2 py-1 rounded-md transition-colors duration-300 ${
                  isActive("/")
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:text-white hover:bg-blue-600"
                }`}
              >
                Home <FaChevronDown className="ml-2" size={14} />
              </Link>
              <ul className="absolute hidden group-hover:block bg-white shadow-lg rounded-md w-full z-50">
                <li>
                  <Link
                    href="/about-us"
                    className={`block px-4 py-2 rounded-md ${
                      isActive("/about-us")
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:text-white hover:bg-blue-600"
                    }`}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/career"
                    className={`block px-4 py-2 rounded-md ${
                      isActive("/career")
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:text-white hover:bg-blue-600"
                    }`}
                  >
                    Career
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact-us"
                    className={`block px-4 py-2 rounded-md ${
                      isActive("/contact-us")
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:text-white hover:bg-blue-600"
                    }`}
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </li>
            {/* solar solution menu */}
            <li className="relative group w-full md:w-auto">
              <div
                className={`inline-flex items-center px-2 py-1 rounded-md transition-colors duration-300 ${
                  isActive("/For-residential-homes") ||
                  isActive("/For-housing-societies") ||
                  isActive("/For-commercial")
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:text-white hover:bg-blue-600"
                }`}
              >
                Solar Solutions For <FaChevronDown className="ml-2" size={14} />
              </div>
              <ul className="absolute hidden group-hover:block bg-white shadow-lg rounded-md w-full z-50">
                <li>
                  <Link
                    href="/For-residential-homes"
                    className={`block px-4 py-2 rounded-md ${
                      isActive("/For-residential-homes")
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:text-white hover:bg-blue-600"
                    }`}
                  >
                    Residential Homes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/For-housing-societies"
                    className={`block px-4 py-2 rounded-md ${
                      isActive("/For-housing-societies")
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:text-white hover:bg-blue-600"
                    }`}
                  >
                    Housing Societies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/For-commercial"
                    className={`block px-4 py-2 rounded-md ${
                      isActive("/For-commercial")
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:text-white hover:bg-blue-600"
                    }`}
                  >
                    Commercial and Business
                  </Link>
                </li>
              </ul>
            </li>
            {/* partners Menu */}
            <li className="relative group w-full md:w-auto">
              <Link
                href="/partners"
                className={`inline-flex items-center px-2 py-1 rounded-md transition-colors duration-300 ${
                  isActive("/partners")
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:text-white hover:bg-blue-600"
                }`}
              >
                Become Partners <FaChevronDown className="ml-2" size={14} />
              </Link>
              <ul className="absolute hidden group-hover:block bg-white shadow-lg rounded-md w-full z-50">
                <li>
                  <Link
                    href="/about-us"
                    className={`block px-4 py-2 rounded-md ${
                      isActive("/about-us")
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:text-white hover:bg-blue-600"
                    }`}
                  >
                    Influence Partner
                  </Link>
                </li>
                <li>
                  <Link
                    href="/career"
                    className={`block px-4 py-2 rounded-md ${
                      isActive("/career")
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:text-white hover:bg-blue-600"
                    }`}
                  >
                    Store Partner
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact-us"
                    className={`block px-4 py-2 rounded-md ${
                      isActive("/contact-us")
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:text-white hover:bg-blue-600"
                    }`}
                  >
                    Advisory Partner
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact-us"
                    className={`block px-4 py-2 rounded-md ${
                      isActive("/contact-us")
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:text-white hover:bg-blue-600"
                    }`}
                  >
                    Installation Partner
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact-us"
                    className={`block px-4 py-2 rounded-md ${
                      isActive("/contact-us")
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:text-white hover:bg-blue-600"
                    }`}
                  >
                    Franchisee Partner
                  </Link>
                </li>
              </ul>
            </li>
            {/* products and services menu */}
            <li className="relative group w-full md:w-auto">
              <Link
                href="/products"
                className={`inline-flex items-center px-2 py-1 rounded-md transition-colors duration-300 ${
                  isActive("/products")
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:text-white hover:bg-blue-600"
                }`}
              >
                Products & Services <FaChevronDown className="ml-2" size={14} />
              </Link>
              <ul className="absolute hidden group-hover:block bg-white shadow-lg rounded-md w-full z-50">
                <li>
                  <Link
                    href="/products?category=solar_components"
                    className={`block px-4 py-2 rounded-md ${
                      isActive("/products?category=solar_components")
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:text-white hover:bg-blue-600"
                    }`}
                  >
                    Solar Kits{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=pannel"
                    className={`block px-4 py-2 rounded-md ${
                      isActive("/products?category=pannel")
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:text-white hover:bg-blue-600"
                    }`}
                  >
                    Solar Panels{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=inverter"
                    className={`block px-4 py-2 rounded-md ${
                      isActive("/products?category=inverter")
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:text-white hover:bg-blue-600"
                    }`}
                  >
                    Solar Inverters{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=battery"
                    className={`block px-4 py-2 rounded-md ${
                      isActive("/products?category=battery")
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:text-white hover:bg-blue-600"
                    }`}
                  >
                    Solar Batteries{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=services"
                    className={`block px-4 py-2 rounded-md ${
                      isActive("/products?category=services")
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:text-white hover:bg-blue-600"
                    }`}
                  >
                    Solar Services{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact-us"
                    className={`block px-4 py-2 rounded-md ${
                      isActive("/contact-us")
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:text-white hover:bg-blue-600"
                    }`}
                  >
                    Other Products{" "}
                  </Link>
                </li>
              </ul>
            </li>
            {/* blogs menu */}
            <li className="relative group w-full md:w-auto">
              <Link
                href="/blogs"
                className={`inline-flex items-center px-2 py-1 rounded-md transition-colors duration-300 ${
                  isActive("/blogs")
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:text-white hover:bg-blue-600"
                }`}
              >
                News & Blogs <FaChevronDown className="ml-2" size={14} />
              </Link>
              <ul className="absolute hidden group-hover:block bg-white shadow-lg rounded-md w-full z-50">
                <li>
                  <Link
                    href="/blogs"
                    className={`block px-4 py-2 rounded-md ${
                      isActive("/blogs")
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:text-white hover:bg-blue-600"
                    }`}
                  >
                    Know Solar{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/For-housing-societies"
                    className={`block px-4 py-2 rounded-md ${
                      isActive("/For-housing-societies")
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:text-white hover:bg-blue-600"
                    }`}
                  >
                    Learn Solar{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/For-commercial"
                    className={`block px-4 py-2 rounded-md ${
                      isActive("/For-commercial")
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:text-white hover:bg-blue-600"
                    }`}
                  >
                    Downloads{" "}
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

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
              <div
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-200 p-2 rounded"
                onClick={() => router.push("/profile")}
              >
                <Avatar
                  name={user.name}
                  color="#6A0DAD"
                  round={true}
                  size="40"
                  textSizeRatio={2}
                />
                <div>
                  <p className="font-medium text-gray-900">
                    {user.name.toUpperCase()}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Logout
                  </button>
                </div>
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
