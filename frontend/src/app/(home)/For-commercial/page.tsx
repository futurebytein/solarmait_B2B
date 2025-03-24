import React from "react";
import SolarInfoTabs from "@/components/UI/SolarInfoTabs-residential";
import SolarSlider from "@/components/UI/HeroSlider";
import WhySolarMait from "@/components/UI/WhySolarMait";
import ConsultationForm from "@/components/UI/ConsultationForm";
import BusinessSegments from "@/components/UI/businessSegment";
import TestimonialSlider from "@/components/UI/Testimonial";

export default function page() {
  const dummySlides = [
    {
      image: "assets/banner/image1.jpg", // Replace with your image paths
      title: "Innovative Solar Solutions",
      description:
        "Harness the power of the sun with our state-of-the-art solar panels.",
      buttonText: "Learn More",
    },
    {
      image: "assets/banner/image2.jpg",
      title: "Eco-Friendly Energy",
      description:
        "Join the green revolution and reduce your carbon footprint today.",
      buttonText: "Join Now",
    },
    {
      image: "assets/banner/image3.jpg",
      title: "Affordable Solar Plans",
      description: "Customizable solar plans that fit every budget.",
      buttonText: "Get Started",
    },
  ];
  const dummyTestimonials = [
    {
      rating: 5,
      title: "Amazing Service!",
      content:
        "The team was extremely professional and helpful throughout the process. Highly recommended!",
      author: "John Doe",
    },
    {
      rating: 4,
      title: "Great Experience",
      content:
        "Really happy with the product quality and customer service. Will buy again!",
      author: "Jane Smith",
    },
    {
      rating: 5,
      title: "Outstanding!",
      content:
        "Exceeded all my expectations. The best experience I've had so far!",
      author: "Michael Johnson",
    },
  ];

  return (
    <div>
      <SolarSlider slides={dummySlides} />
      <BusinessSegments />
      <ConsultationForm />
      <SolarInfoTabs />
      <WhySolarMait />
      <TestimonialSlider testimonials={dummyTestimonials} />
    </div>
  );
}
