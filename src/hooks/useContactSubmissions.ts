import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useContactSubmissions = () => {
  return useQuery({
    queryKey: ["contact-submissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

export const useUpdateContactSubmission = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status, responded_by }: { id: string; status: string; responded_by?: string }) => {
      const updates: any = { status };
      
      if (responded_by) {
        updates.responded_by = responded_by;
        updates.responded_at = new Date().toISOString();
      }
      
      const { data, error } = await supabase
        .from("contact_submissions")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-submissions"] });
    },
  });
};
