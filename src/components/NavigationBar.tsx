
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AdminLink from "./AdminLink";

interface NavigationBarProps {
  toggleSidebar: () => void;
}

const NavigationBar = ({ toggleSidebar }: NavigationBarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Directory", path: "/directory" },
    { name: "Tenders", path: "/tenders" },
    { name: "News", path: "/news" },
    { name: "Tutorials", path: "/tutorials" },
    { name: "Trainings", path: "/trainings" },
    { name: "Consultants", path: "/consultants" },
    { name: "Publications", path: "/publications" },
    { name: "Videos", path: "/videos" },
    { name: "Podcasts", path: "/podcasts" },
    { name: "FAQs", path: "/faqs" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <nav className="bg-agro-blue text-white py-2 sticky top-[88px] z-40">
      <div className="container mx-auto flex justify-between items-center">
        {/* Sidebar Toggle for Mobile */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-white hover:bg-agro-green/20"
        >
          <Menu size={20} />
        </Button>

        {/* Navigation Links */}
        <div className="hidden lg:flex space-x-4 overflow-x-auto">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 text-sm hover:bg-agro-green/20 rounded-md whitespace-nowrap transition-colors ${
                location.pathname === link.path ? "bg-agro-green/20" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Admin Link */}
        <AdminLink />

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="text-white hover:bg-agro-green/20"
              >
                Menu
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[75vw] sm:max-w-sm p-0">
              <div className="flex flex-col h-full bg-white">
                <div className="p-4 bg-agro-blue text-white font-bold">
                  Main Menu
                </div>
                <nav className="flex flex-col p-4 overflow-y-auto">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`px-4 py-3 text-agro-blue hover:bg-agro-green/10 rounded-md transition-colors ${
                        location.pathname === link.path
                          ? "bg-agro-green/20 font-medium"
                          : ""
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
