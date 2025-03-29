"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import apiHelper from "../../helpers/apiHelper";

export default function Register(): JSX.Element {
  // Renamed / required fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [stateValue, setStateValue] = useState(""); // user-chosen state name
  const [city, setCity] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [companyName, setCompanyName] = useState("");

  // Internal usage for location
  const [allStates, setAllStates] = useState<any[]>([]);
  const [allCities, setAllCities] = useState<any[]>([]);
  const [selectedStateIso, setSelectedStateIso] = useState("");

  // Error messages
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const router = useRouter();

  // Fetch list of states from the internal API
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await apiHelper.get("/location/states/IN", true);
        // Assuming the API returns an array of state objects in response.data
        setAllStates(response.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetchStates();
  }, []);

  // Fetch list of cities for the selected state isoCode
  useEffect(() => {
    if (!selectedStateIso) return;
    const fetchCities = async () => {
      try {
        const response = await apiHelper.get(
          `/location/cities/IN/${selectedStateIso}`,
          true
        );
        // Assuming the API returns an array of city objects in response.data
        setAllCities(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, [selectedStateIso]);

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name) newErrors.name = "Name is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!phone) newErrors.phone = "Phone is required.";
    if (!password) newErrors.password = "Password is required.";
    if (!stateValue) newErrors.stateValue = "State is required.";
    if (!city) newErrors.city = "City is required.";
    if (!gstNumber) newErrors.gstNumber = "GST Number is required.";
    if (!companyName) newErrors.companyName = "Company Name is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    // Validate fields first
    const isValid = validateFields();
    if (!isValid) return;

    try {
      // Post to /register with the new field names; role defaults to "vendor"
      const response = await apiHelper.post("/register", {
        name,
        email,
        phone,
        password,
        role: "vendor", // set role to vendor by default
        state: stateValue,
        city,
        gstNumber,
        companyName,
      });

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

  // When the user selects a state isoCode, also set the local `stateValue` to the state name
  const handleStateChange = (iso: string) => {
    setSelectedStateIso(iso);
    setCity(""); // reset city
    const selected = allStates.find((s) => s.isoCode === iso);
    setStateValue(selected ? selected.name : "");
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
                  <span className="text-xs text-black align-super">*</span> are
                  mandatory
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
                    <span className="text-xs text-black ml-1 align-super">
                      *
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
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email
                    <span className="text-xs text-black ml-1 align-super">
                      *
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
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Phone
                    <span className="text-xs text-black ml-1 align-super">
                      *
                    </span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password
                    <span className="text-xs text-black ml-1 align-super">
                      *
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
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label
                    htmlFor="state"
                    className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    State
                    <span className="text-xs text-black ml-1 align-super">
                      *
                    </span>
                  </label>
                  <select
                    id="state"
                    value={selectedStateIso}
                    onChange={(e) => handleStateChange(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                  >
                    <option value="">Select state</option>
                    {allStates.map((st) => (
                      <option key={st.isoCode} value={st.isoCode}>
                        {st.name}
                      </option>
                    ))}
                  </select>
                  {errors.stateValue && (
                    <p className="text-red-500 text-sm">{errors.stateValue}</p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label
                    htmlFor="city"
                    className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    City
                    <span className="text-xs text-black ml-1 align-super">
                      *
                    </span>
                  </label>
                  <select
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                  >
                    <option value="">Select city</option>
                    {allCities.map((ct) => (
                      <option key={ct.id} value={ct.name}>
                        {ct.name}
                      </option>
                    ))}
                  </select>
                  {errors.city && (
                    <p className="text-red-500 text-sm">{errors.city}</p>
                  )}
                </div>

                {/* GST Number */}
                <div>
                  <label
                    htmlFor="gstNumber"
                    className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    GST Number
                    <span className="text-xs text-black ml-1 align-super">
                      *
                    </span>
                  </label>
                  <input
                    id="gstNumber"
                    type="text"
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                    placeholder="Enter your company GST number"
                  />
                  {errors.gstNumber && (
                    <p className="text-red-500 text-sm">{errors.gstNumber}</p>
                  )}
                </div>

                {/* Company Name */}
                <div>
                  <label
                    htmlFor="companyName"
                    className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Company Name
                    <span className="text-xs text-black ml-1 align-super">
                      *
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
                  {errors.companyName && (
                    <p className="text-red-500 text-sm">{errors.companyName}</p>
                  )}
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
