
import { TrendingUp, BarChart } from "lucide-react";
import { useState, useEffect } from "react";

const newsItems = [
  {
    icon: "trend",
    text: "Grain prices expected to rise by 15% in Southern regions",
    type: "market"
  },
  {
    icon: "grant",
    text: "$2M Agricultural Innovation Grant now accepting applications",
    type: "grant"
  },
  {
    icon: "trend",
    text: "Livestock exports increase by 25% in Q1 2025",
    type: "market"
  },
  {
    icon: "grant",
    text: "World Bank announces $5M grant for sustainable farming",
    type: "grant"
  },
  {
    icon: "trend",
    text: "Organic farming adoption rate up 30% nationwide",
    type: "market"
  },
  {
    icon: "grant",
    text: "FAO launches $1.5M grant for small-scale farmers",
    type: "grant"
  },
  {
    icon: "trend",
    text: "Cassava demand reaches 5-year high in local markets",
    type: "market"
  },
  {
    icon: "grant",
    text: "New $3M grant program for agricultural technology adoption",
    type: "grant"
  }
];

const NewsTicker = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const tickerWidth = newsItems.length * 400; // Approximate width per item
    const animation = setInterval(() => {
      setPosition((current) => {
        if (current <= -tickerWidth) {
          return 0;
        }
        return current - 1;
      });
    }, 30);

    return () => clearInterval(animation);
  }, []);

  return (
    <div className="bg-agro-blue text-white py-2 overflow-hidden">
      <div 
        className="whitespace-nowrap transition-transform duration-300"
        style={{ transform: `translateX(${position}px)` }}
      >
        <div className="inline-flex gap-8">
          {newsItems.concat(newsItems).map((item, index) => (
            <span 
              key={index} 
              className="inline-flex items-center gap-2"
            >
              {item.type === "trend" ? (
                <TrendingUp className="h-4 w-4 text-agro-green" />
              ) : (
                <BarChart className="h-4 w-4 text-agro-green" />
              )}
              <span>{item.text}</span>
              <span className="mx-4">|</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
