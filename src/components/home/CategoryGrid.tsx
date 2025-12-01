import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import AdCard from "../AdCard";
import SubCategoryModal from "../directory/SubCategoryModal";

export interface CategoryItem {
  name: string;
  link: string;
  image: string;
  isAd?: boolean;
}

interface CategoryGridProps {
  title: string;
  categories: CategoryItem[];
}

const CategoryGrid = ({ title, categories }: CategoryGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState<{
    category: string;
    name: string;
  } | null>(null);

  const handleCategoryClick = (category: CategoryItem) => {
    if (category.isAd) return;
    
    // Extract category from link (e.g., "/directory?category=cereals" -> "cereals")
    const categorySlug = category.link.split("category=")[1];
    setSelectedCategory({
      category: categorySlug,
      name: category.name,
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-agro-blue">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category, index) => (
          category.isAd ? (
            <div key={index} className="col-span-full md:col-span-1">
              <AdCard />
            </div>
          ) : (
            <div
              key={index}
              onClick={() => handleCategoryClick(category)}
              className="cursor-pointer"
            >
              <Card className="overflow-hidden transition-transform hover:scale-105">
                <div 
                  className="h-32 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                <CardContent className="p-2 text-center">
                  <p className="font-medium">{category.name}</p>
                </CardContent>
              </Card>
            </div>
          )
        ))}
      </div>

      {selectedCategory && (
        <SubCategoryModal
          open={!!selectedCategory}
          onClose={() => setSelectedCategory(null)}
          category={selectedCategory.category}
          categoryName={selectedCategory.name}
        />
      )}
    </div>
  );
};

export default CategoryGrid;
