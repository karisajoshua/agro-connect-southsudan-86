import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useMarketPrices = () => {
  return useQuery({
    queryKey: ["market-prices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("market_prices")
        .select(`
          *,
          product:products(name, category, unit)
        `)
        .order("date", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

export const useMarketPricesByLocation = (location?: string) => {
  return useQuery({
    queryKey: ["market-prices", location],
    queryFn: async () => {
      let query = supabase
        .from("market_prices")
        .select(`
          *,
          product:products(name, category, unit)
        `)
        .order("date", { ascending: false });

      if (location && location !== "all") {
        query = query.eq("market_location", location);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data;
    },
  });
};
