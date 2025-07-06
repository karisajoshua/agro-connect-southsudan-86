
import CategoryGrid from "@/components/home/CategoryGrid";
import AdditionalSections from "@/components/home/AdditionalSections";
import AdBanner from "@/components/home/AdBanner";
import AdvertSpace from "@/components/AdvertSpace";
import SmallSquareAd from "@/components/SmallSquareAd";
import { TopCategories, BottomCategories } from "@/data/categories";

const HomePage = () => {
  return (
    <div className="space-y-8 pb-8">
      {/* Note: HeroCarousel is now rendered in Layout component for homepage */}
      
      <CategoryGrid title="Agricultural Products" categories={TopCategories} />
      
      {/* First small square ad */}
      <div className="flex justify-center">
        <SmallSquareAd 
          text="PREMIUM SEEDS"
          bgColor="bg-agro-blue"
        />
      </div>
      
      <AdBanner />
      
      <CategoryGrid title="More Categories" categories={BottomCategories} />
      
      {/* Second small square ad */}
      <div className="flex justify-center">
        <SmallSquareAd 
          text="FARMING TOOLS"
          bgColor="bg-agro-green"
        />
      </div>
      
      <AdvertSpace text="ADVERTISE YOUR AGRICULTURAL PRODUCTS HERE" className="h-28" />
      
      {/* Third small square ad */}
      <div className="flex justify-center">
        <SmallSquareAd 
          text="EXPERT ADVICE"
          bgColor="bg-red-600"
        />
      </div>
      
      <AdditionalSections />
    </div>
  );
};

export default HomePage;
