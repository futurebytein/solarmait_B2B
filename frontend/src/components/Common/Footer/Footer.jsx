import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
// import Logo from "@/public/assets/images/logo.png";

const d = new Date();
let year = d.getFullYear();
const Footer = () => {
  return (
    <div className=" bg-yellow-500">
      <div className=" relative max-[1024px]:pb-28 w-[86%] m-auto flex justify-between  items-start max-lg:flex-wrap  gap-2 max-lg:gap-10 pt-28 border-b-[1px] border-[#D3D6DB]">
        <div className="flex flex-col gap-4">
          <Link href="/">
            <Image
              src="/assets/images/solarmait-logo.webp"
              alt="logo"
              height={200}
              width={150}
              data-aos="fade-right"
              className="flex justify-start"
            />
          </Link>

          <p
            data-aos="fade-right"
            className="md:w-60 text-sm font-medium text-[white]"
          >
            Elevating careers through seamless job matching, connecting talented
            individuals with rewarding opportunities for professional growth and
            success.
          </p>
        </div>
        <div className="flex justify-end">
          <div className=" ">
            <p data-aos="fade-down" className="out font-bold text-[white] mb-8">
              SOLAR-MAIT
            </p>
            <div className="flex flex-col gap-4">
              <Link
                href=""
                data-aos="fade-up"
                className="out text-sm font-medium text-[white] hover:text-[white] duration-150"
              >
                About us
              </Link>
              <Link
                href=""
                data-aos="fade-up"
                className="out text-sm font-medium text-[white] hover:text-[white] duration-150"
              >
                Contact us
              </Link>
              <Link
                data-aos="fade-up"
                href="/home/terms-and-conditions"
                className="out text-sm font-medium text-[white] hover:text-[white] duration-150"
              >
                Terms and condition
              </Link>
              <Link
                href=""
                data-aos="fade-up"
                className="out text-sm font-medium text-[white] hover:text-[white] duration-150"
              >
                Privacy policy
              </Link>
              <div
                data-aos="fade-up"
                className="out text-sm font-medium text-[white] hover:text-[white] duration-150"
              ></div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className=" ">
            <p data-aos="fade-down" className="out font-bold text-[white] mb-8">
              BUY SOLAR FOR
            </p>
            <div className="flex flex-col gap-4">
              <Link
                href=""
                data-aos="fade-up"
                className="out text-sm font-medium text-[white] hover:text-[white] duration-150"
              >
                Residential Homes
              </Link>
              <Link
                href=""
                data-aos="fade-up"
                className="out text-sm font-medium text-[white] hover:text-[white] duration-150"
              >
                Housing Societies
              </Link>
              <Link
                href=""
                data-aos="fade-up"
                className="out text-sm font-medium text-[white] hover:text-[white] duration-150"
              >
                Commercial & Business
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-end ">
          <div className=" ">
            <p
              data-aos="fade-down"
              className="out font-bold text-[white] mb-8 max-[855px]:mb-6"
            >
              Blogs & Updates
            </p>
            <div className="flex flex-col gap-4 ">
              <Link
                data-aos="fade-up"
                href="/#jobsearch"
                className="out text-sm font-medium text-[white] hover:text-[white] duration-150"
              >
                Solar Guides
              </Link>
              <Link
                data-aos="fade-up"
                href="/#aiCv"
                className="out text-sm font-medium text-[white] hover:text-[white] duration-150"
              >
                Downloads{" "}
              </Link>
              <Link
                data-aos="fade-up"
                href="/#training"
                className="out text-sm font-medium text-[white] hover:text-[white] duration-150"
              >
                Learn Solar
              </Link>

              <Link
                data-aos="fade-up"
                href="/hiretalent"
                className="out text-sm font-medium text-[white] hover:text-[white] duration-150"
              >
                Govt Schemes & Polcies
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-center max-lg:gap-3 max-[1024px]:absolute bottom-0   ">
          <div className="  ">
            <p
              data-aos="fade-down"
              className="out font-bold text-[white] mb-7 max-lg:mb-3 "
            >
              SOCIALS
            </p>
            <div className="flex max-[1024px]:flex-row gap-1 ">
              <Link
                data-aos="fade-up"
                href="#"
                className="out text-sm font-normal text-[white] hover:text-[#7F56D9] duration-150 w-10 h-10 flex items-center justify-center rounded-full hover:border"
              >
                <FaLinkedin className="text-2xl" />
              </Link>
              <Link
                data-aos="fade-up"
                href="#"
                className="out text-sm font-normal text-[white] hover:text-[#7F56D9] duration-150 w-10 h-10 flex items-center justify-center rounded-full hover:border"
              >
                <FaXTwitter className="text-2xl" />
              </Link>
              <Link
                data-aos="fade-up"
                href="#"
                className="out text-sm font-normal text-[white] hover:text-[#7F56D9] duration-150 w-10 h-10 flex items-center justify-center rounded-full hover:border"
              >
                <FaInstagram className="text-2xl" />
              </Link>
              <Link
                data-aos="fade-up"
                href="#"
                className="out text-sm font-normal text-[white] hover:text-[#7F56D9] duration-150 w-10 h-10 flex items-center justify-center rounded-full hover:border"
              >
                <FaFacebook className="text-2xl" />
              </Link>
              <Link
                data-aos="fade-up"
                href="#"
                className="out text-sm font-normal text-[white] hover:text-[#7F56D9] duration-150 w-10 h-10 flex items-center justify-center rounded-full hover:border"
              >
                <IoLogoYoutube className="text-2xl" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="text-sm w-full text-center text-blue-600 font-medium py-5">
        © {year} SOLAR-MAIT All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
