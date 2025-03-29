import HeroSlider from "@/components/Home/HeroSlider/HeroSlider";
import ProductSlider from "@/components/Home/ProductSlider/ProductSlider";
import Sponsors from "@/components/Home/Sponsors/Sponsors";
import TestimonialSlider from "@/components/UI/Testimonial";

export const metadata = {
  title: "SOLAR-MAIT B2B",
  description: "Get the best advice from our experts",
};
export default function Home() {
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
      <TestimonialSlider />
    </div>
  );
}
