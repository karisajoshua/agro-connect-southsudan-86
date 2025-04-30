
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

export interface CategoryItem {
  name: string;
  link: string;
  image: string;
}

interface CategoryGridProps {
  title: string;
  categories: CategoryItem[];
}

const CategoryGrid = ({ title, categories }: CategoryGridProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-agro-blue">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category, index) => (
          <Link to={category.link} key={index}>
            <Card className="overflow-hidden transition-transform hover:scale-105">
              <div 
                className="h-32 bg-cover bg-center" 
                style={{ backgroundImage: `url(${category.image})` }}
              />
              <CardContent className="p-2 text-center">
                <p className="font-medium">{category.name}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
