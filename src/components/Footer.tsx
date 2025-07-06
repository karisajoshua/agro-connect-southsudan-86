
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Youtube } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email) {
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
    }
  };
  
  return (
    <footer className="bg-agro-blue text-white">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-semibold mb-3">About Us</h3>
            <p className="text-sm opacity-80">
              South Sudan Agro Marketplace connects farmers, cooperatives, and agri-businesses 
              directly to markets, buyers, donors, and service providers to boost agricultural productivity.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/directory" className="hover:underline">Directory</Link></li>
              <li><Link to="/news" className="hover:underline">News</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Newsletter</h3>
            <p className="text-sm opacity-80 mb-3">
              Subscribe to receive updates on agricultural news, market prices, and opportunities.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/20 border-white/10 focus:border-white placeholder:text-white/50 text-white"
              />
              <Button type="submit" className="bg-agro-green text-agro-blue hover:bg-agro-green/90">
                Subscribe
              </Button>
            </form>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@ssudan-agromarket.org</span>
              </li>
              <li className="flex items-center gap-2">
                <Youtube size={16} />
                <span>South Sudan Agro Channel</span>
              </li>
            </ul>
            
            <div className="mt-4">
              <Link to="/donate">
                <Button className="bg-agro-orange hover:bg-agro-orange/90 text-white">
                  Donate
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm opacity-70">
          <div className="mb-3">
            <p>An initiative of Quantum Consult with support from partners</p>
          </div>
          <p>© {new Date().getFullYear()} South Sudan Agro Marketplace. All rights reserved.</p>
          <p className="mt-1">Powered by Texcortech Systems</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
