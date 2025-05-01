
import { useState } from "react";
import { Database, Search, Filter, Check, X } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";

// Mock data for business directory
const businesses = [
  {
    id: 1,
    name: "South Sudan Agro Supplies Ltd",
    category: "Supplier",
    subcategory: "Agricultural Inputs",
    location: "Juba, Central Equatoria",
    contactPerson: "James Wol",
    phone: "+211 92 345 6789",
    email: "info@ssagrosupplies.com",
    registrationDate: "2025-03-15",
    status: "Pending",
  },
  {
    id: 2,
    name: "Unity Farmers Cooperative",
    category: "Cooperative",
    subcategory: "Cereals & staples",
    location: "Bentiu, Unity",
    contactPerson: "Sarah Nyanath",
    phone: "+211 91 234 5678",
    email: "unityfarmers@gmail.com",
    registrationDate: "2025-03-12",
    status: "Approved",
  },
  {
    id: 3,
    name: "Jonglei Fresh Produce",
    category: "Producer",
    subcategory: "Vegetables",
    location: "Bor, Jonglei",
    contactPerson: "David Atem",
    phone: "+211 92 765 4321",
    email: "jongleifresh@gmail.com",
    registrationDate: "2025-03-10",
    status: "Approved",
  },
  {
    id: 4,
    name: "Upper Nile Rice Growers",
    category: "Producer",
    subcategory: "Cereals & staples",
    location: "Malakal, Upper Nile",
    contactPerson: "Grace Akol",
    phone: "+211 91 876 5432",
    email: "unrice@gmail.com",
    registrationDate: "2025-03-08",
    status: "Pending",
  },
  {
    id: 5,
    name: "Western Equatoria Coffee Company",
    category: "Producer",
    subcategory: "Cash & industrial crops",
    location: "Yambio, Western Equatoria",
    contactPerson: "Peter Marcello",
    phone: "+211 92 123 4567",
    email: "wecoffee@gmail.com",
    registrationDate: "2025-03-05",
    status: "Rejected",
  },
  {
    id: 6,
    name: "Lakes Livestock Traders",
    category: "Trader",
    subcategory: "Animals & by-products",
    location: "Rumbek, Lakes",
    contactPerson: "John Mabor",
    phone: "+211 91 345 6789",
    email: "lakeslivestock@gmail.com",
    registrationDate: "2025-03-01",
    status: "Approved",
  },
];

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Approved: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

const DirectoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>();
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const { toast } = useToast();

  const filteredBusinesses = businesses.filter((business) => {
    // Apply search filter
    const matchesSearch =
      searchTerm === "" ||
      business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());

    // Apply category filter
    const matchesCategory = !categoryFilter || business.category === categoryFilter;

    // Apply status filter
    const matchesStatus = !statusFilter || business.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleApprove = (id: number) => {
    toast({
      title: "Business Approved",
      description: `The business registration #${id} has been approved.`,
    });
    // In real app, update the status in the database
  };

  const handleReject = (id: number) => {
    toast({
      title: "Business Rejected",
      description: `The business registration #${id} has been rejected.`,
    });
    // In real app, update the status in the database
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Database className="h-6 w-6 text-agro-blue" />
          Business Directory Management
        </h1>
        <Button>Add New Business</Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search businesses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            <SelectItem value="Supplier">Supplier</SelectItem>
            <SelectItem value="Producer">Producer</SelectItem>
            <SelectItem value="Trader">Trader</SelectItem>
            <SelectItem value="Cooperative">Cooperative</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Statuses</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Businesses</p>
              <p className="text-2xl font-bold">{businesses.length}</p>
            </div>
            <div className="p-2 bg-gray-100 rounded-full">
              <Database className="h-5 w-5 text-gray-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Approvals</p>
              <p className="text-2xl font-bold">
                {businesses.filter((b) => b.status === "Pending").length}
              </p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-full">
              <Database className="h-5 w-5 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Approved</p>
              <p className="text-2xl font-bold">
                {businesses.filter((b) => b.status === "Approved").length}
              </p>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <Database className="h-5 w-5 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Businesses Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBusinesses.map((business) => (
                <TableRow key={business.id}>
                  <TableCell className="font-medium">{business.name}</TableCell>
                  <TableCell>
                    {business.category}
                    <div className="text-xs text-gray-500">{business.subcategory}</div>
                  </TableCell>
                  <TableCell>{business.location}</TableCell>
                  <TableCell>
                    {business.contactPerson}
                    <div className="text-xs text-gray-500">{business.phone}</div>
                  </TableCell>
                  <TableCell>{business.registrationDate}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        statusColors[business.status as keyof typeof statusColors]
                      }`}
                    >
                      {business.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    {business.status === "Pending" && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"
                          onClick={() => handleApprove(business.id)}
                        >
                          <Check className="h-4 w-4 mr-1" /> Approve
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                          onClick={() => handleReject(business.id)}
                        >
                          <X className="h-4 w-4 mr-1" /> Reject
                        </Button>
                      </>
                    )}
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

export default DirectoryManagement;
