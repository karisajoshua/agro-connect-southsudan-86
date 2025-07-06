
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TopHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Section: Logo + Search Bar */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center p-2 space-y-2 md:space-y-0">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="w-36 h-20 flex items-center mr-3">
              <img
                src="https://wsgsygmyyiybfaynmzok.supabase.co/storage/v1/object/public/southsudan//ssd%20logo.png"
                alt="South Sudan Agro Marketplace Logo"
                className="object-contain w-full h-full"
              />
            </div>
            <div className="text-left">
              <h1 className="text-lg font-bold text-agro-blue"></h1>
              <p className="text-sm text-agro-green font-medium"></p>
            </div>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-1/3">
          <form onSubmit={handleSearch} className="flex">
            <Input
              type="search"
              placeholder="Search products, suppliers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0 border-r-0"
            />
            <Button
              type="submit"
              className="rounded-l-none bg-agro-blue hover:bg-agro-blue/90"
            >
              <Search size={18} />
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
