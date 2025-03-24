"use client";
import Image from "next/image";
import React, { useState } from "react";
import apiHelper from "../../helpers/apiHelper";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Register(): JSX.Element {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [password, setPassword] = useState("");
  const [gst, setGst] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !state || !city || !gst) {
      alert("Please fill in all fields.");
      return;
    }

    console.log("Registration successful:", {
      firstName,
      lastName,
      email,
      state,
      city,
      pincode,
      password,
      gst,
    });

    //   {
    //     "name":"Sachin",
    //     "email":"sachin12345@gmail.com",
    //     "role":"admin",
    //     "password":"adminadmin"
    // }

    const response = await apiHelper.post("/register", {
      name: firstName + " " + lastName,
      email,
      role: "vendor",
      state,
      city,
      password,
      gstNumber: gst,
    });
    const token = response.data.token;
    if (!response.data.success) {
      alert(response.data.message);
    } else {
      localStorage.setItem("token", token);
      Cookies.set("token", token);
      router.push("/");
    }

    console.log({ response });

    // alert(`Welcome, ${firstName} ${lastName}! Your account has been created.`);
  };

  return (
    <section className="min-h-screen flex items-center pb-30 pt-10 justify-center bg-neutral-200 dark:bg-neutral-700">
      <div className="container flex justify-center">
        <div className="w-full max-w-7xl">
          <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
            <div className="g-0 lg:flex lg:flex-wrap">
              {/* Left Column */}
              <div className="px-6 pb-20 pt-10 lg:w-6/12">
                <div className="text-center">
                  {/* Logo */}
                  <Image
                    width={264}
                    height={264}
                    className="mx-auto w-48"
                    src="/assets/images/solarmait-logo.webp"
                    alt="logo"
                  />
                  <h4 className="mb-12 mt-4 text-xl font-semibold">
                    Join the SolarMait Team
                  </h4>
                </div>

                <form onSubmit={(e) => e.preventDefault()}>
                  {/* First Row: First Name and Last Name */}
                  <div className="flex flex-wrap justify-between gap-6 mb-6">
                    {/* First Name */}
                    <div className="flex-1">
                      <label
                        htmlFor="firstName"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        First Name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                        placeholder="Enter your first name"
                      />
                    </div>

                    {/* Last Name */}
                    <div className="flex-1">
                      <label
                        htmlFor="lastName"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  {/* state and city */}
                  <div className="flex flex-wrap justify-between gap-6 mb-6">
                    {/* State Dropdown */}
                    <div className="flex-1">
                      <label
                        htmlFor="state"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        State
                      </label>
                      <select
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                      >
                        <option value="">Select your state</option>
                        <option value="California">California</option>
                        <option value="Texas">Texas</option>
                        <option value="New York">New York</option>
                        <option value="Florida">Florida</option>
                      </select>
                    </div>

                    {/* City Dropdown */}
                    <div className="flex-1">
                      <label
                        htmlFor="city"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        City
                      </label>
                      <select
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                      >
                        <option value="">Select your city</option>
                        <option value="Los Angeles">Los Angeles</option>
                        <option value="Houston">Houston</option>
                        <option value="Miami">Miami</option>
                        <option value="New York City">New York City</option>
                      </select>
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                      placeholder="Enter your email address"
                    />
                  </div>

                  {/* GST Number Input */}
                  <div className="mb-6">
                    <label
                      htmlFor="gst"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      GST Number
                    </label>
                    <input
                      id="gst"
                      type="text"
                      value={gst}
                      onChange={(e) => setGst(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                      placeholder="Enter your GST number"
                    />
                  </div>

                  {/* Pincode Input */}
                  <div className="mb-6">
                    <label
                      htmlFor="pincode"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Pincode
                    </label>
                    <input
                      id="pincode"
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                      placeholder="Enter your pincode"
                    />
                  </div>

                  {/* Password Input */}
                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                      placeholder="Enter password"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleRegister}
                      className="w-full rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-400 px-6 py-3 text-sm font-medium text-white uppercase shadow-lg hover:from-yellow-600 hover:to-yellow-500"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Column */}
              <div
                className="flex items-center justify-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                style={{
                  background:
                    "linear-gradient(to right, #fbb034, #ffdd00, #ffcc33, #ffd700)",
                }}
              >
                <div className="px-6 py-8 text-black font-medium text-center md:mx-6 md:p-12">
                  <h4 className="mb-6 text-4xl lg:text-5xl font-extrabold leading-tight">
                    Become a part of our mission
                  </h4>
                  <p className="text-lg lg:text-2xl font-medium">
                    By joining SolarMait, you are contributing to a sustainable
                    future. Sign up now and take your first step towards making
                    an impact!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
