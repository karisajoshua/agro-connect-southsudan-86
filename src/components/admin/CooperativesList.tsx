
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Users, 
  Search, 
  Plus, 
  Filter, 
  Edit, 
  Trash2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Mock data for cooperatives
const cooperativesData = [
  {
    id: 1,
    name: "Juba Farmers Cooperative",
    location: "Juba, Central Equatoria",
    memberCount: 42,
    primaryActivity: "Crop Farming",
    establishedDate: "2023-02-15",
    status: "active",
    contact: "+211 928 123 456"
  },
  {
    id: 2,
    name: "Torit Agricultural Association",
    location: "Torit, Eastern Equatoria",
    memberCount: 28,
    primaryActivity: "Mixed Farming",
    establishedDate: "2022-11-03",
    status: "active",
    contact: "+211 927 345 678"
  },
  {
    id: 3,
    name: "Wau Livestock Group",
    location: "Wau, Western Bahr el Ghazal",
    memberCount: 35,
    primaryActivity: "Livestock",
    establishedDate: "2023-05-22",
    status: "pending",
    contact: "+211 925 567 890"
  },
  {
    id: 4,
    name: "Yei Coffee Growers",
    location: "Yei, Central Equatoria",
    memberCount: 19,
    primaryActivity: "Coffee Production",
    establishedDate: "2023-08-10",
    status: "active",
    contact: "+211 923 901 234"
  },
  {
    id: 5,
    name: "Malakal Fishing Cooperative",
    location: "Malakal, Upper Nile",
    memberCount: 24,
    primaryActivity: "Fishing",
    establishedDate: "2022-10-05",
    status: "inactive",
    contact: "+211 924 234 567"
  },
];

const CooperativesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [activityFilter, setActivityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter cooperatives based on search and filters
  const filteredCooperatives = cooperativesData.filter(coop => {
    const matchesSearch = coop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coop.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coop.primaryActivity.toLowerCase().includes(searchTerm.toLowerCase());
                         
    const matchesLocation = locationFilter === "all" || coop.location.includes(locationFilter);
    const matchesActivity = activityFilter === "all" || coop.primaryActivity === activityFilter;
    const matchesStatus = statusFilter === "all" || coop.status === statusFilter;
    
    return matchesSearch && matchesLocation && matchesActivity && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold">Cooperatives Management</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Register New Cooperative
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="col-span-1 md:col-span-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search cooperatives..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Central Equatoria">Central Equatoria</SelectItem>
                <SelectItem value="Eastern Equatoria">Eastern Equatoria</SelectItem>
                <SelectItem value="Western">Western Bahr el Ghazal</SelectItem>
                <SelectItem value="Upper Nile">Upper Nile</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Cooperatives Table */}
      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-base">
            Registered Cooperatives ({filteredCooperatives.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cooperative Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Primary Activity</TableHead>
                <TableHead>Established</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCooperatives.length > 0 ? (
                filteredCooperatives.map((coop) => (
                  <TableRow key={coop.id}>
                    <TableCell className="font-medium">{coop.name}</TableCell>
                    <TableCell>{coop.location}</TableCell>
                    <TableCell>{coop.memberCount}</TableCell>
                    <TableCell>{coop.primaryActivity}</TableCell>
                    <TableCell>{coop.establishedDate}</TableCell>
                    <TableCell>{getStatusBadge(coop.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" title="Edit">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                    No cooperatives found matching your filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-agro-blue bg-opacity-10 p-3 rounded-full">
                <Users className="h-6 w-6 text-agro-blue" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Members</p>
                <p className="text-2xl font-bold">148</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Filter className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Cooperatives</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Filter className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Applications</p>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CooperativesList;
