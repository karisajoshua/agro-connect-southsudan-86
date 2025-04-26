
import { useState } from "react";

interface Category {
  name: string;
  subcategories: string[];
}

const categories: Category[] = [
  {
    name: "Cereals",
    subcategories: ["Maize", "Sorghum", "Millet"]
  },
  {
    name: "Tubers",
    subcategories: ["Cassava", "Potatoes", "Sweet Potatoes"]
  },
  {
    name: "Legumes",
    subcategories: ["Beans", "G.nuts", "Soya beans", "Cowpeas", "Cabbages"]
  },
  {
    name: "Fruits",
    subcategories: ["Avocado", "Watermelon", "Oranges", "Mangoes", "Bananas"]
  },
  {
    name: "Animals",
    subcategories: ["Cows", "Goats", "Sheep", "Chickens", "Ducks"]
  },
  {
    name: "Fish & Aquaculture",
    subcategories: ["Tilapia", "Catfish", "Fishing Equipment"]
  }
];

const Sidebar = () => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    Cereals: true // Start with Cereals expanded
  });

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  return (
    <div className="h-full py-4">
      <h2 className="text-xl font-bold px-4 mb-4 text-agro-blue">Categories</h2>
      
      <div className="space-y-1">
        {categories.map((category) => (
          <div key={category.name}>
            <div 
              className="sidebar-category flex justify-between items-center" 
              onClick={() => toggleCategory(category.name)}
            >
              <span>{category.name}</span>
              <span className="text-xs">
                {expandedCategories[category.name] ? '▼' : '▶'}
              </span>
            </div>
            
            {expandedCategories[category.name] && (
              <div className="mt-1">
                {category.subcategories.map((subcategory) => (
                  <div key={subcategory} className="sidebar-subcategory">
                    {subcategory}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 px-4">
        <div className="bg-agro-green bg-opacity-30 p-3 rounded-lg">
          <h3 className="font-semibold text-agro-blue mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li className="hover:text-agro-blue cursor-pointer">Latest Market Prices</li>
            <li className="hover:text-agro-blue cursor-pointer">Weather Forecast</li>
            <li className="hover:text-agro-blue cursor-pointer">Farming Tips</li>
            <li className="hover:text-agro-blue cursor-pointer">Join Cooperative</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
