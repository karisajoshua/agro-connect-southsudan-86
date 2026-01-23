import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Youtube, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSubscribeNewsletter } from "@/hooks/useNewsletter";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address");

const Footer = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const subscribeNewsletter = useSubscribeNewsletter();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast({
        title: "Invalid email",
        description: result.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    subscribeNewsletter.mutate(email, {
      onSuccess: () => {
        toast({
          title: "Subscription successful!",
          description: "Thank you for subscribing to our newsletter.",
        });
        setEmail("");
      },
    });
  };
  return <footer className="bg-agro-blue text-white">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-semibold mb-3">About Us</h3>
            <p className="text-sm opacity-80">
              An initiative of Quantum Consult that strives for a ready market, for a highly productive farmer in a vibrant agri-business sector for a food secure South Sudan.
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
                onChange={e => setEmail(e.target.value)} 
                className="bg-white/20 border-white/10 focus:border-white placeholder:text-white/50 text-white"
                disabled={subscribeNewsletter.isPending}
              />
              <Button 
                type="submit" 
                className="bg-agro-green text-agro-blue hover:bg-agro-green/90"
                disabled={subscribeNewsletter.isPending}
              >
                {subscribeNewsletter.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          </div>
          
          {/* Contact & Social */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Connect With Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@ssdagromarketplace.org</span>
              </li>
              <li className="flex items-center gap-2">
                <Youtube size={16} />
                <a 
                  href="https://www.youtube.com/@southsudanagromarketplace6933" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  YouTube Channel
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <a 
                  href="https://www.facebook.com/profile.php?id=100083286009559" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Facebook Page
                </a>
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
          <p>© {new Date().getFullYear()} South Sudan Agro Marketplace. All rights reserved.</p>
          <p className="mt-1">Powered by Texcortech Systems</p>
        </div>
      </div>
    </footer>;
};
export default Footer;