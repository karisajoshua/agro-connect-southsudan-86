
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const DiseaseReport = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    cropType: "",
    diseaseType: "",
    affectedArea: "",
    symptoms: "",
    photos: null as File | null
  });
  
  const { toast } = useToast();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, photos: e.target.files![0] }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation would be implemented here
    
    toast({
      title: "Report submitted!",
      description: "Your disease outbreak report has been submitted successfully. Our team will review it shortly.",
    });
    
    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      location: "",
      cropType: "",
      diseaseType: "",
      affectedArea: "",
      symptoms: "",
      photos: null
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader className="bg-red-600 text-white">
          <CardTitle>Report Disease & Pest Outbreak</CardTitle>
          <CardDescription className="text-white/80">
            Help protect South Sudan's crops by reporting disease outbreaks promptly
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="+211 XX XXX XXXX"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address (Optional)</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="County, State"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cropType">Crop Type</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange("cropType", value)}
                  value={formData.cropType}
                >
                  <SelectTrigger id="cropType">
                    <SelectValue placeholder="Select crop type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maize">Maize</SelectItem>
                    <SelectItem value="sorghum">Sorghum</SelectItem>
                    <SelectItem value="beans">Beans</SelectItem>
                    <SelectItem value="cassava">Cassava</SelectItem>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="fruit">Fruit Trees</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="diseaseType">Disease/Pest Type</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange("diseaseType", value)}
                  value={formData.diseaseType}
                >
                  <SelectTrigger id="diseaseType">
                    <SelectValue placeholder="Select disease/pest type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fall_armyworm">Fall Armyworm</SelectItem>
                    <SelectItem value="locusts">Locusts</SelectItem>
                    <SelectItem value="stem_borer">Stem Borer</SelectItem>
                    <SelectItem value="leaf_blight">Leaf Blight</SelectItem>
                    <SelectItem value="rust">Rust</SelectItem>
                    <SelectItem value="aphids">Aphids</SelectItem>
                    <SelectItem value="unknown">Unknown</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="affectedArea">Estimated Affected Area</Label>
                <Input
                  id="affectedArea"
                  name="affectedArea"
                  placeholder="e.g., 5 acres"
                  value={formData.affectedArea}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="photos">Upload Photos (Optional)</Label>
                <Input
                  id="photos"
                  name="photos"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </div>
            </div>
            
            <div className="space-y-2 mb-6">
              <Label htmlFor="symptoms">Describe Symptoms</Label>
              <Textarea
                id="symptoms"
                name="symptoms"
                placeholder="Please describe what you're seeing in the affected crops..."
                rows={5}
                value={formData.symptoms}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
              Submit Report
            </Button>
          </form>
        </CardContent>
        <CardFooter className="bg-red-50 flex flex-col items-start">
          <p className="text-sm">
            <strong>Note:</strong> Your report will be forwarded to the Ministry of Agriculture and 
            relevant agricultural agencies to coordinate response efforts.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DiseaseReport;
