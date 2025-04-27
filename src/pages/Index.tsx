
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import CategoryCircle from "@/components/CategoryCircle";
import AdvertSpace from "@/components/AdvertSpace";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TopCategories = [
  { 
    name: "Cereals", 
    link: "/directory?category=cereals",
    image: "https://wsgsygmyyiybfaynmzok.supabase.co/storage/v1/object/public/southsudan/cereals.jpg"
  },
  { 
    name: "Legumes", 
    link: "/directory?category=legumes",
    image: "https://wsgsygmyyiybfaynmzok.supabase.co/storage/v1/object/public/southsudan/legumes.jpg"
  },
  { 
    name: "Vegetables", 
    link: "/directory?category=vegetables",
    image: "https://wsgsygmyyiybfaynmzok.supabase.co/storage/v1/object/public/southsudan/vegetables.jpg"
  },
  { 
    name: "Fruits", 
    link: "/directory?category=fruits",
    image: "https://wsgsygmyyiybfaynmzok.supabase.co/storage/v1/object/public/southsudan/fruits.jpg"
  },
  { 
    name: "Tubers", 
    link: "/directory?category=tubers",
    image: "https://wsgsygmyyiybfaynmzok.supabase.co/storage/v1/object/public/southsudan/tubers.jpg"
  },
];

const BottomCategories = [
  { 
    name: "Poultry", 
    link: "/directory?category=poultry",
    image: "https://wsgsygmyyiybfaynmzok.supabase.co/storage/v1/object/public/southsudan/poultry.jpg"
  },
  { 
    name: "Livestock", 
    link: "/directory?category=livestock",
    image: "https://wsgsygmyyiybfaynmzok.supabase.co/storage/v1/object/public/southsudan/livestock.jpg"
  },
  { 
    name: "Cash crops", 
    link: "/directory?category=cash-crops",
    image: "https://wsgsygmyyiybfaynmzok.supabase.co/storage/v1/object/public/southsudan/cash-crops.jpg"
  },
  { 
    name: "Fish & honey", 
    link: "/directory?category=fish-honey",
    image: "https://wsgsygmyyiybfaynmzok.supabase.co/storage/v1/object/public/southsudan/fish-honey.jpg"
  },
  { 
    name: "Agro-forestry", 
    link: "/directory?category=agroforestry",
    image: "https://wsgsygmyyiybfaynmzok.supabase.co/storage/v1/object/public/southsudan/agroforestry.jpg"
  },
];

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

const HomePage = () => {
  return (
    <div className="space-y-8">
      {/* Hero Carousel */}
      <Carousel className="w-full">
        <CarouselContent>
          {sliderImages.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="p-1 h-64 sm:h-80">
                <div 
                  className="flex items-center justify-center h-full rounded-md relative bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.url})` }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40 rounded-md"></div>
                  <div className="relative text-center text-white p-6">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">{slide.title}</h2>
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
        <CarouselPrevious className="left-2 lg:-left-12" />
        <CarouselNext className="right-2 lg:-right-12" />
      </Carousel>

      {/* Upper Categories */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-agro-blue">Agricultural Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {TopCategories.map((category) => (
            <Link 
              key={category.name} 
              to={category.link}
              className="relative overflow-hidden rounded-lg group"
            >
              <div 
                className="h-40 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundImage: `url(${category.image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">{category.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Middle Advert */}
      <AdvertSpace className="h-32 sm:h-40" />

      {/* Bottom Categories */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-agro-blue">More Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {BottomCategories.map((category) => (
            <Link 
              key={category.name} 
              to={category.link}
              className="relative overflow-hidden rounded-lg group"
            >
              <div 
                className="h-40 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundImage: `url(${category.image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-xl font-semibold">{category.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Additional Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Podcasts Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold bg-agro-blue text-white p-2 rounded-t-md">Podcasts</h3>
          <div className="p-2 space-y-2">
            <div className="flex items-center gap-2 border-b pb-2">
              <div className="bg-agro-green p-2 rounded-full">🎙️</div>
              <span className="font-medium">Modern Farming Techniques</span>
            </div>
            <div className="flex items-center gap-2 border-b pb-2">
              <div className="bg-agro-green p-2 rounded-full">🎙️</div>
              <span className="font-medium">Market Access Strategies</span>
            </div>
            <Link to="/podcasts" className="inline-block text-agro-blue hover:underline mt-2">
              View all podcasts →
            </Link>
          </div>
        </div>

        {/* Report Disease Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold bg-red-600 text-white p-2 rounded-t-md">
            Report Disease & Pest Outbreak!!!
          </h3>
          <div className="p-2">
            <p className="mb-3">
              Spotted a disease or pest outbreak? Report it immediately to help protect crops in your area.
            </p>
            <Link to="/disease-report">
              <Button className="bg-red-600 hover:bg-red-700 w-full">
                Report Now
              </Button>
            </Link>
          </div>
        </div>

        {/* YouTube Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold bg-red-700 text-white p-2 rounded-t-md">YouTube</h3>
          <div className="p-2">
            <div className="bg-gray-200 h-32 flex items-center justify-center rounded">
              <span className="text-gray-500">Featured Video</span>
            </div>
            <Link to="/videos" className="inline-block text-agro-blue hover:underline mt-2">
              View all videos →
            </Link>
          </div>
        </div>
      </div>

      {/* Side Advert (visible on larger screens) */}
      <div className="hidden md:block fixed right-4 top-1/3 w-48">
        <AdvertSpace text="Advert Space" className="h-64" />
      </div>
    </div>
  );
};

export default HomePage;
