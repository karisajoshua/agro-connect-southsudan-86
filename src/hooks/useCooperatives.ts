import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useCooperatives = () => {
  return useQuery({
    queryKey: ["cooperatives"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cooperatives")
        .select(`
          *,
          business:businesses(
            business_name,
            phone,
            location,
            products_services,
            verification_status
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

export const useCooperativeStats = () => {
  return useQuery({
    queryKey: ["cooperative-stats"],
    queryFn: async () => {
      const { count: totalCooperatives } = await supabase
        .from("cooperatives")
        .select("*", { count: "exact", head: true });

      const { data: cooperatives } = await supabase
        .from("cooperatives")
        .select("total_members");

      const totalMembers = cooperatives?.reduce(
        (sum, coop) => sum + (coop.total_members || 0),
        0
      );

      return {
        totalCooperatives: totalCooperatives || 0,
        totalMembers: totalMembers || 0,
      };
    },
  });
};
