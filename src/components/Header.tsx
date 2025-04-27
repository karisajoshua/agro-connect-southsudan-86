
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({
  toggleSidebar
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const navLinks = [{
    name: "Home",
    path: "/"
  }, {
    name: "About Us",
    path: "/about"
  }, {
    name: "Directory",
    path: "/directory"
  }, {
    name: "Tenders",
    path: "/tenders"
  }, {
    name: "News",
    path: "/news"
  }, {
    name: "Tutorials",
    path: "/tutorials"
  }, {
    name: "Trainings",
    path: "/trainings"
  }, {
    name: "Consultants",
    path: "/consultants"
  }, {
    name: "Publications",
    path: "/publications"
  }, {
    name: "Videos",
    path: "/videos"
  }, {
    name: "Podcasts",
    path: "/podcasts"
  }, {
    name: "FAQs",
    path: "/faqs"
  }, {
    name: "Contact Us",
    path: "/contact"
  }];

  return <header className="sticky top-0 z-50">
      <div className="bg-white p-2 shadow-sm px-4 py-2">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="https://wsgsygmyyiybfaynmzok.supabase.co/storage/v1/object/public/southsudan//ssd%20logo.png" 
                alt="South Sudan Agro Marketplace Logo" 
                className="w-12 h-12 mr-3 object-contain" 
              />
              <div className="text-left">
                <h1 className="text-lg font-bold text-agro-blue"></h1>
                <p className="text-sm text-agro-green font-medium"></p>
              </div>
            </Link>
          </div>
          
          <div className="w-full md:w-1/3">
            <form onSubmit={handleSearch} className="flex">
              <Input 
                type="search" 
                placeholder="Search products, suppliers..." 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
                className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0 border-r-0" 
              />
              <Button type="submit" className="rounded-l-none bg-agro-blue hover:bg-agro-blue/90">
                <Search size={18} />
              </Button>
            </form>
          </div>
        </div>
      </div>
      
      <nav className="bg-agro-blue text-white py-2">
        <div className="container mx-auto flex justify-between items-center">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-white hover:bg-agro-green/20">
            <Menu size={20} />
          </Button>
          
          <div className="hidden lg:flex space-x-4 overflow-x-auto">
            {navLinks.map(link => <Link key={link.path} to={link.path} className={`px-3 py-2 text-sm hover:bg-agro-green/20 rounded-md whitespace-nowrap transition-colors ${location.pathname === link.path ? "bg-agro-green/20" : ""}`}>
                {link.name}
              </Link>)}
          </div>
          
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-agro-green/20">
                  Menu
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[75vw] sm:max-w-sm p-0">
                <div className="flex flex-col h-full bg-white">
                  <div className="p-4 bg-agro-blue text-white font-bold">
                    Main Menu
                  </div>
                  <nav className="flex flex-col p-4 overflow-y-auto">
                    {navLinks.map(link => <Link key={link.path} to={link.path} className={`px-4 py-3 text-agro-blue hover:bg-agro-green/10 rounded-md transition-colors ${location.pathname === link.path ? "bg-agro-green/20 font-medium" : ""}`} onClick={() => setMobileMenuOpen(false)}>
                        {link.name}
                      </Link>)}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>;
};

export default Header;
