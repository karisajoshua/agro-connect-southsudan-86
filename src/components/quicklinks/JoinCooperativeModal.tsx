
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Users } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface JoinCooperativeModalProps {
  open: boolean;
  onClose: () => void;
}

const JoinCooperativeModal = ({ open, onClose }: JoinCooperativeModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    farmerType: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, farmerType: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.phone || !formData.location || !formData.farmerType) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Success toast
    toast({
      title: "Request Submitted!",
      description: "Your cooperative membership request has been received. We'll contact you within 48 hours.",
    });
    
    // Reset form and close modal
    setFormData({
      name: "",
      phone: "",
      location: "",
      farmerType: "",
      message: ""
    });
    
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-agro-blue flex items-center gap-2">
            <Users size={20} /> Join a Cooperative
          </DialogTitle>
          <DialogDescription>
            Connect with a farming cooperative in your area to access shared resources, 
            markets, and knowledge.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Your name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
              <Input 
                id="phone" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="e.g. +211 91 234 5678"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location <span className="text-red-500">*</span></Label>
              <Input 
                id="location" 
                name="location" 
                value={formData.location} 
                onChange={handleChange} 
                placeholder="County, State"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="farmerType">Farmer Type <span className="text-red-500">*</span></Label>
              <Select onValueChange={handleSelectChange} value={formData.farmerType}>
                <SelectTrigger id="farmerType">
                  <SelectValue placeholder="Select farmer type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="smallholder">Smallholder Farmer</SelectItem>
                  <SelectItem value="medium">Medium-Scale Farmer</SelectItem>
                  <SelectItem value="commercial">Commercial Farmer</SelectItem>
                  <SelectItem value="livestock">Livestock Keeper</SelectItem>
                  <SelectItem value="mixed">Mixed Farming</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="message">Additional Information</Label>
              <Textarea 
                id="message" 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                placeholder="Tell us about your farming activities, challenges, and what you hope to gain from joining a cooperative."
                rows={4}
              />
            </div>
          </div>
          
          <div className="bg-agro-green bg-opacity-10 p-3 rounded-md mb-4">
            <h4 className="font-medium mb-1">Benefits of joining a cooperative:</h4>
            <ul className="list-disc pl-5 text-sm">
              <li>Access to shared equipment and resources</li>
              <li>Collective bargaining for better market prices</li>
              <li>Knowledge sharing and training opportunities</li>
              <li>Group purchasing discounts on inputs</li>
              <li>Access to financial services and loans</li>
            </ul>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-agro-blue hover:bg-blue-800">Submit Request</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JoinCooperativeModal;
