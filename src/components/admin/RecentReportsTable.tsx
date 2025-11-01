import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDiseaseReports } from "@/hooks/useDiseaseReports";
import { Skeleton } from "@/components/ui/skeleton";

const getStatusClassName = (status: string) => {
  switch (status.toLowerCase()) {
    case "reported":
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "investigating":
    case "under investigation":
      return "bg-blue-100 text-blue-800";
    case "confirmed":
      return "bg-orange-100 text-orange-800";
    case "resolved":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const RecentReportsTable = () => {
  const { data: reports, isLoading } = useDiseaseReports();

  const recentReports = (reports || []).slice(0, 5);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Disease Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Disease Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reporter</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Crop</TableHead>
              <TableHead>Disease/Pest</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentReports.length > 0 ? (
              recentReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.reporter_name}</TableCell>
                  <TableCell>
                    {(() => {
                      const loc = report.location as any;
                      return loc?.address || loc?.state || 'N/A';
                    })()}
                  </TableCell>
                  <TableCell>{report.crop_type}</TableCell>
                  <TableCell>{report.disease_description}</TableCell>
                  <TableCell>
                    {new Date(report.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getStatusClassName(report.status)}`}
                    >
                      {report.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  No recent reports found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentReportsTable;
