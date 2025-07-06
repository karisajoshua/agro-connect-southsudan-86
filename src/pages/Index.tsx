
import CategoryGrid from "@/components/home/CategoryGrid";
import AdditionalSections from "@/components/home/AdditionalSections";
import AdBanner from "@/components/home/AdBanner";
import AdvertSpace from "@/components/AdvertSpace";
import { TopCategories, BottomCategories } from "@/data/categories";

const HomePage = () => {
  return (
    <div className="space-y-8 pb-8">
      {/* Note: HeroCarousel is now rendered full-width in Layout component for homepage */}
      
      <CategoryGrid title="Agricultural Products" categories={TopCategories} />
      
      <AdBanner />
      
      <CategoryGrid title="More Categories" categories={BottomCategories} />
      
      <AdvertSpace text="ADVERTISE YOUR AGRICULTURAL PRODUCTS HERE" className="h-28" />
      
      <AdditionalSections />
    </div>
  );
};

export default HomePage;
