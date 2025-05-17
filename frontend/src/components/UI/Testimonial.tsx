"use client";
import React, { useState, useEffect } from "react";
import "keen-slider/keen-slider.min.css";
import KeenSlider from "keen-slider";
import { axiosInstance } from "@/lib/axiosInstance";

interface Testimonial {
  user: {
    name: string;
    company: string;
  };
  content: string;
}

const TestimonialSlider: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch testimonials from API endpoint
  useEffect(() => {
    axiosInstance
      .get("b2b-testimonial/find-all")
      .then((res) => {
        if (res.data?.testimonials) {
          setTestimonials(res.data.testimonials);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching testimonials:", err);
        setLoading(false);
      });
  }, []);

  // Initialize Keen Slider when testimonials are loaded
  useEffect(() => {
    if (testimonials.length === 0) return;
    const slider = new KeenSlider("#keen-slider", {
      loop: true,
      slides: {
        origin: "center",
        perView: 1.25,
        spacing: 16,
      },
      breakpoints: {
        "(min-width: 1024px)": {
          slides: {
            origin: "auto",
            perView: 1.5,
            spacing: 32,
          },
        },
      },
    });

    const prev = document.getElementById("keen-slider-previous");
    const next = document.getElementById("keen-slider-next");
    const prevDesktop = document.getElementById("keen-slider-previous-desktop");
    const nextDesktop = document.getElementById("keen-slider-next-desktop");

    prev?.addEventListener("click", () => slider.prev());
    next?.addEventListener("click", () => slider.next());
    prevDesktop?.addEventListener("click", () => slider.prev());
    nextDesktop?.addEventListener("click", () => slider.next());

    return () => slider.destroy();
  }, [testimonials]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p>Loading testimonials...</p>
      </div>
    );
  }

  return (
    <section className="bg-[#FFF7E6] lg:pr-30">
      <div className="mx-auto max-w-[1340px] px-4 py-12 sm:px-6 lg:me-0 lg:py-16 lg:ps-8 lg:pe-0 xl:py-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-center lg:gap-16">
          <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Don't just take our word for it...
            </h2>

            <p className="mt-4 text-gray-700">
              Our clients have experienced outstanding results – see what they
              have to say about us!
            </p>

            <div className="hidden lg:mt-8 lg:flex lg:gap-4">
              <button
                aria-label="Previous slide"
                id="keen-slider-previous-desktop"
                className="rounded-full border border-[#33d554] p-3 text-[#33d554] transition hover:bg-[#33d554] hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 rtl:rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>

              <button
                aria-label="Next slide"
                id="keen-slider-next-desktop"
                className="rounded-full border border-[#33d554] p-3 text-[#33d554] transition hover:bg-[#33d554] hover:text-white"
              >
                <svg
                  className="size-5 rtl:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="-mx-6 lg:col-span-2 lg:mx-0">
            <div id="keen-slider" className="keen-slider">
              {testimonials.map((testimonial, index) => (
                <div className="keen-slider__slide" key={index}>
                  <blockquote className="flex h-full flex-col justify-between bg-white p-6 shadow-xs sm:p-8 lg:p-12">
                    <div>
                      <div className="mt-4">
                        <p className="text-2xl font-bold text-black sm:text-3xl">
                          {/* Optionally, you can add a title here */}
                          Testimonial
                        </p>
                        <p className="mt-4 leading-relaxed text-gray-700">
                          {testimonial.content}
                        </p>
                      </div>
                    </div>

                    <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6">
                      &mdash; {testimonial.user.name},{" "}
                      {testimonial.user.company}
                    </footer>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4 lg:hidden">
          <button
            aria-label="Previous slide"
            id="keen-slider-previous"
            className="rounded-full border border-[#33d554] p-3 text-[#33d554] transition hover:bg-[#33d554] hover:text-white"
          >
            <svg
              className="size-5 -rotate-180 transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>

          <button
            aria-label="Next slide"
            id="keen-slider-next"
            className="rounded-full border border-[#33d554] p-3 text-[#33d554] transition hover:bg-[#33d554] hover:text-white"
          >
            <svg
              className="size-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
