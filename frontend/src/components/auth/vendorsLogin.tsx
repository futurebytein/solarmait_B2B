"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import apiHelper from "../../helpers/apiHelper";
import Link from "next/link";
import Cookies from "js-cookie";
import { useAuth } from "@/contexts/AuthContext";

export default function Login(): JSX.Element {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      await login(email, password);
    } catch (err) {
      console.log(err);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-neutral-200 dark:bg-neutral-700">
      <div className="container flex justify-center">
        <div className="w-full max-w-4xl">
          <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
            <div className="g-0 lg:flex lg:flex-wrap">
              {/* Left Column */}
              <div className="px-6 py-12 lg:w-6/12">
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
                    We are The SolarMait Team
                  </h4>
                </div>

                <form onSubmit={(e) => e.preventDefault()}>
                  <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
                    Please login to your account
                  </p>

                  {/* Username Input */}
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                      placeholder="Enter your Email"
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
                      placeholder="Enter your password"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleLogin}
                      className="w-full rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-400 px-6 py-3 text-sm font-medium text-white uppercase shadow-lg hover:from-yellow-600 hover:to-yellow-500"
                    >
                      Log in
                    </button>
                    <a
                      href="#!"
                      className="block mt-4 text-sm text-blue-500 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>

                  {/* Register Button */}
                  <div className="flex items-center justify-between pt-6">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Don&apos;t have an account?
                    </p>
                    <Link href="/register">
                      <button
                        type="button"
                        className="rounded-lg border-2 border-yellow-500 px-6 py-2 text-sm font-medium text-yellow-500 uppercase transition hover:bg-yellow-500 hover:text-white"
                      >
                        Register
                      </button>
                    </Link>
                  </div>
                </form>
              </div>

              {/* Right Column */}
              <div
                className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                style={{
                  background:
                    "linear-gradient(to right, #fbb034, #ffdd00, #ffcc33, #ffd700)",
                }}
              >
                <div className="px-6 py-8 text-black font-medium md:mx-6 md:p-12">
                  <h4 className="mb-6 text-xl font-semibold">
                    We are more than just a company
                  </h4>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
