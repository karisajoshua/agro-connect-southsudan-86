import { useState, useEffect } from "react";
import { useDiseaseReports, useUpdateDiseaseReport } from "@/hooks/useDiseaseReports";
import { Bug, Search, Map } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";

const statusColors = {
  reported: "bg-yellow-100 text-yellow-800",
  investigating: "bg-blue-100 text-blue-800",
  confirmed: "bg-orange-100 text-orange-800",
  resolved: "bg-green-100 text-green-800",
};

const severityColors = {
  low: "bg-blue-100 text-blue-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-orange-100 text-orange-800",
};

const DiseaseReports = () => {
  const navigate = useNavigate();
  const { data: reports, isLoading } = useDiseaseReports();
  const updateReport = useUpdateDiseaseReport();
  const queryClient = useQueryClient();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [severityFilter, setSeverityFilter] = useState<string | undefined>();

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('disease-reports-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'disease_reports' },
        () => queryClient.invalidateQueries({ queryKey: ['disease-reports'] })
      )
      .subscribe();
    
    return () => { supabase.removeChannel(channel); };
  }, [queryClient]);

  // Transform data for display
  const diseaseReports = reports?.map(report => {
    const loc = report.location as any;
    return {
      id: report.id,
      reporter: report.reporter_name,
      phone: report.phone,
      location: loc?.address || loc?.state || 'Unknown',
      coordinates: loc?.lat && loc?.lng 
        ? `${loc.lat.toFixed(4)}° N, ${loc.lng.toFixed(4)}° E`
        : 'N/A',
      cropType: report.crop_type,
      diseaseType: report.disease_type?.name || report.disease_description || 'Unknown',
      affectedArea: report.affected_area || 'N/A',
      reportDate: new Date(report.created_at).toLocaleDateString(),
      status: report.status,
      severity: report.severity,
      photoUrls: report.photo_urls,
    };
  }) || [];

  const filteredReports = diseaseReports.filter((report) => {
    const matchesSearch =
      searchTerm === "" ||
      report.reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.cropType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.diseaseType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !statusFilter || statusFilter === "all" || report.status === statusFilter;
    const matchesSeverity = !severityFilter || severityFilter === "all" || report.severity === severityFilter;

    return matchesSearch && matchesStatus && matchesSeverity;
  });

  const stats = {
    total: diseaseReports.length,
    pending: diseaseReports.filter(r => r.status === "reported").length,
    critical: diseaseReports.filter(r => r.severity === "high").length,
    resolved: diseaseReports.filter(r => r.status === "resolved").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bug className="h-6 w-6 text-red-600" />
          Disease & Pest Reports
        </h1>
        <Button onClick={() => navigate('/admin/outbreak-map')}>
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
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value === "all" ? undefined : value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="reported">Reported</SelectItem>
            <SelectItem value="investigating">Under Investigation</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
        <Select value={severityFilter} onValueChange={(value) => setSeverityFilter(value === "all" ? undefined : value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Reports</p>
              <p className="text-2xl font-bold">{stats.total}</p>
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
              <p className="text-2xl font-bold">{stats.pending}</p>
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
              <p className="text-2xl font-bold">{stats.critical}</p>
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
              <p className="text-2xl font-bold">{stats.resolved}</p>
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
          {isLoading ? (
            <div className="p-4 space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16" />
              ))}
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No disease reports found
            </div>
          ) : (
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
                          statusColors[report.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {report.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          severityColors[report.severity as keyof typeof severityColors] || 'bg-gray-100 text-gray-800'
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
          )}
        </CardContent>
      </Card>

      <footer className="text-center text-sm text-muted-foreground py-4 border-t">
        Powered by Texcortech Systems
      </footer>
    </div>
  );
};

export default DiseaseReports;
