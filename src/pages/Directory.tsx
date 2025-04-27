
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DirectoryItem {
  id: number;
  name: string;
  type: string;
  category: string;
  location: string;
  contact: string;
  description: string;
}

const directoryItems: DirectoryItem[] = [
  {
    id: 1,
    name: "Unity Farmers Cooperative",
    type: "Cooperative",
    category: "Multiple",
    location: "Juba, Central Equatoria",
    contact: "unity@example.com | +211 92 123 4567",
    description: "A cooperative of 150 farmers specializing in cereals and vegetables."
  },
  {
    id: 2,
    name: "Green Horizons Ltd",
    type: "Agro Input Supplier",
    category: "Seeds & Fertilizers",
    location: "Wau, Western Bahr el Ghazal",
    contact: "green@example.com | +211 92 987 6543",
    description: "Supplier of high-quality seeds, fertilizers and agricultural tools."
  },
  {
    id: 3,
    name: "South Sudan Livestock Association",
    type: "Association",
    category: "Livestock",
    location: "Malakal, Upper Nile",
    contact: "livestock@example.com | +211 91 456 7890",
    description: "Supporting livestock farmers with training and market access."
  },
  {
    id: 4,
    name: "Nile Transport Services",
    type: "Transporter",
    category: "Logistics",
    location: "Juba, Central Equatoria",
    contact: "nts@example.com | +211 92 567 8901",
    description: "Transportation services for agricultural products across South Sudan."
  },
  {
    id: 5,
    name: "Dr. James Agricultural Consulting",
    type: "Consultant",
    category: "Advisory",
    location: "Yambio, Western Equatoria",
    contact: "james@example.com | +211 91 234 5678",
    description: "Expert agricultural consulting services with focus on sustainable farming."
  }
];

const Directory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  
  const filteredItems = directoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    
    const matchesLocation = selectedLocation ? item.location.includes(selectedLocation) : true;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-agro-blue mb-6">Directory</h1>
      
      <Tabs defaultValue="all" className="w-full mb-6">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="cooperatives">Cooperatives</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="transporters">Transporters</TabsTrigger>
          <TabsTrigger value="consultants">Consultants</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Input
              placeholder="Search directory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            <Select onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-categories">All Categories</SelectItem>
                <SelectItem value="Multiple">Multiple</SelectItem>
                <SelectItem value="Seeds & Fertilizers">Seeds & Fertilizers</SelectItem>
                <SelectItem value="Livestock">Livestock</SelectItem>
                <SelectItem value="Logistics">Logistics</SelectItem>
                <SelectItem value="Advisory">Advisory</SelectItem>
              </SelectContent>
            </Select>
            
            <Select onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-locations">All Locations</SelectItem>
                <SelectItem value="Juba">Juba</SelectItem>
                <SelectItem value="Wau">Wau</SelectItem>
                <SelectItem value="Malakal">Malakal</SelectItem>
                <SelectItem value="Yambio">Yambio</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div><strong>Category:</strong> {item.category}</div>
                    <div><strong>Location:</strong> {item.location}</div>
                    <div><strong>Contact:</strong> {item.contact}</div>
                    <p className="mt-2">{item.description}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Profile</Button>
                </CardFooter>
              </Card>
            ))}
            
            {filteredItems.length === 0 && (
              <div className="col-span-full text-center py-10">
                <p>No directory items match your search criteria.</p>
              </div>
            )}
          </div>
          
          <div className="mt-8 text-center">
            <Button variant="outline">Register Your Business</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="cooperatives">
          <p className="p-4 text-center">Cooperatives directory content will be displayed here.</p>
        </TabsContent>
        
        <TabsContent value="suppliers">
          <p className="p-4 text-center">Suppliers directory content will be displayed here.</p>
        </TabsContent>
        
        <TabsContent value="transporters">
          <p className="p-4 text-center">Transporters directory content will be displayed here.</p>
        </TabsContent>
        
        <TabsContent value="consultants">
          <p className="p-4 text-center">Consultants directory content will be displayed here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Directory;
