
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const consultants = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    photo: "/placeholder.svg",
    specialty: "Crop Production",
    experience: "15+ years",
    location: "Juba",
    languages: ["English", "Arabic", "Dinka"],
    availability: "Available",
    bio: "Agricultural specialist with extensive experience in cereal crops and sustainable farming techniques in East Africa."
  },
  {
    id: 2,
    name: "James Mading",
    photo: "/placeholder.svg",
    specialty: "Livestock Management",
    experience: "10+ years",
    location: "Wau",
    languages: ["English", "Arabic", "Nuer"],
    availability: "Available",
    bio: "Expert in livestock health, breeding programs, and sustainable pastoral practices in South Sudan."
  },
  {
    id: 3,
    name: "Elizabeth Nyakong",
    photo: "/placeholder.svg",
    specialty: "Agricultural Economics",
    experience: "8+ years",
    location: "Remote/Online",
    languages: ["English", "Arabic"],
    availability: "Busy until May 20",
    bio: "Specialist in agricultural markets, value chains, and cooperative development for rural communities."
  },
  {
    id: 4,
    name: "Dr. Peter Wani",
    photo: "/placeholder.svg",
    specialty: "Soil Science",
    experience: "12+ years",
    location: "Yei",
    languages: ["English", "Arabic", "Bari"],
    availability: "Available",
    bio: "Expert in soil fertility management, conservation agriculture, and climate-smart farming practices."
  }
];

const Consultants = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-agro-blue mb-6">Agricultural Consultants</h1>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="crops">Crops</TabsTrigger>
          <TabsTrigger value="livestock">Livestock</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {consultants.map((consultant) => (
              <Card key={consultant.id} className="overflow-hidden">
                <div className="bg-gray-100 p-4 flex justify-center">
                  <img 
                    src={consultant.photo} 
                    alt={consultant.name} 
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{consultant.name}</CardTitle>
                      <CardDescription>{consultant.specialty}</CardDescription>
                    </div>
                    <Badge variant={consultant.availability === "Available" ? "default" : "outline"}>
                      {consultant.availability}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div><strong>Experience:</strong> {consultant.experience}</div>
                    <div><strong>Location:</strong> {consultant.location}</div>
                    <div><strong>Languages:</strong> {consultant.languages.join(", ")}</div>
                    <p className="mt-2">{consultant.bio}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">View Profile</Button>
                  <Button className="bg-agro-green text-agro-blue hover:bg-agro-green/90">
                    Contact
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <p className="mb-4">Are you an agricultural expert interested in joining our platform?</p>
            <Button className="bg-agro-blue hover:bg-blue-800">Register as Consultant</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="crops">
          <p className="p-4 text-center">Crop specialists will be displayed here.</p>
        </TabsContent>
        
        <TabsContent value="livestock">
          <p className="p-4 text-center">Livestock specialists will be displayed here.</p>
        </TabsContent>
        
        <TabsContent value="business">
          <p className="p-4 text-center">Business advisors will be displayed here.</p>
        </TabsContent>
        
        <TabsContent value="technical">
          <p className="p-4 text-center">Technical specialists will be displayed here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Consultants;
