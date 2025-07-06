
import CategoryGrid from "@/components/home/CategoryGrid";
import AdditionalSections from "@/components/home/AdditionalSections";
import AdBanner from "@/components/home/AdBanner";
import AdvertSpace from "@/components/AdvertSpace";
import SmallSquareAd from "@/components/SmallSquareAd";
import MediumRectangleAd from "@/components/ads/MediumRectangleAd";
import BannerAd from "@/components/ads/BannerAd";
import SkyscraperAd from "@/components/ads/SkyscraperAd";
import LargeBannerAd from "@/components/ads/LargeBannerAd";
import CompactSquareAd from "@/components/ads/CompactSquareAd";
import { TopCategories, BottomCategories } from "@/data/categories";

const HomePage = () => {
  return (
    <div className="space-y-8 pb-8">
      {/* Note: HeroCarousel is now rendered in Layout component for homepage */}
      
      {/* Ad Space 1 - Large Banner Ad */}
      <div className="flex justify-center px-4">
        <LargeBannerAd 
          text="PREMIUM AGRICULTURAL MACHINERY & EQUIPMENT"
          bgColor="bg-gradient-to-r from-green-800 via-green-600 to-green-800"
        />
      </div>
      
      <CategoryGrid title="Agricultural Products" categories={TopCategories} />
      
      {/* Ad Space 2 - Side by side: Medium Rectangle + Small Square */}
      <div className="flex flex-col md:flex-row justify-center items-start gap-6 px-4">
        <MediumRectangleAd 
          text="PRECISION FARMING TOOLS"
          bgColor="bg-gradient-to-br from-blue-600 to-orange-500"
        />
        <SmallSquareAd 
          text="PREMIUM SEEDS"
          bgColor="bg-agro-blue"
        />
      </div>
      
      <AdBanner />
      
      <CategoryGrid title="More Categories" categories={BottomCategories} />
      
      {/* Ad Space 3 - Banner Ad */}
      <div className="flex justify-center px-4">
        <BannerAd 
          text="ORGANIC FARMING SOLUTIONS & FERTILIZERS"
          bgColor="bg-gradient-to-r from-green-700 to-yellow-600"
        />
      </div>
      
      {/* Second small square ad */}
      <div className="flex justify-center">
        <SmallSquareAd 
          text="FARMING TOOLS"
          bgColor="bg-agro-green"
        />
      </div>
      
      <AdvertSpace text="ADVERTISE YOUR AGRICULTURAL PRODUCTS HERE" className="h-28" />
      
      {/* Ad Space 5 - Compact Square Ad */}
      <div className="flex justify-center">
        <CompactSquareAd 
          text="PREMIUM ORGANIC PRODUCTS"
          bgColor="bg-gradient-to-br from-orange-600 to-red-600"
        />
      </div>
      
      {/* Third small square ad */}
      <div className="flex justify-center">
        <SmallSquareAd 
          text="EXPERT ADVICE"
          bgColor="bg-red-600"
        />
      </div>
      
      {/* Ad Space 4 - Skyscraper positioned beside Additional Sections */}
      <div className="relative">
        <div className="hidden xl:block absolute -right-4 top-0">
          <SkyscraperAd 
            text="AGRICULTURAL CONSULTANCY"
            bgColor="bg-gradient-to-b from-slate-600 to-blue-700"
          />
        </div>
        
        <AdditionalSections />
        
        {/* Mobile version of Skyscraper Ad */}
        <div className="xl:hidden flex justify-center mt-8">
          <div className="transform rotate-0">
            <BannerAd 
              text="AGRICULTURAL CONSULTANCY SERVICES"
              bgColor="bg-gradient-to-r from-slate-600 to-blue-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
