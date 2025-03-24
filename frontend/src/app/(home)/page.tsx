import HeroSlider from "@/components/Home/HeroSlider/HeroSlider";
import PricingPlans from "@/components/Home/PricingPlan/PricingPlan";
import ProductSlider from "@/components/Home/ProductSlider/ProductSlider";
import Sponsors from "@/components/Home/Sponsors/Sponsors";
// import SolarCalculator from "@/components/Home/Calculator/Calculator";

export const metadata = {
  title: "Solarmait",
  description: "Get the best advice from our experts",
};
export default function Home() {
  return (
    <div>
      <HeroSlider />
      {/* <SolarCalculator /> */}
      <PricingPlans />
      <ProductSlider />
      <Sponsors />
    </div>
  );
}
