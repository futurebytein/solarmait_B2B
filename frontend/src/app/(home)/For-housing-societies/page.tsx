import React from "react";
import SolarInfoTabs from "@/components/UI/SolarInfoTabs-residential";
import SolarSlider from "@/components/UI/HeroSlider";
import WhySolarMait from "@/components/UI/WhySolarMait";
import ConsultationForm from "@/components/UI/ConsultationForm";
import QuickEasySolarLoans from "@/components/UI/EasySolarLoans";
import TestimonialSlider from "@/components/UI/Testimonial";
export default function page() {
  const societySlides = [
    {
      image: "solar/solar4.jpg",
      title: "Solar Power for Housing Societies",
      description:
        "Efficient solar energy solutions for large-scale housing communities.",
      buttonText: "Learn More",
    },
    {
      image: "solar/solar1.jpg",
      title: "Shared Solar, Shared Savings",
      description:
        "Reduce common area electricity costs with community solar installations.",
      buttonText: "Get a Proposal",
    },
    {
      image: "solar/solar5.jpg",
      title: "Eco-Friendly Communities",
      description:
        "Promote sustainability and green living within your housing society.",
      buttonText: "Join the Movement",
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
      <SolarSlider slides={societySlides} />
      <QuickEasySolarLoans />

      <ConsultationForm />
      <SolarInfoTabs />
      <WhySolarMait />
      <TestimonialSlider testimonials={dummyTestimonials} />
    </div>
  );
}
