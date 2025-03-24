import React from "react";
import SolarInfoTabs from "@/components/UI/SolarInfoTabs-residential";
import SolarSlider from "@/components/UI/HeroSlider";
import WhySolarMait from "@/components/UI/WhySolarMait";
import ConsultationForm from "@/components/UI/ConsultationForm";
import QuickEasySolarLoans from "@/components/UI/EasySolarLoans";

export default function page() {
  const residentialSlides = [
    {
      image: "solar/solar1.jpg",
      title: "Solar Solutions for Your Home",
      description:
        "Power your home with clean and renewable energy. Reduce your bills and carbon footprint today!",
      buttonText: "Explore Options",
    },
    {
      image: "solar/solar3.jpg",
      title: "Custom Solar Installations",
      description:
        "Tailor-made solar systems designed specifically for residential rooftops.",
      buttonText: "Get a Quote",
    },
    {
      image: "solar/solar5.jpg",
      title: "Maximize Your Savings",
      description:
        "Take advantage of government subsidies and reduce your electricity expenses drastically.",
      buttonText: "Start Saving",
    },
  ];

  return (
    <div>
      <SolarSlider slides={residentialSlides} />
      <QuickEasySolarLoans />

      <ConsultationForm />
      <SolarInfoTabs />
      <WhySolarMait />
    </div>
  );
}
