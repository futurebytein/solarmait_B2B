"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import apiHelper from "../../helpers/apiHelper";

export default function Register(): JSX.Element {
  // Mandatory Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // Store selected state isoCode (for API calls)
  const [stateIso, setStateIso] = useState("");
  // Store city name directly
  const [city, setCity] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyGstNumber, setCompanyGstNumber] = useState("");
  const [password, setPassword] = useState("");

  // Dropdown lists
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  const router = useRouter();

  // Fetch list of states from the internal API
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await apiHelper.get("/location/states/IN", true);
        // Assuming the API returns an array of state objects in response.data
        setStates(response.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetchStates();
  }, []);

  // Fetch list of cities for the selected state using the isoCode
  useEffect(() => {
    if (!stateIso) return;
    const fetchCities = async () => {
      try {
        const response = await apiHelper.get(
          `/location/cities/IN/${stateIso}`,
          true
        );
        // Assuming the API returns an array of city objects in response.data
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, [stateIso]);

  const handleRegister = async () => {
    // Check mandatory fields
    if (
      !name ||
      !email ||
      !phoneNumber ||
      !stateIso ||
      !city ||
      !companyName ||
      !companyGstNumber ||
      !password
    ) {
      alert("Please fill in all mandatory fields.");
      return;
    }

    // Find the selected state object to get the state's name
    const selectedState = states.find((s) => s.isoCode === stateIso);

    try {
      // Post to /register with role "vendor" and include state name and city name
      const response = await apiHelper.post("/register", {
        name,
        email,
        phoneNumber,
        state: selectedState ? selectedState.name : "",
        city,
        companyName,
        companyGstNumber,
        password,
        role: "vendor",
      });

      // Check success
      if (!response.data.success) {
        alert(response.data.message || "Registration failed.");
      } else {
        const token = response.data.token;
        localStorage.setItem("token", token);
        Cookies.set("token", token);
        router.push("/");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-neutral-200 dark:bg-neutral-700 py-10">
      <div className="container max-w-7xl">
        <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
          <div className="g-0 lg:flex lg:flex-wrap">
            {/* Left Column: Form */}
            <div className="px-6 py-10 lg:w-6/12">
              <div className="text-center">
                {/* Logo */}
                <Image
                  width={264}
                  height={264}
                  className="mx-auto w-48"
                  src="/assets/images/solarmait-logo.webp"
                  alt="logo"
                />
                <h4 className="mb-2 mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Join the SOLAR-MAIT Team
                </h4>
                <p className="mb-8 text-sm font-medium text-gray-600 dark:text-gray-300">
                  Fields marked with{" "}
                  <span className="text-xs text-red-500 align-super">★</span>{" "}
                  are mandatory
                </p>
              </div>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Name
                    <span className="text-xs text-red-500 ml-1 align-super">
                      ★
                    </span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email
                    <span className="text-xs text-red-500 ml-1 align-super">
                      ★
                    </span>
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

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Phone Number
                    <span className="text-xs text-red-500 ml-1 align-super">
                      ★
                    </span>
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* State */}
                <div>
                  <label
                    htmlFor="state"
                    className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    State
                    <span className="text-xs text-red-500 ml-1 align-super">
                      ★
                    </span>
                  </label>
                  <select
                    id="state"
                    value={stateIso}
                    onChange={(e) => {
                      setStateIso(e.target.value);
                      setCity(""); // clear city when state changes
                    }}
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                  >
                    <option value="">Select state</option>
                    {states.map((st) => (
                      <option key={st.isoCode} value={st.isoCode}>
                        {st.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City */}
                <div>
                  <label
                    htmlFor="city"
                    className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    City
                    <span className="text-xs text-red-500 ml-1 align-super">
                      ★
                    </span>
                  </label>
                  <select
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                  >
                    <option value="">Select city</option>
                    {cities.map((ct) => (
                      <option key={ct.id} value={ct.name}>
                        {ct.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Company Name */}
                <div>
                  <label
                    htmlFor="companyName"
                    className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Company Name
                    <span className="text-xs text-red-500 ml-1 align-super">
                      ★
                    </span>
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                    placeholder="Enter your company name"
                  />
                </div>

                {/* Company GST Number */}
                <div>
                  <label
                    htmlFor="companyGstNumber"
                    className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Company GST Number
                    <span className="text-xs text-red-500 ml-1 align-super">
                      ★
                    </span>
                  </label>
                  <input
                    id="companyGstNumber"
                    type="text"
                    value={companyGstNumber}
                    onChange={(e) => setCompanyGstNumber(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                    placeholder="Enter your company GST number"
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password
                    <span className="text-xs text-red-500 ml-1 align-super">
                      ★
                    </span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                    placeholder="Enter a secure password"
                  />
                </div>

                {/* Register Button */}
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={handleRegister}
                    className="w-full rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-400 px-6 py-3 text-sm font-medium text-white uppercase shadow-lg hover:from-yellow-600 hover:to-yellow-500 transition-all duration-200"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Promo/Info */}
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
                  By joining SOLAR-MAIT, you are contributing to a sustainable
                  future. Sign up now and take your first step towards making an
                  impact!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
