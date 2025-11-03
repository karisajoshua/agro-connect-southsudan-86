import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useDiseaseReports = () => {
  return useQuery({
    queryKey: ["disease-reports"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("disease_reports")
        .select(`
          *,
          disease_type:disease_types(name, category)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

export const useUpdateDiseaseReport = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      const { data, error } = await supabase
        .from("disease_reports")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["disease-reports"] });
      toast({
        title: "Success",
        description: "Disease report updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update report.",
        variant: "destructive",
      });
    },
  });
};

export const useDiseaseReportStats = () => {
  return useQuery({
    queryKey: ["disease-report-stats"],
    queryFn: async () => {
      const { count: totalReports } = await supabase
        .from("disease_reports")
        .select("*", { count: "exact", head: true });

      const { count: pendingReports } = await supabase
        .from("disease_reports")
        .select("*", { count: "exact", head: true })
        .eq("status", "reported");

      const { count: criticalReports } = await supabase
        .from("disease_reports")
        .select("*", { count: "exact", head: true })
        .eq("severity", "high");

      const { count: resolvedReports } = await supabase
        .from("disease_reports")
        .select("*", { count: "exact", head: true })
        .eq("status", "resolved");

      // Get disease type distribution
      const { data: reports } = await supabase
        .from("disease_reports")
        .select("disease_description, crop_type");

      const diseaseTypeData = reports?.reduce((acc: any[], curr: any) => {
        const disease = curr.disease_description || "Unknown";
        const existing = acc.find((item) => item.name === disease);
        if (existing) {
          existing.value += 1;
        } else {
          acc.push({ name: disease, value: 1 });
        }
        return acc;
      }, []);

      // Get location distribution
      const { data: locationReports } = await supabase
        .from("disease_reports")
        .select("location");

      const locationData = locationReports?.reduce((acc: any[], curr: any) => {
        const location = curr.location?.address || curr.location?.state || "Unknown";
        const existing = acc.find((item) => item.location === location);
        if (existing) {
          existing.reports += 1;
        } else {
          acc.push({ location, reports: 1 });
        }
        return acc;
      }, []);

      // Get monthly trends
      const { data: trendData } = await supabase
        .from("disease_reports")
        .select("created_at");

      const monthlyTrends = trendData?.reduce((acc: any[], curr: any) => {
        const month = new Date(curr.created_at).toLocaleDateString("en-US", {
          month: "short",
        });
        const existing = acc.find((item) => item.month === month);
        if (existing) {
          existing.reports += 1;
        } else {
          acc.push({ month, reports: 1 });
        }
        return acc;
      }, []);

      return {
        totalReports: totalReports || 0,
        pendingReports: pendingReports || 0,
        criticalReports: criticalReports || 0,
        resolvedReports: resolvedReports || 0,
        diseaseTypeData: diseaseTypeData?.slice(0, 5) || [],
        locationData: locationData?.slice(0, 5) || [],
        monthlyTrends: monthlyTrends?.slice(-6) || [],
      };
    },
  });
};
