"use client";
import { useState, useEffect } from "react";
import { FaHome, FaBuilding, FaSolarPanel, FaRupeeSign } from "react-icons/fa";
import { LuChartBarIncreasing } from "react-icons/lu";
import { axiosInstance } from "../../../lib/axiosInstance";
import axios from "axios";
import { isArray } from "util";

export default function SolarCalculator() {
  const [usageType, setUsageType] = useState("Home");
  const [electricityBill, setElectricityBill] = useState();
  const [systemSize, setSystemSize] = useState(0);
  const [spaceRequired, setSpaceRequired] = useState(0);
  const [energyGenerated, setEnergyGenerated] = useState(0);
  const [savings, setSavings] = useState(0);
  const [price, setPrice] = useState(0);
  const [subsidy, setSubsidy] = useState(0);
  const [pincode, setPincode] = useState();
  const [discount, setDiscount] = useState(0);
  const [roi, setRoi] = useState(0);
  const [discoms, setDiscoms] = useState();
  const getCalculations = async () => {
    try {
      const response = await axiosInstance.post('/calculator/get-calculations', {
        totalBill: electricityBill,
        category: usageType === 'Home' ? 'residential' : 'commercial',
        pincode: pincode,
      });

      if (response.data.success) {
        const {
          systemSize,
          annualGeneration,
          annualSavings,
          stateSubsidy,
          centralSubsidy,
          gstCredit,
          extraDiscount,
          netEffectiveCost,
          ROI
        } = response.data.data;
        console.log({ROI})
        setSystemSize(systemSize);
        setEnergyGenerated(annualGeneration);
        setSavings(annualSavings);
        setPrice(netEffectiveCost);
        setSubsidy(stateSubsidy + centralSubsidy);
        setDiscount(gstCredit+extraDiscount);
        setRoi(ROI);
      }
      else {
        alert('Something went wrong, please try again.')
      }


    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message);
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pincode) {
      alert("Pincode is required");
      return;
    } // Clear the error if validation passes
    getCalculations();
  };
  const handleDiscoms = async () => {

    if (pincode && pincode.length === 6) {
      const response = await axiosInstance.get(`/discoms/${pincode}`);


      if (response.data.success) {
        const discoms = response.data.discoms.map((discom) => discom.name);
        setDiscoms(discoms);
      }
    }
  }



  useEffect(() => {
    // const size = (electricityBill / 1000).toFixed(1);
    // const space = (size * 80).toFixed(0);
    // const energy = (size * 1430).toFixed(0);
    // const annualSavings = (electricityBill * 12).toFixed(0);
    // const totalPrice = (size * 65000).toFixed(0);
    // const subsidyAmount =
    //   usageType === "Home" ? (totalPrice * 0.3).toFixed(0) : 0;

    // setSystemSize(size);
    // setSpaceRequired(space);
    // setEnergyGenerated(energy);
    // setSavings(annualSavings);
    // setPrice(totalPrice);
    // setSubsidy(subsidyAmount);

  }, [electricityBill, usageType]);

  const handleBillChange = (e) => {
    setElectricityBill(e.target.value);
  };

  return (
    <div className="w-full h-auto bg-cover bg-[url('/images/bg-01.webp')] flex items-center justify-center py-8 md:py-16">
      <div className="container mx-auto px-6 md:px-10 py-8 bg-white bg-opacity-90 rounded-lg shadow-xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side: Inputs */}
          <div className="w-full md:w-1/3 p-6 bg-gray-100 rounded-xl shadow-md">

            <h1 className="text-3xl md:text-4xl font-semibold text-yellow-500 mb-4 text-center">
              Calculate Your Savings
            </h1>
            {/* <p className="text-blue-600 text-center mb-8">
              Explore the Potential of Solar Energy and Start Saving From Day 1!
            </p> */}
            <div className="mb-6">
              <label className="text-gray-700 font-semibold mb-2 block">
                Do You Need Solar For
              </label>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  className={`flex items-center justify-center w-full p-3 rounded-lg border ${usageType === "Home"
                    ? "bg-yellow-500 border-yellow-700 text-white"
                    : "border-gray-300"
                    }`}
                  onClick={() => setUsageType("Home")}
                >
                  <FaHome className="mr-2" /> Home
                </button>
                <button
                  className={`flex items-center justify-center w-full p-3 rounded-lg border ${usageType === "Commercial"
                    ? "bg-yellow-500 border-yellow-700 text-white"
                    : "border-gray-300"
                    }`}
                  onClick={() => setUsageType("Commercial")}
                >
                  <FaBuilding className="mr-2" /> Commercial
                </button>
              </div>
            </div>
            <form onSubmit={(e) => { handleSubmit(e); }}>
              <div className="mb-6">
                <label className="text-gray-700 font-semibold mb-2 block">
                  Enter Your Monthly Electricity Bill (in ₹)
                </label>
                <input
                  type="number"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-yellow-500"
                  value={electricityBill}
                  onChange={(e) => { setElectricityBill(e.target.value) }}
                  min="0"
                />
              </div>

              <div className="mb-6">
                <label className="text-gray-700 font-semibold mb-2 block">
                  Enter Your Pincode
                </label>
                <input
                  type="number"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-yellow-500"
                  value={pincode}
                  onChange={(e) => { setPincode(e.target.value) }}
                  min="0"
                />
              </div>
              <div className="mb-6">
                <label className="text-gray-700 font-semibold mb-2 block">
                  Select DISCOM
                </label>
                {/* <input
                  type="text"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-yellow-500"
                  value={discoms}
                  // onChange={(e)=>{getDiscoms(e.target.value)}}
                  onClick={()=>handleDiscoms()}
                  min="0"
                /> */}
                <select
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-yellow-500"
                  onClick={() => handleDiscoms()}
                  onChange={(e) => setDiscoms(e.target.value)} // Update selected value
                >
                  {discoms && Array.isArray(discoms) &&
                    discoms.map((discom, index) => (
                      <option key={index} value={discom}>
                        {discom}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-full font-semibold shadow-lg transition duration-300"
                >
                  Calculate
                </button>
              </div>
            </form>

          </div>

          {/* Right Side: Output Cards */}
          <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "System Size",
                value: `${systemSize} kW`,
                icon: (
                  <FaSolarPanel className="text-3xl mr-3 text-yellow-700" />
                ),
              },
              {
                title: "Annual Energy Generated",
                value: `${energyGenerated} Units`,
                icon: (
                  <FaSolarPanel className="text-3xl mr-3 text-yellow-700" />
                ),
              },
              {
                title: "Annual Savings",
                value: `₹${savings}`,
                icon: <FaRupeeSign className="text-3xl mr-3 text-yellow-700" />,
              },
              {
                title: "Extra Discount",
                value: `₹${discount}`,
                icon: (
                  <FaSolarPanel className="text-3xl mr-3 text-yellow-700" />
                ),
              },
              {
                title: "Eligible Subsidy",
                value: subsidy > 0 ? `₹${subsidy}` : "N/A",
                icon: <FaRupeeSign className="text-3xl mr-3 text-yellow-700" />,
              },
              {
                title: "Net Effective Cost",
                value: `₹${price}`,
                icon: <FaRupeeSign className="text-3xl mr-3 text-yellow-700" />,
              },
              {
                title: "ROI (in years)",
                value: `${roi}`,
                icon: <LuChartBarIncreasing className="text-3xl mr-3 text-yellow-700" />,
              },

            ].map(({ title, value, icon }, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg flex items-center border border-gray-200"
              >
                {icon}
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-gray-800">
                    {title}
                  </h2>
                  <p className="text-2xl md:text-3xl font-extrabold text-gray-900">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-full font-semibold shadow-lg transition duration-300">
            Start Your Solar Journey
          </button>
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-6 rounded-full font-semibold shadow-lg transition duration-300">
            Interested in Finance?
          </button>
        </div>
      </div>
    </div>
  );
}
