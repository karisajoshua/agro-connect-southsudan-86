
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tutorials = [
  {
    id: 1,
    title: "Soil Preparation Basics",
    category: "Crop Farming",
    thumbnail: "/placeholder.svg",
    duration: "15 minutes"
  },
  {
    id: 2,
    title: "Effective Irrigation Techniques",
    category: "Crop Farming",
    thumbnail: "/placeholder.svg",
    duration: "20 minutes"
  },
  {
    id: 3,
    title: "Livestock Feeding Fundamentals",
    category: "Livestock",
    thumbnail: "/placeholder.svg",
    duration: "18 minutes"
  },
  {
    id: 4,
    title: "Basic Poultry Management",
    category: "Poultry",
    thumbnail: "/placeholder.svg",
    duration: "25 minutes"
  },
  {
    id: 5,
    title: "Fish Farming for Beginners",
    category: "Aquaculture",
    thumbnail: "/placeholder.svg",
    duration: "30 minutes"
  },
  {
    id: 6,
    title: "Marketing Agricultural Products",
    category: "Business",
    thumbnail: "/placeholder.svg",
    duration: "22 minutes"
  }
];

const Tutorials = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-agro-blue mb-6">Farming Tutorials</h1>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="crop">Crop Farming</TabsTrigger>
          <TabsTrigger value="livestock">Livestock</TabsTrigger>
          <TabsTrigger value="poultry">Poultry</TabsTrigger>
          <TabsTrigger value="aquaculture">Aquaculture</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((tutorial) => (
              <Card key={tutorial.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                <img 
                  src={tutorial.thumbnail} 
                  alt={tutorial.title} 
                  className="w-full h-40 object-cover"
                />
                <CardHeader>
                  <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{tutorial.category}</span>
                    <span>{tutorial.duration}</span>
                  </div>
                </CardContent>
                <CardFooter className="bg-agro-blue bg-opacity-10">
                  <div className="flex justify-center w-full">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                    </svg>
                    <span className="ml-2">Watch Tutorial</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="crop">
          <p className="p-4 text-center">Crop farming tutorials will be displayed here.</p>
        </TabsContent>
        
        <TabsContent value="livestock">
          <p className="p-4 text-center">Livestock tutorials will be displayed here.</p>
        </TabsContent>
        
        <TabsContent value="poultry">
          <p className="p-4 text-center">Poultry tutorials will be displayed here.</p>
        </TabsContent>
        
        <TabsContent value="aquaculture">
          <p className="p-4 text-center">Aquaculture tutorials will be displayed here.</p>
        </TabsContent>
        
        <TabsContent value="business">
          <p className="p-4 text-center">Business tutorials will be displayed here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tutorials;
