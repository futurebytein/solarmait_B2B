import HeroSlider from "@/components/Home/HeroSlider/HeroSlider";
import ProductSlider from "@/components/Home/ProductSlider/ProductSlider";
import Sponsors from "@/components/Home/Sponsors/Sponsors";
import TestimonialSlider from "@/components/UI/Testimonial";

export const metadata = {
  title: "SOLAR-MAIT",
  description: "Get the best advice from our experts",
};
export default function Home() {
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
      <HeroSlider />
      {/* Solar Kit Slider */}
      <ProductSlider category="solar-kit" />
      {/* Panels (spelled "pannel" in your API) */}
      <ProductSlider category="pannel" />
      {/* Inverters */}
      <ProductSlider category="inverter" />
      {/* Batteries */}
      <ProductSlider category="battery" />
      {/* Solar Components */}
      <ProductSlider category="solar_components" /> <Sponsors />
      <TestimonialSlider testimonials={dummyTestimonials} />
    </div>
  );
}
