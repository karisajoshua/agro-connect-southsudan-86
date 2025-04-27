
import { Link } from "react-router-dom";

interface CategoryItem {
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
    <section>
      <h2 className="text-2xl font-bold mb-6 text-agro-blue">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <Link 
            key={category.name} 
            to={category.link}
            className="relative overflow-hidden rounded-lg group h-40"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundImage: `url(${category.image})` }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-xl font-semibold">{category.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
