import React from "react";
import { Users, Building2, AlertCircle, FileText } from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DiseaseReportDashboard from "@/components/admin/DiseaseReportDashboard";
import BusinessRegistrationDashboard from "@/components/admin/BusinessRegistrationDashboard";
import RecentReportsTable from "@/components/admin/RecentReportsTable";
import { useBusinessStats } from "@/hooks/useBusinesses";
import { useCooperativeStats } from "@/hooks/useCooperatives";
import { useDiseaseReportStats } from "@/hooks/useDiseaseReports";
import { Skeleton } from "@/components/ui/skeleton";

const AdminOverview = () => {
  const { data: businessStats, isLoading: businessLoading } = useBusinessStats();
  const { data: coopStats, isLoading: coopLoading } = useCooperativeStats();
  const { data: diseaseStats, isLoading: diseaseLoading } = useDiseaseReportStats();

  const isLoading = businessLoading || coopLoading || diseaseLoading;

  const pendingActions = (businessStats?.pendingBusinesses || 0) + (diseaseStats?.pendingReports || 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </>
        ) : (
          <>
            <StatsCard
              title="Total Businesses"
              value={businessStats?.totalBusinesses || 0}
              icon={Building2}
              iconColor="text-blue-600"
              iconBgColor="bg-blue-100"
              trend={{ 
                value: `${businessStats?.approvedBusinesses || 0} approved`, 
                positive: true 
              }}
            />
            <StatsCard
              title="Cooperatives"
              value={coopStats?.totalCooperatives || 0}
              icon={Users}
              iconColor="text-green-600"
              iconBgColor="bg-green-100"
              trend={{ 
                value: `${coopStats?.totalMembers || 0} total members`, 
                positive: true 
              }}
            />
            <StatsCard
              title="Disease Reports"
              value={diseaseStats?.totalReports || 0}
              icon={AlertCircle}
              iconColor="text-red-600"
              iconBgColor="bg-red-100"
              trend={{ 
                value: `${diseaseStats?.criticalReports || 0} critical`, 
                neutral: diseaseStats?.criticalReports === 0 
              }}
            />
            <StatsCard
              title="Pending Actions"
              value={pendingActions}
              icon={FileText}
              iconColor="text-amber-600"
              iconBgColor="bg-amber-100"
              trend={{ value: "Requires attention", neutral: true }}
            />
          </>
        )}
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
