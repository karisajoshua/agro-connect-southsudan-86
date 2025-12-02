import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegisterBusinessModal from "@/components/directory/RegisterBusinessModal";
import { useBusinesses } from "@/hooks/useBusinesses";
import { Phone, MapPin, Package } from "lucide-react";

const Directory = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [registerBusinessModalOpen, setRegisterBusinessModalOpen] = useState(false);
  
  const { data: businesses = [], isLoading: loading } = useBusinesses();

  // Get category and product from URL params
  useEffect(() => {
    const category = searchParams.get("category");
    const product = searchParams.get("product");
    
    if (category) setSelectedCategory(category);
    if (product) setSelectedProduct(product);
  }, [searchParams]);
  
  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = 
      business.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (business.description?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (business.products_services?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory 
      ? business.business_type.toLowerCase().includes(selectedCategory.toLowerCase())
      : true;
    
    const matchesProduct = selectedProduct
      ? (business.products_services?.toLowerCase() || "").includes(selectedProduct.toLowerCase())
      : true;
    
    const locationStr = typeof business.location === 'object' 
      ? JSON.stringify(business.location).toLowerCase()
      : String(business.location || "").toLowerCase();
    
    const matchesLocation = selectedLocation
      ? locationStr.includes(selectedLocation.toLowerCase())
      : true;
    
    return matchesSearch && matchesCategory && matchesProduct && matchesLocation;
  });
  
  return (
    <div className="container mx-auto py-6">
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
          
          {selectedProduct && (
            <div className="mb-4 p-3 bg-agro-blue/10 rounded-lg">
              <p className="text-sm">
                <strong>Showing vendors for:</strong> {selectedProduct}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedProduct("");
                    window.history.pushState({}, "", "/directory");
                  }}
                  className="ml-2"
                >
                  Clear filter
                </Button>
              </p>
            </div>
          )}

          {loading ? (
            <div className="text-center py-10">
              <p>Loading vendors...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBusinesses.map((business) => {
                const locationData = typeof business.location === 'object' 
                  ? business.location as any
                  : { city: "N/A" };
                
                return (
                  <Card key={business.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-agro-blue">{business.business_name}</CardTitle>
                      <CardDescription className="capitalize">{business.business_type}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start gap-2">
                          <Package className="w-4 h-4 mt-0.5 text-agro-green flex-shrink-0" />
                          <div>
                            <strong>Products:</strong> {business.products_services || "Not specified"}
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 mt-0.5 text-agro-blue flex-shrink-0" />
                          <div>
                            <strong>Location:</strong> {
                              locationData.address && locationData.state 
                                ? `${locationData.address}, ${locationData.state}`
                                : locationData.address || locationData.state || locationData.city || locationData.district || "N/A"
                            }
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <Phone className="w-4 h-4 mt-0.5 text-agro-orange flex-shrink-0" />
                          <div>
                            <strong>Contact:</strong> {business.phone}
                          </div>
                        </div>
                        
                        {business.description && (
                          <p className="mt-2 text-muted-foreground line-clamp-2">
                            {business.description}
                          </p>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <a href={`tel:${business.phone}`}>Contact Vendor</a>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
              
              {filteredBusinesses.length === 0 && (
                <div className="col-span-full text-center py-10">
                  <p className="text-muted-foreground">
                    {selectedProduct 
                      ? `No vendors found for "${selectedProduct}". Try clearing the filter or register your business.`
                      : "No vendors match your search criteria."
                    }
                  </p>
                </div>
              )}
            </div>
          )}
          
          <div className="mt-8 text-center">
            <Button 
              variant="outline" 
              onClick={() => setRegisterBusinessModalOpen(true)}
            >
              Register Your Business
            </Button>
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
      
      <RegisterBusinessModal 
        open={registerBusinessModalOpen}
        onClose={() => setRegisterBusinessModalOpen(false)}
      />
    </div>
  );
};

export default Directory;
