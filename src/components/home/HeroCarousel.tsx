
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";

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
  return (
    <Carousel 
      className="w-full"
      plugins={[
        Autoplay({
          delay: 4000,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
        }),
      ]}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {sliderImages.map((slide, index) => (
          <CarouselItem key={index}>
            <div className="h-64 sm:h-80 lg:h-96">
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
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
};

export default HeroCarousel;
