
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tenders = [
  {
    id: 1,
    title: "Supply of Agricultural Equipment",
    organization: "Ministry of Agriculture",
    deadline: "2025-05-15",
    location: "Juba, South Sudan",
    description: "Tender for the supply of agricultural equipment including tractors and irrigation systems."
  },
  {
    id: 2,
    title: "Maize Collection and Distribution",
    organization: "World Food Programme",
    deadline: "2025-05-20",
    location: "Multiple Locations",
    description: "Seeking suppliers for large quantities of maize for humanitarian distribution."
  },
  {
    id: 3,
    title: "Agricultural Training Services",
    organization: "FAO",
    deadline: "2025-06-01",
    location: "Wau, South Sudan",
    description: "Provision of training services to farmers on modern agricultural practices."
  }
];

const Tenders = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-agro-blue mb-6">Latest Tenders</h1>
      
      <div className="grid gap-6">
        {tenders.map((tender) => (
          <Card key={tender.id}>
            <CardHeader>
              <CardTitle>{tender.title}</CardTitle>
              <CardDescription>{tender.organization}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div><strong>Deadline:</strong> {tender.deadline}</div>
                <div><strong>Location:</strong> {tender.location}</div>
                <p className="mt-2">{tender.description}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-agro-blue hover:bg-blue-800">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Tenders;
