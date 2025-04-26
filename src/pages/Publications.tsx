
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const publications = [
  {
    id: 1,
    title: "South Sudan Agricultural Sector Review 2025",
    publisher: "Ministry of Agriculture",
    year: "2025",
    type: "Report",
    pages: "120",
    fileType: "PDF",
    summary: "A comprehensive review of South Sudan's agricultural sector performance, challenges, and opportunities."
  },
  {
    id: 2,
    title: "Climate-Smart Agriculture for South Sudan",
    publisher: "FAO",
    year: "2024",
    type: "Guide",
    pages: "85",
    fileType: "PDF",
    summary: "Practical guidelines for implementing climate-smart agricultural practices in South Sudan."
  },
  {
    id: 3,
    title: "Market Assessment for Agricultural Products in South Sudan",
    publisher: "World Bank",
    year: "2024",
    type: "Report",
    pages: "95",
    fileType: "PDF",
    summary: "Analysis of market dynamics for key agricultural products across different regions of South Sudan."
  },
  {
    id: 4,
    title: "Cassava Production Manual",
    publisher: "Quantum Consult",
    year: "2023",
    type: "Manual",
    pages: "45",
    fileType: "PDF",
    summary: "Step-by-step guide for cassava cultivation, harvesting, and post-harvest handling."
  },
  {
    id: 5,
    title: "Livestock Vaccination Calendar",
    publisher: "Ministry of Livestock",
    year: "2025",
    type: "Calendar",
    pages: "12",
    fileType: "PDF",
    summary: "Annual calendar for livestock vaccination schedules across different regions of South Sudan."
  }
];

const Publications = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-agro-blue mb-6">Publications & Reports</h1>
      
      <div className="mb-8 bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input placeholder="Search publications..." />
          
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Publication type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="report">Report</SelectItem>
              <SelectItem value="guide">Guide</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
              <SelectItem value="calendar">Calendar</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Publisher" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Publishers</SelectItem>
              <SelectItem value="ministry">Ministry of Agriculture</SelectItem>
              <SelectItem value="fao">FAO</SelectItem>
              <SelectItem value="worldbank">World Bank</SelectItem>
              <SelectItem value="quantum">Quantum Consult</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {publications.map((pub) => (
          <Card key={pub.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{pub.title}</CardTitle>
                  <CardDescription>{pub.publisher}, {pub.year}</CardDescription>
                </div>
                <div className="bg-agro-blue text-white text-xs px-2 py-1 rounded">
                  {pub.fileType}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div><strong>Type:</strong> {pub.type}</div>
                <div><strong>Pages:</strong> {pub.pages}</div>
                <p className="mt-2">{pub.summary}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Preview</Button>
              <Button className="bg-agro-blue hover:bg-blue-800">Download</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-6 flex justify-center">
        <div className="flex gap-2">
          <Button variant="outline" disabled>Previous</Button>
          <Button variant="outline" className="bg-agro-blue text-white">1</Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default Publications;
