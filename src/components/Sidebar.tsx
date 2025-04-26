
import { useState } from "react";

interface Category {
  name: string;
  subcategories: string[];
}

const categories: Category[] = [
  {
    name: "Cereals & staples",
    subcategories: ["Maize", "Sorghum", "Millet", "Rice", "Wheat", "Matooke", "Maize flour", "Cassava flour", "Sorghum flour", "Wheat flour", "Millet flour"]
  },
  {
    name: "Vegetables",
    subcategories: ["Onions", "egg plants", "Cabbage", "Tomatoes", "Okra", "Kudra", "Amaranths (dodo)", "Spinach", "Green pepper", "Red pepper", "Carrots", "Broccoli", "Spider plant", "Jiri jiri", "Cassava leaves", "Pumpkin", "Korofo"]
  },
  {
    name: "Legumes",
    subcategories: ["Beans", "Groundnuts", "Cowpeas", "Pulses (Ades)"]
  },
  {
    name: "Fruits",
    subcategories: ["Watermelon", "Cucumber", "Avocado", "Oranges", "Mangoes", "Limes", "Pineapples", "Bananas", "Paw paws", "Sour sap", "Apples", "Guava", "Sugarcane", "Jackfruit", "Pears", "Lemon", "Tangerine", "Tamarind"]
  },
  {
    name: "Animals & by-products",
    subcategories: ["Cattle", "Goats", "Sheep", "Pigs", "Rabbits", "Hides & skins", "Milk", "Donkeys", "Fish", "Honey"]
  },
  {
    name: "Cash & industrial crops",
    subcategories: ["Coffee", "cotton", "Pyrethrum", "Flowers", "Sisal", "Aloe Vera", "Shea nuts", "Moringa", "Vanilla", "Gum arabic", "Kerekede"]
  },
  {
    name: "Oil crops",
    subcategories: ["Sesame /simsim", "soya beans", "Sunflower", "Groundnuts"]
  },
  {
    name: "Agro-forestry",
    subcategories: ["Teak", "Mahogany", "Eucalyptus", "Pine"]
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
