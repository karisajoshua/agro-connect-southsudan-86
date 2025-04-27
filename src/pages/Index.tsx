
import HeroCarousel from "@/components/home/HeroCarousel";
import CategoryGrid from "@/components/home/CategoryGrid";
import AdditionalSections from "@/components/home/AdditionalSections";
import { TopCategories, BottomCategories } from "@/data/categories";

const HomePage = () => {
  return (
    <div className="space-y-8 pb-8">
      <HeroCarousel />
      <CategoryGrid title="Agricultural Products" categories={TopCategories} />
      <CategoryGrid title="More Categories" categories={BottomCategories} />
      <AdditionalSections />
    </div>
  );
};

export default HomePage;
