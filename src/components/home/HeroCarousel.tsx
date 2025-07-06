
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const sliderImages = [
  {
    url: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07", 
    title: "Connect with Markets",
    description: "Find buyers for your agricultural products and connect with markets across South Sudan."
  },
  {
    url: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    title: "Access Agricultural Services",
    description: "Access high-quality agricultural services and inputs for improved farming."
  },
  {
    url: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
    title: "Learn Farming Techniques",
    description: "Learn modern farming techniques to increase your productivity and income."
  }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div 
      className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides */}
      {sliderImages.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-800 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="flex items-center justify-center h-full relative bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.url})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="relative text-center text-white p-6 z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{slide.title}</h2>
              <p className="text-lg mb-4 max-w-2xl">{slide.description}</p>
              <Button className="bg-agro-green text-agro-blue hover:bg-agro-green/90">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
