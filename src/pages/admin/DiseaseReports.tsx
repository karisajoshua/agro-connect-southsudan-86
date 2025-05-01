
import { useState } from "react";
import { Bug, Search, Filter, Map } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";

// Mock data for disease reports
const diseaseReports = [
  {
    id: 1,
    reporter: "John Deng",
    phone: "+211 92 345 6789",
    location: "Juba, Central Equatoria",
    coordinates: "4.8517° N, 31.5825° E",
    cropType: "Maize",
    diseaseType: "Fall Armyworm",
    affectedArea: "5 acres",
    reportDate: "2025-04-28",
    status: "Pending",
    severity: "High",
  },
  {
    id: 2,
    reporter: "Mary Wani",
    phone: "+211 91 234 5678",
    location: "Torit, Eastern Equatoria",
    coordinates: "4.4111° N, 32.5705° E",
    cropType: "Sorghum",
    diseaseType: "Rust",
    affectedArea: "3 acres",
    reportDate: "2025-04-27",
    status: "Under Investigation",
    severity: "Medium",
  },
  {
    id: 3,
    reporter: "Samuel Kiir",
    phone: "+211 92 765 4321",
    location: "Wau, Western Bahr el Ghazal",
    coordinates: "7.7000° N, 28.0000° E",
    cropType: "Cassava",
    diseaseType: "Mosaic Virus",
    affectedArea: "8 acres",
    reportDate: "2025-04-26",
    status: "Escalated",
    severity: "Critical",
  },
  {
    id: 4,
    reporter: "Grace Akol",
    phone: "+211 91 876 5432",
    location: "Malakal, Upper Nile",
    coordinates: "9.5361° N, 31.6470° E",
    cropType: "Rice",
    diseaseType: "Leaf Blight",
    affectedArea: "2 acres",
    reportDate: "2025-04-25",
    status: "Resolved",
    severity: "Low",
  },
  {
    id: 5,
    reporter: "David Atem",
    phone: "+211 92 123 4567",
    location: "Bor, Jonglei",
    coordinates: "6.2088° N, 31.5580° E",
    cropType: "Vegetables",
    diseaseType: "Aphids",
    affectedArea: "1 acre",
    reportDate: "2025-04-24",
    status: "Confirmed",
    severity: "Medium",
  },
  {
    id: 6,
    reporter: "Sarah Nyanath",
    phone: "+211 91 345 6789",
    location: "Bentiu, Unity",
    coordinates: "9.2333° N, 29.8333° E",
    cropType: "Groundnuts",
    diseaseType: "Root Rot",
    affectedArea: "4 acres",
    reportDate: "2025-04-23",
    status: "Pending",
    severity: "High",
  },
];

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  "Under Investigation": "bg-blue-100 text-blue-800",
  Confirmed: "bg-orange-100 text-orange-800",
  Escalated: "bg-red-100 text-red-800",
  Resolved: "bg-green-100 text-green-800",
};

const severityColors = {
  Low: "bg-blue-100 text-blue-800",
  Medium: "bg-yellow-100 text-yellow-800",
  High: "bg-orange-100 text-orange-800",
  Critical: "bg-red-100 text-red-800",
};

const DiseaseReports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [severityFilter, setSeverityFilter] = useState<string | undefined>();

  const filteredReports = diseaseReports.filter((report) => {
    // Apply search filter
    const matchesSearch =
      searchTerm === "" ||
      report.reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.cropType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.diseaseType.toLowerCase().includes(searchTerm.toLowerCase());

    // Apply status filter
    const matchesStatus = !statusFilter || report.status === statusFilter;

    // Apply severity filter
    const matchesSeverity = !severityFilter || report.severity === severityFilter;

    return matchesSearch && matchesStatus && matchesSeverity;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bug className="h-6 w-6 text-red-600" />
          Disease & Pest Reports
        </h1>
        <Button>
          <Map className="mr-2 h-4 w-4" />
          View Map
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Statuses</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Under Investigation">Under Investigation</SelectItem>
            <SelectItem value="Confirmed">Confirmed</SelectItem>
            <SelectItem value="Escalated">Escalated</SelectItem>
            <SelectItem value="Resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Severities</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Critical">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Reports</p>
              <p className="text-2xl font-bold">{diseaseReports.length}</p>
            </div>
            <div className="p-2 bg-gray-100 rounded-full">
              <Bug className="h-5 w-5 text-gray-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-2xl font-bold">
                {diseaseReports.filter((r) => r.status === "Pending").length}
              </p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-full">
              <Bug className="h-5 w-5 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Critical</p>
              <p className="text-2xl font-bold">
                {diseaseReports.filter((r) => r.severity === "Critical").length}
              </p>
            </div>
            <div className="p-2 bg-red-100 rounded-full">
              <Bug className="h-5 w-5 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Resolved</p>
              <p className="text-2xl font-bold">
                {diseaseReports.filter((r) => r.status === "Resolved").length}
              </p>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <Bug className="h-5 w-5 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reporter</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Crop</TableHead>
                <TableHead>Disease/Pest</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.reporter}</TableCell>
                  <TableCell>{report.location}</TableCell>
                  <TableCell>{report.cropType}</TableCell>
                  <TableCell>{report.diseaseType}</TableCell>
                  <TableCell>{report.affectedArea}</TableCell>
                  <TableCell>{report.reportDate}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        statusColors[report.status as keyof typeof statusColors]
                      }`}
                    >
                      {report.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        severityColors[report.severity as keyof typeof severityColors]
                      }`}
                    >
                      {report.severity}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiseaseReports;
