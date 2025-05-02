
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

// Mock data for recent reports
const recentReports = [
  {
    id: 1,
    name: "John Deng",
    location: "Juba, Central Equatoria",
    cropType: "Maize",
    diseaseType: "Fall Armyworm",
    date: "2025-04-28",
    status: "Pending",
  },
  {
    id: 2,
    name: "Mary Wani",
    location: "Torit, Eastern Equatoria",
    cropType: "Sorghum",
    diseaseType: "Rust",
    date: "2025-04-27",
    status: "Reviewed",
  },
  {
    id: 3,
    name: "Samuel Kiir",
    location: "Wau, Western Bahr el Ghazal",
    cropType: "Cassava",
    diseaseType: "Mosaic Virus",
    date: "2025-04-26",
    status: "Escalated",
  },
  {
    id: 4,
    name: "Grace Akol",
    location: "Malakal, Upper Nile",
    cropType: "Rice",
    diseaseType: "Leaf Blight",
    date: "2025-04-25",
    status: "Pending",
  },
];

const getStatusClassName = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Reviewed":
      return "bg-green-100 text-green-800";
    case "Escalated":
    default:
      return "bg-red-100 text-red-800";
  }
};

const RecentReportsTable = () => {
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
            {recentReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.name}</TableCell>
                <TableCell>{report.location}</TableCell>
                <TableCell>{report.cropType}</TableCell>
                <TableCell>{report.diseaseType}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getStatusClassName(report.status)}`}
                  >
                    {report.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentReportsTable;
