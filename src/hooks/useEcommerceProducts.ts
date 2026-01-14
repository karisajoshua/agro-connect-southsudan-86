import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface EcommerceProduct {
  id: string;
  product_id: string | null;
  seller_id: string | null;
  name: string;
  description: string | null;
  price: number;
  unit: string;
  stock_quantity: number;
  min_order_quantity: number;
  image_url: string | null;
  category: string;
  subcategory: string | null;
  is_available: boolean;
  created_at: string;
  updated_at: string;
  seller?: {
    business_name: string;
    location: any;
    phone: string;
  };
}

export const useEcommerceProducts = (category?: string, subcategory?: string) => {
  return useQuery({
    queryKey: ["ecommerce-products", category, subcategory],
    queryFn: async () => {
      let query = supabase
        .from("ecommerce_products")
        .select(`
          *,
          seller:businesses(business_name, location, phone)
        `)
        .eq("is_available", true)
        .order("created_at", { ascending: false });

      if (category) {
        query = query.ilike("category", `%${category}%`);
      }
      if (subcategory) {
        query = query.ilike("subcategory", `%${subcategory}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as EcommerceProduct[];
    },
  });
};

export const useAllEcommerceProducts = () => {
  return useQuery({
    queryKey: ["all-ecommerce-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ecommerce_products")
        .select(`
          *,
          seller:businesses(business_name, location, phone)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as EcommerceProduct[];
    },
  });
};

export const useEcommerceProduct = (id: string) => {
  return useQuery({
    queryKey: ["ecommerce-product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ecommerce_products")
        .select(`
          *,
          seller:businesses(business_name, location, phone, email)
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as EcommerceProduct;
    },
    enabled: !!id,
  });
};

export const useCreateEcommerceProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: Omit<EcommerceProduct, "id" | "created_at" | "updated_at" | "seller">) => {
      const { data, error } = await supabase
        .from("ecommerce_products")
        .insert(product)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ecommerce-products"] });
      queryClient.invalidateQueries({ queryKey: ["all-ecommerce-products"] });
    },
  });
};

export const useUpdateEcommerceProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<EcommerceProduct> & { id: string }) => {
      const { data, error } = await supabase
        .from("ecommerce_products")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ecommerce-products"] });
      queryClient.invalidateQueries({ queryKey: ["all-ecommerce-products"] });
    },
  });
};

export const useDeleteEcommerceProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("ecommerce_products")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ecommerce-products"] });
      queryClient.invalidateQueries({ queryKey: ["all-ecommerce-products"] });
    },
  });
};
