
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Map, MapPin, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data for disease reports
const diseaseReports = [
  { 
    id: 1, 
    location: { lat: 4.85, lng: 31.58 }, 
    locationName: "Juba, Central Equatoria",
    diseaseType: "Fall Armyworm",
    severity: "high",
    date: "2025-04-28",
    status: "active",
    reported_by: "John Deng" 
  },
  { 
    id: 2, 
    location: { lat: 4.41, lng: 32.53 }, 
    locationName: "Torit, Eastern Equatoria",
    diseaseType: "Rust",
    severity: "medium",
    date: "2025-04-27",
    status: "investigating",
    reported_by: "Mary Wani" 
  },
  { 
    id: 3, 
    location: { lat: 7.70, lng: 28.01 }, 
    locationName: "Wau, Western Bahr el Ghazal",
    diseaseType: "Mosaic Virus",
    severity: "critical",
    date: "2025-04-26",
    status: "confirmed",
    reported_by: "Samuel Kiir" 
  },
  { 
    id: 4, 
    location: { lat: 9.53, lng: 31.65 }, 
    locationName: "Malakal, Upper Nile",
    diseaseType: "Leaf Blight",
    severity: "low",
    date: "2025-04-25",
    status: "resolved",
    reported_by: "Grace Akol" 
  },
  { 
    id: 5, 
    location: { lat: 5.45, lng: 31.66 }, 
    locationName: "Bor, Jonglei",
    diseaseType: "Locusts",
    severity: "high",
    date: "2025-04-24",
    status: "active",
    reported_by: "Peter Majok" 
  },
  { 
    id: 6, 
    location: { lat: 3.56, lng: 30.67 }, 
    locationName: "Yambio, Western Equatoria",
    diseaseType: "Aphids",
    severity: "medium",
    date: "2025-04-23",
    status: "investigating",
    reported_by: "Alice Lemi" 
  }
];

const OutbreakMap = () => {
  const [timeRange, setTimeRange] = useState("all");
  const [diseaseType, setDiseaseType] = useState("all");
  const [severity, setSeverity] = useState("all");
  const [status, setStatus] = useState("all");

  // This would be replaced with an actual map implementation
  // using a library like Mapbox, Leaflet, or Google Maps
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Outbreak Map</h2>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Advanced Filters
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger>
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="1month">Last Month</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
          </SelectContent>
        </Select>

        <Select value={diseaseType} onValueChange={setDiseaseType}>
          <SelectTrigger>
            <SelectValue placeholder="Disease Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Diseases</SelectItem>
            <SelectItem value="armyworm">Fall Armyworm</SelectItem>
            <SelectItem value="rust">Rust</SelectItem>
            <SelectItem value="mosaic">Mosaic Virus</SelectItem>
            <SelectItem value="blight">Leaf Blight</SelectItem>
            <SelectItem value="locusts">Locusts</SelectItem>
            <SelectItem value="aphids">Aphids</SelectItem>
          </SelectContent>
        </Select>

        <Select value={severity} onValueChange={setSeverity}>
          <SelectTrigger>
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="investigating">Under Investigation</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Map Placeholder - In a real implementation, this would be replaced with an interactive map */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted py-3">
          <CardTitle className="text-base">Disease Outbreak Map</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative h-[500px] w-full bg-gray-100 flex items-center justify-center">
            <div className="text-gray-400 flex flex-col items-center">
              <Map className="h-24 w-24 opacity-20" />
              <p className="mt-2 text-center">
                Interactive map will be displayed here.<br />
                <span className="text-xs">
                  (For a production app, integrate with a mapping service like Mapbox, Leaflet, or Google Maps)
                </span>
              </p>
            </div>

            {/* Representing disease outbreaks as position indicators */}
            {diseaseReports.map((report) => {
              // Calculate relative position based on lat/lng
              // This is a simplified positioning just for visual example
              const left = ((report.location.lng + 15) / 50) * 100;
              const top = ((40 - report.location.lat) / 60) * 100;
              
              // Determine color based on severity
              const severityColors = {
                low: "bg-blue-500",
                medium: "bg-yellow-500",
                high: "bg-orange-500",
                critical: "bg-red-500",
              };
              
              const color = severityColors[report.severity as keyof typeof severityColors] || "bg-gray-500";
              
              return (
                <div 
                  key={report.id}
                  className={`absolute z-10 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer`}
                  style={{ left: `${left}%`, top: `${top}%` }}
                  title={`${report.diseaseType} in ${report.locationName}`}
                >
                  <div className={`p-1 rounded-full ${color} animate-pulse`}>
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Legend and Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Map Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-full bg-blue-500">
                  <MapPin className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm">Low Severity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-full bg-yellow-500">
                  <MapPin className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm">Medium Severity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-full bg-orange-500">
                  <MapPin className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm">High Severity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-full bg-red-500">
                  <MapPin className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm">Critical Severity</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Outbreak Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Total Active Outbreaks</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Under Investigation</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Confirmed</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Resolved</p>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Outbreak Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {diseaseReports.slice(0, 3).map((report) => (
              <div key={report.id} className="border-b pb-3 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{report.diseaseType}</h4>
                    <p className="text-sm text-gray-500">{report.locationName}</p>
                  </div>
                  <Badge 
                    className={
                      report.status === 'active' ? 'bg-orange-100 text-orange-800 hover:bg-orange-100' : 
                      report.status === 'investigating' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' :
                      report.status === 'confirmed' ? 'bg-red-100 text-red-800 hover:bg-red-100' :
                      'bg-green-100 text-green-800 hover:bg-green-100'
                    }
                  >
                    {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                  <span>Reported by: {report.reported_by}</span>
                  <span>{report.date}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OutbreakMap;
