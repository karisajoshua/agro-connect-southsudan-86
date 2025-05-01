
import { useState } from "react";
import { ChartBar, Bug, Users, FileText, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";

// Mock data for dashboard
const registrationData = [
  { name: "Jan", businesses: 40, cooperatives: 24 },
  { name: "Feb", businesses: 30, cooperatives: 13 },
  { name: "Mar", businesses: 20, cooperatives: 8 },
  { name: "Apr", businesses: 27, cooperatives: 18 },
  { name: "May", businesses: 45, cooperatives: 30 },
  { name: "Jun", businesses: 58, cooperatives: 35 },
];

const diseaseReportsData = [
  { name: "Jan", reports: 2 },
  { name: "Feb", reports: 5 },
  { name: "Mar", reports: 8 },
  { name: "Apr", reports: 12 },
  { name: "May", reports: 7 },
  { name: "Jun", reports: 3 },
];

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

const chartConfig = {
  businesses: { label: "Businesses", color: "#4f46e5" },
  cooperatives: { label: "Cooperatives", color: "#06b6d4" },
  reports: { label: "Disease Reports", color: "#ef4444" },
};

const AdminOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-sm text-gray-600">Last updated: May 1, 2025</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Businesses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">1,254</div>
              <div className="p-2 bg-blue-50 rounded-full">
                <Database className="h-5 w-5 text-agro-blue" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Cooperatives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">347</div>
              <div className="p-2 bg-purple-50 rounded-full">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Disease Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">37</div>
              <div className="p-2 bg-red-50 rounded-full">
                <Bug className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <p className="text-xs text-red-600 mt-2">
              +23% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Pending Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">12</div>
              <div className="p-2 bg-amber-50 rounded-full">
                <Bell className="h-5 w-5 text-amber-600" />
              </div>
            </div>
            <p className="text-xs text-amber-600 mt-2">
              3 high priority
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Registration Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <BarChart data={registrationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                  dataKey="businesses"
                  fill="var(--color-businesses)"
                  radius={[4, 4, 0, 0]}
                  name="businesses"
                />
                <Bar
                  dataKey="cooperatives"
                  fill="var(--color-cooperatives)"
                  radius={[4, 4, 0, 0]}
                  name="cooperatives"
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Disease Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <LineChart data={diseaseReportsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="reports"
                  stroke="var(--color-reports)"
                  name="reports"
                  strokeWidth={2}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports Table */}
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
                      className={`px-2 py-1 text-xs rounded-full ${
                        report.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : report.status === "Reviewed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
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
    </div>
  );
};

export default AdminOverview;
