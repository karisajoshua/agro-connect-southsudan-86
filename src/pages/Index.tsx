
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import CategoryCircle from "@/components/CategoryCircle";
import AdvertSpace from "@/components/AdvertSpace";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TopCategories = [
  { name: "Cereals", link: "/directory?category=cereals" },
  { name: "Legumes", link: "/directory?category=legumes" },
  { name: "Vegetables", link: "/directory?category=vegetables" },
  { name: "Fruits", link: "/directory?category=fruits" },
  { name: "Tubers", link: "/directory?category=tubers" },
];

const BottomCategories = [
  { name: "Poultry", link: "/directory?category=poultry" },
  { name: "Livestock", link: "/directory?category=livestock" },
  { name: "Cash crops", link: "/directory?category=cash-crops" },
  { name: "Fish & honey", link: "/directory?category=fish-honey" },
  { name: "Agro-forestry", link: "/directory?category=agroforestry" },
];

const HomePage = () => {
  return (
    <div className="space-y-8">
      {/* Hero Carousel */}
      <Carousel className="w-full">
        <CarouselContent>
          {[1, 2, 3].map((item) => (
            <CarouselItem key={item}>
              <div className="p-1 h-64 sm:h-80">
                <div className="flex items-center justify-center h-full bg-agro-blue rounded-md relative">
                  <div className="absolute inset-0 bg-black bg-opacity-30 rounded-md"></div>
                  <div className="relative text-center text-white p-6">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                      {item === 1 ? "Connect with Markets" : 
                       item === 2 ? "Access Agricultural Services" : "Learn Farming Techniques"}
                    </h2>
                    <p className="text-lg mb-4 max-w-2xl">
                      {item === 1 ? "Find buyers for your agricultural products and connect with markets across South Sudan." : 
                       item === 2 ? "Access high-quality agricultural services and inputs for improved farming." : 
                       "Learn modern farming techniques to increase your productivity and income."}
                    </p>
                    <Button className="bg-agro-green text-agro-blue hover:bg-agro-green/90">
                      {item === 1 ? "Explore Directory" : 
                       item === 2 ? "Browse Services" : "View Tutorials"}
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Upper Categories */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-agro-blue">Agricultural Products</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {TopCategories.map((category) => (
            <CategoryCircle key={category.name} name={category.name} link={category.link} />
          ))}
        </div>
      </section>

      {/* Middle Advert */}
      <AdvertSpace className="h-32 sm:h-40" />

      {/* Bottom Categories */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-agro-blue">More Categories</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {BottomCategories.map((category) => (
            <CategoryCircle key={category.name} name={category.name} link={category.link} />
          ))}
        </div>
      </section>

      {/* Bottom Advert */}
      <AdvertSpace className="h-32 sm:h-40" />

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
