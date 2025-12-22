
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MarketPricesModal from "./quicklinks/MarketPricesModal";
import WeatherForecastModal from "./quicklinks/WeatherForecastModal";
import FarmingTipsModal from "./quicklinks/FarmingTipsModal";
import JoinCooperativeModal from "./quicklinks/JoinCooperativeModal";
import AdCard from "./AdCard";

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
  const [marketPricesOpen, setMarketPricesOpen] = useState(false);
  const [weatherForecastOpen, setWeatherForecastOpen] = useState(false);
  const [farmingTipsOpen, setFarmingTipsOpen] = useState(false);
  const [joinCooperativeOpen, setJoinCooperativeOpen] = useState(false);

  return (
    <div className="h-full py-4 bg-white">
      <h2 className="text-xl font-bold px-4 mb-4 text-agro-blue">Categories</h2>
      
      <Accordion type="single" collapsible className="w-full">
        {categories.map((category, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="px-4 text-base hover:text-agro-blue">
              {category.name}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1">
                {category.subcategories.map((subcategory, subIndex) => (
                  <Link
                    key={subIndex}
                    to={`/shop?category=${encodeURIComponent(category.name.toLowerCase())}&subcategory=${encodeURIComponent(subcategory.toLowerCase())}`}
                    className="block px-6 py-1.5 text-sm hover:bg-agro-green/10 hover:text-agro-blue transition-colors"
                  >
                    {subcategory}
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      {/* Ad Space between Categories and Quick Links */}
      <div className="px-4 my-6">
        <AdCard className="h-32 text-sm" />
      </div>
      
      <div className="mt-6 px-4">
        <div className="bg-agro-green bg-opacity-10 p-3 rounded-lg">
          <h3 className="font-semibold text-agro-blue mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li 
              className="hover:text-agro-blue cursor-pointer flex items-center py-1"
              onClick={() => setMarketPricesOpen(true)}
            >
              <span className="w-2 h-2 bg-agro-blue rounded-full mr-2"></span>
              Latest Market Prices
            </li>
            <li 
              className="hover:text-agro-blue cursor-pointer flex items-center py-1"
              onClick={() => setWeatherForecastOpen(true)}
            >
              <span className="w-2 h-2 bg-agro-orange rounded-full mr-2"></span>
              Weather Forecast
            </li>
            <li 
              className="hover:text-agro-blue cursor-pointer flex items-center py-1"
              onClick={() => setFarmingTipsOpen(true)}
            >
              <span className="w-2 h-2 bg-agro-green rounded-full mr-2"></span>
              Farming Tips
            </li>
            <li 
              className="hover:text-agro-blue cursor-pointer flex items-center py-1"
              onClick={() => setJoinCooperativeOpen(true)}
            >
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Join Cooperative
            </li>
          </ul>
        </div>
      </div>

      {/* Quick Links Modal Components */}
      <MarketPricesModal open={marketPricesOpen} onClose={() => setMarketPricesOpen(false)} />
      <WeatherForecastModal open={weatherForecastOpen} onClose={() => setWeatherForecastOpen(false)} />
      <FarmingTipsModal open={farmingTipsOpen} onClose={() => setFarmingTipsOpen(false)} />
      <JoinCooperativeModal open={joinCooperativeOpen} onClose={() => setJoinCooperativeOpen(false)} />
    </div>
  );
};

export default Sidebar;
