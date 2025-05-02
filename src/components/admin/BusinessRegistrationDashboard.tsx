
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import Database from "@/components/ui/database-icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";

// Mock data for business categories
const categoryData = [
  { name: "Suppliers", value: 35 },
  { name: "Producers", value: 40 },
  { name: "Traders", value: 25 },
  { name: "Cooperatives", value: 15 },
  { name: "Processors", value: 10 },
];

// Mock data for business by location
const locationData = [
  { name: "Central Equatoria", count: 42 },
  { name: "Eastern Equatoria", count: 28 },
  { name: "Western Equatoria", count: 19 },
  { name: "Jonglei", count: 15 },
  { name: "Upper Nile", count: 12 },
  { name: "Unity", count: 9 },
];

// Mock data for registration trends
const registrationTrendsData = [
  { name: "Jan", businesses: 40, cooperatives: 24 },
  { name: "Feb", businesses: 30, cooperatives: 13 },
  { name: "Mar", businesses: 20, cooperatives: 8 },
  { name: "Apr", businesses: 27, cooperatives: 18 },
  { name: "May", businesses: 45, cooperatives: 30 },
  { name: "Jun", businesses: 58, cooperatives: 35 },
];

const COLORS = ['#4f46e5', '#06b6d4', '#8b5cf6', '#65a30d', '#f59e0b'];

const BusinessRegistrationDashboard = () => {
  const [timeRange, setTimeRange] = useState("6months");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [status, setStatus] = useState("all");

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Business & Cooperative Registration Analysis</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger>
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">Last Month</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
          </SelectContent>
        </Select>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="supplier">Suppliers</SelectItem>
            <SelectItem value="producer">Producers</SelectItem>
            <SelectItem value="trader">Traders</SelectItem>
            <SelectItem value="cooperative">Cooperatives</SelectItem>
          </SelectContent>
        </Select>

        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="central">Central Equatoria</SelectItem>
            <SelectItem value="eastern">Eastern Equatoria</SelectItem>
            <SelectItem value="western">Western Equatoria</SelectItem>
            <SelectItem value="jonglei">Jonglei</SelectItem>
            <SelectItem value="upper">Upper Nile</SelectItem>
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Business Categories</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} businesses`, 'Count']} />
                <Legend layout="vertical" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Business by Location */}
        <Card>
          <CardHeader>
            <CardTitle>Businesses by Location</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={locationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Registration Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Registration Trends</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={registrationTrendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="businesses" 
                stackId="1" 
                stroke="#4f46e5" 
                fill="#4f46e5" 
                fillOpacity={0.6} 
              />
              <Area 
                type="monotone" 
                dataKey="cooperatives" 
                stackId="1" 
                stroke="#06b6d4" 
                fill="#06b6d4" 
                fillOpacity={0.6} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessRegistrationDashboard;
