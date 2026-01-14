import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import AdCard from "../AdCard";
import SubCategoryModal from "@/components/directory/SubCategoryModal";

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const selectedCategoryName = categories.find(
    (c) => c.name.toLowerCase() === selectedCategory
  )?.name || "";

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName.toLowerCase());
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-primary">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {categories.map((category, index) =>
          category.isAd ? (
            <div key={index} className="col-span-full md:col-span-1">
              <AdCard />
            </div>
          ) : (
            <Card
              key={index}
              className="overflow-hidden transition-transform hover:scale-105 cursor-pointer group"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div
                className="h-32 bg-cover bg-center transition-transform group-hover:scale-110"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              <CardContent className="p-3 text-center bg-card">
                <p className="font-semibold text-foreground">{category.name}</p>
              </CardContent>
            </Card>
          )
        )}
      </div>

      {/* SubCategory Modal */}
      <SubCategoryModal
        open={!!selectedCategory}
        onClose={() => setSelectedCategory(null)}
        category={selectedCategory || ""}
        categoryName={selectedCategoryName}
      />
    </div>
  );
};

export default CategoryGrid;
