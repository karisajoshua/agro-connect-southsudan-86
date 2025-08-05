import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    userType: ""
  });
  
  const { toast } = useToast();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, userType: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.name || !formData.email || !formData.message || !formData.userType) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Message sent!",
      description: "Thank you for your message. We'll get back to you soon.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      userType: ""
    });
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-agro-blue mb-6">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Phone className="text-agro-blue" size={20} />
              <CardTitle>Phone</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base mb-2">Support Team</CardDescription>
            <p>+211 922 423 065</p>
            <p>+211 981 250 350</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="text-agro-blue" size={20} />
              <CardTitle>Email</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base mb-2">General Inquiries</CardDescription>
            <p>info@ssudan-agromarket.org</p>
            <CardDescription className="text-base mt-3 mb-1">Support</CardDescription>
            <p>support@ssudan-agromarket.org</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MapPin className="text-agro-blue" size={20} />
              <CardTitle>Address</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base mb-2">Main Office</CardDescription>
            <p>Juba Business Center</p>
            <p>Airport Road, Juba</p>
            <p>South Sudan</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name <span className="text-red-500">*</span></Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+211 XX XXX XXXX"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="userType">You are a <span className="text-red-500">*</span></Label>
              <Select onValueChange={handleSelectChange} value={formData.userType}>
                <SelectTrigger id="userType">
                  <SelectValue placeholder="Select your category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="farmer">Farmer</SelectItem>
                  <SelectItem value="cooperative">Cooperative</SelectItem>
                  <SelectItem value="buyer">Buyer</SelectItem>
                  <SelectItem value="supplier">Supplier</SelectItem>
                  <SelectItem value="ngo">NGO/Organization</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="How can we help you?"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Your Message <span className="text-red-500">*</span></Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Please type your message here..."
                rows={5}
              />
            </div>
            
            <Button type="submit" className="w-full bg-agro-blue hover:bg-blue-800">
              Send Message
            </Button>
          </form>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Visit Our Office</h2>
          <div className="bg-gray-300 h-80 rounded-lg flex items-center justify-center mb-6">
            <span className="text-gray-600">Map will be displayed here</span>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Office Hours</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="font-medium">Monday - Friday</div>
                <div>8:00 AM - 5:00 PM</div>
              </div>
              <div>
                <div className="font-medium">Saturday</div>
                <div>9:00 AM - 1:00 PM</div>
              </div>
              <div>
                <div className="font-medium">Sunday</div>
                <div>Closed</div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Connect with Us</h3>
              <div className="flex space-x-3">
                <Button variant="outline" size="icon" className="rounded-full">
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path>
                  </svg>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
