import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const usePublications = () => {
  return useQuery({
    queryKey: ["publications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("publications")
        .select("*")
        .order("published_date", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

export const useCreatePublication = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (pubData: any) => {
      const { data, error } = await supabase
        .from("publications")
        .insert([pubData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["publications"] });
    },
  });
};

export const useUpdatePublication = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      const { data, error } = await supabase
        .from("publications")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["publications"] });
    },
  });
};

export const useDeletePublication = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("publications")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["publications"] });
    },
  });
};
