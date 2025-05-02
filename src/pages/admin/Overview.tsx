
import { useState } from "react";
import { Bug, Users, FileText, Bell } from "lucide-react";
import Database from "@/components/ui/database-icon";
import StatsCard from "@/components/admin/StatsCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DiseaseReportDashboard from "@/components/admin/DiseaseReportDashboard";
import BusinessRegistrationDashboard from "@/components/admin/BusinessRegistrationDashboard";
import RecentReportsTable from "@/components/admin/RecentReportsTable";

const AdminOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-sm text-gray-600">Last updated: May 2, 2025</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total Businesses"
          value="1,254"
          icon={Database}
          iconColor="text-agro-blue"
          iconBgColor="bg-blue-50"
          trend={{ value: "+12% from last month", positive: true }}
        />
        
        <StatsCard 
          title="Total Cooperatives"
          value="347"
          icon={Users}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-50"
          trend={{ value: "+8% from last month", positive: true }}
        />
        
        <StatsCard 
          title="Disease Reports"
          value="37"
          icon={Bug}
          iconColor="text-red-600"
          iconBgColor="bg-red-50"
          trend={{ value: "+23% from last month", positive: false }}
        />
        
        <StatsCard 
          title="Pending Actions"
          value="12"
          icon={Bell}
          iconColor="text-amber-600"
          iconBgColor="bg-amber-50"
          trend={{ value: "3 high priority", neutral: true }}
        />
      </div>

      {/* Tabbed visualizations */}
      <Tabs defaultValue="disease-reports" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="disease-reports">Disease Reports</TabsTrigger>
          <TabsTrigger value="registrations">Business Registrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="disease-reports" className="space-y-4">
          <DiseaseReportDashboard />
        </TabsContent>
        
        <TabsContent value="registrations" className="space-y-4">
          <BusinessRegistrationDashboard />
        </TabsContent>
      </Tabs>

      {/* Recent Reports Table */}
      <RecentReportsTable />
    </div>
  );
};

export default AdminOverview;
