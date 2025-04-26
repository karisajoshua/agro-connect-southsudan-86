import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
interface HeaderProps {
  toggleSidebar: () => void;
}
const Header = ({
  toggleSidebar
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality would be implemented here
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
      {/* Logo and Slogan */}
      <div className="bg-white p-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Link to="/" className="flex items-center">
              <img src="https://wsgsygmyyiybfaynmzok.supabase.co/storage/v1/object/public/southsudan//south%20sudan.jpeg" alt="South Sudan Agro Marketplace Logo" className="w-28 h-28 mr-3 object-cover" />
              <div>
                <h1 className="text-2xl font-bold text-agro-blue"></h1>
                <p className="text-agro-green text-sm font-medium"></p>
              </div>
            </Link>
          </div>
          
          <div className="w-full md:w-1/3">
            <form onSubmit={handleSearch} className="flex">
              <Input type="search" placeholder="Search products, suppliers..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0 border-r-0" />
              <Button type="submit" className="rounded-l-none bg-agro-blue hover:bg-blue-700">
                <Search size={18} />
              </Button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="bg-agro-blue text-white py-2">
        <div className="container mx-auto flex justify-between items-center">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-white hover:bg-blue-800">
            <Menu size={20} />
          </Button>
          
          <div className="hidden lg:flex space-x-4 overflow-x-auto">
            {navLinks.map(link => <Link key={link.path} to={link.path} className={`px-3 py-2 text-sm hover:bg-blue-800 rounded-md whitespace-nowrap transition-colors ${location.pathname === link.path ? "bg-blue-800" : ""}`}>
                {link.name}
              </Link>)}
          </div>
          
          {/* Mobile navigation dropdown would go here */}
          <div className="lg:hidden">
            {/* This would be expanded in a proper implementation */}
            <Button variant="ghost" className="text-white hover:bg-blue-800">
              Menu
            </Button>
          </div>
        </div>
      </nav>
    </header>;
};
export default Header;