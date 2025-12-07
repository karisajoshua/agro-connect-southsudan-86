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
  Filter, 
  Building2,
  Phone,
  Pencil
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
import { useCooperatives, useCooperativeStats } from "@/hooks/useCooperatives";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const CooperativesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCoop, setSelectedCoop] = useState<any>(null);
  const [memberCount, setMemberCount] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const { data: cooperatives, isLoading } = useCooperatives();
  const { data: stats } = useCooperativeStats();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleEditMembers = (coop: any) => {
    setSelectedCoop(coop);
    setMemberCount(String(coop.total_members || 0));
    setEditDialogOpen(true);
  };

  const handleUpdateMembers = async () => {
    if (!selectedCoop) return;
    
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from("cooperatives")
        .update({ total_members: parseInt(memberCount) || 0 })
        .eq("id", selectedCoop.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Member count updated successfully",
      });
      
      queryClient.invalidateQueries({ queryKey: ["cooperatives"] });
      queryClient.invalidateQueries({ queryKey: ["cooperative-stats"] });
      setEditDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update member count",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Filter cooperatives based on search and filters
  const filteredCooperatives = (cooperatives || []).filter(coop => {
    const businessName = coop.business?.business_name || "";
    const locationData = coop.business?.location as any;
    const location = locationData?.address || locationData?.state || "";
    const products = coop.business?.products_services || "";
    
    const matchesSearch = 
      businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      products.toLowerCase().includes(searchTerm.toLowerCase());
                          
    const matchesLocation = locationFilter === "all" || location.includes(locationFilter);
    const matchesStatus = statusFilter === "all" || coop.business?.verification_status === statusFilter;
    
    return matchesSearch && matchesLocation && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold">Cooperatives Management</h2>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1 md:col-span-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
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
                <SelectItem value="Magwi">Magwi</SelectItem>
                <SelectItem value="Central Equatoria">Central Equatoria</SelectItem>
                <SelectItem value="Eastern Equatoria">Eastern Equatoria</SelectItem>
                <SelectItem value="Western Equatoria">Western Equatoria</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
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
                <TableHead>Products/Services</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCooperatives.length > 0 ? (
                filteredCooperatives.map((coop) => (
                  <TableRow key={coop.id}>
                    <TableCell className="font-medium">
                      {coop.business?.business_name || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {(() => {
                        const loc = coop.business?.location as any;
                        return loc?.address || loc?.state || 'N/A';
                      })()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {coop.total_members || 0}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {coop.business?.products_services || 'N/A'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3" />
                        {coop.business?.phone || 'N/A'}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(coop.business?.verification_status || 'pending')}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditMembers(coop)}
                      >
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
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
              <div className="bg-blue-100 p-3 rounded-full">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Cooperatives</p>
                <p className="text-2xl font-bold">{stats?.totalCooperatives || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Members</p>
                <p className="text-2xl font-bold">{stats?.totalMembers || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Filter className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold">
                  {(cooperatives || []).filter(c => c.business?.verification_status === 'approved').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Members Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Member Count</DialogTitle>
            <DialogDescription>
              Update the number of members for {selectedCoop?.business?.business_name}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="memberCount">Number of Members</Label>
            <Input
              id="memberCount"
              type="number"
              min="0"
              value={memberCount}
              onChange={(e) => setMemberCount(e.target.value)}
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateMembers} disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CooperativesList;
