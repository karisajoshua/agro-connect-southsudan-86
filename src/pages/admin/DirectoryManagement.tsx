import { useState } from "react";
import { Database, Search, Check, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
import { useBusinesses } from "@/hooks/useBusinesses";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const DirectoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();
  const { data: businesses, isLoading, refetch } = useBusinesses(false);

  const filteredBusinesses = (businesses || []).filter((business) => {
    const businessName = business.business_name?.toLowerCase() || "";
    const locationData = business.location as any;
    const location = (locationData?.address || locationData?.state || "").toLowerCase();
    const contact = business.contact_name?.toLowerCase() || "";

    const matchesSearch =
      searchTerm === "" ||
      businessName.includes(searchTerm.toLowerCase()) ||
      location.includes(searchTerm.toLowerCase()) ||
      contact.includes(searchTerm.toLowerCase());

    const matchesCategory = 
      categoryFilter === "all" || 
      business.business_type?.toLowerCase() === categoryFilter.toLowerCase();

    const matchesStatus = 
      statusFilter === "all" || 
      business.verification_status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleApprove = async (id: string) => {
    const { error } = await supabase
      .from("businesses")
      .update({ verification_status: "approved" })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to approve business",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Business Approved",
      description: "The business registration has been approved.",
    });
    refetch();
  };

  const handleReject = async (id: string) => {
    const { error } = await supabase
      .from("businesses")
      .update({ verification_status: "rejected" })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to reject business",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Business Rejected",
      description: "The business registration has been rejected.",
    });
    refetch();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Database className="h-6 w-6 text-blue-600" />
          Business Directory Management
        </h1>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
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
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="cooperative">Cooperative</SelectItem>
            <SelectItem value="supplier">Supplier</SelectItem>
            <SelectItem value="producer">Producer</SelectItem>
            <SelectItem value="trader">Trader</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Businesses</p>
              <p className="text-2xl font-bold">{businesses?.length || 0}</p>
            </div>
            <div className="p-2 bg-gray-100 rounded-full">
              <Database className="h-5 w-5 text-gray-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
              <p className="text-2xl font-bold">
                {businesses?.filter((b) => b.verification_status === "pending").length || 0}
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
              <p className="text-sm font-medium text-muted-foreground">Approved</p>
              <p className="text-2xl font-bold">
                {businesses?.filter((b) => b.verification_status === "approved").length || 0}
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
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBusinesses.length > 0 ? (
                filteredBusinesses.map((business) => {
                  const locationData = business.location as any;
                  return (
                    <TableRow key={business.id}>
                      <TableCell className="font-medium">{business.business_name}</TableCell>
                      <TableCell>
                        {business.business_type}
                        <div className="text-xs text-muted-foreground">
                          {business.category?.name || 'N/A'}
                        </div>
                      </TableCell>
                      <TableCell>
                        {locationData?.address || locationData?.state || 'N/A'}
                      </TableCell>
                      <TableCell>
                        {business.contact_name}
                        <div className="text-xs text-muted-foreground">{business.phone}</div>
                      </TableCell>
                      <TableCell>
                        {new Date(business.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            statusColors[business.verification_status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {business.verification_status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        {business.verification_status === "pending" && (
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
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    No businesses found matching your filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DirectoryManagement;
