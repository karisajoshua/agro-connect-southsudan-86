import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useBusinesses = () => {
  return useQuery({
    queryKey: ["businesses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("businesses")
        .select(`
          *,
          category:business_categories(name, icon)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

export const useBusinessCategories = () => {
  return useQuery({
    queryKey: ["business-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("business_categories")
        .select("id, name")
        .order("name");

      if (error) throw error;
      return data;
    },
  });
};

export const useBusinessStats = () => {
  return useQuery({
    queryKey: ["business-stats"],
    queryFn: async () => {
      const { count: totalBusinesses } = await supabase
        .from("businesses")
        .select("*", { count: "exact", head: true });

      const { count: pendingBusinesses } = await supabase
        .from("businesses")
        .select("*", { count: "exact", head: true })
        .eq("verification_status", "pending");

      const { count: approvedBusinesses } = await supabase
        .from("businesses")
        .select("*", { count: "exact", head: true })
        .eq("verification_status", "approved");

      // Get category distribution
      const { data: byCategory } = await supabase
        .from("businesses")
        .select("category_id, business_categories(name)")
        .not("category_id", "is", null);

      const categoryData = byCategory?.reduce((acc: any[], curr: any) => {
        const categoryName = curr.business_categories?.name || "Uncategorized";
        const existing = acc.find((item) => item.name === categoryName);
        if (existing) {
          existing.value += 1;
        } else {
          acc.push({ name: categoryName, value: 1 });
        }
        return acc;
      }, []);

      // Get location distribution
      const { data: businesses } = await supabase
        .from("businesses")
        .select("location");

      const locationData = businesses?.reduce((acc: any[], curr: any) => {
        const location = curr.location?.address || curr.location?.state || "Unknown";
        const existing = acc.find((item) => item.name === location);
        if (existing) {
          existing.value += 1;
        } else {
          acc.push({ name: location, value: 1 });
        }
        return acc;
      }, []);

      // Get monthly trends
      const { data: trendData } = await supabase
        .from("businesses")
        .select("created_at");

      const monthlyTrends = trendData?.reduce((acc: any[], curr: any) => {
        const month = new Date(curr.created_at).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        });
        const existing = acc.find((item) => item.month === month);
        if (existing) {
          existing.registrations += 1;
        } else {
          acc.push({ month, registrations: 1 });
        }
        return acc;
      }, []);

      return {
        totalBusinesses: totalBusinesses || 0,
        pendingBusinesses: pendingBusinesses || 0,
        approvedBusinesses: approvedBusinesses || 0,
        categoryData: categoryData || [],
        locationData: locationData || [],
        monthlyTrends: monthlyTrends || [],
      };
    },
  });
};
