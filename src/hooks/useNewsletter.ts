import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
  source: string;
  unsubscribed_at: string | null;
}

export const useSubscribeNewsletter = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email, source: "footer" })
        .select()
        .single();

      if (error) {
        if (error.code === "23505") {
          throw new Error("This email is already subscribed to our newsletter.");
        }
        throw error;
      }

      return data;
    },
    onError: (error: Error) => {
      toast({
        title: "Subscription failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useNewsletterSubscribers = () => {
  return useQuery({
    queryKey: ["newsletter-subscribers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("subscribed_at", { ascending: false });

      if (error) throw error;
      return data as NewsletterSubscriber[];
    },
  });
};

export const useDeleteSubscriber = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["newsletter-subscribers"] });
      toast({
        title: "Subscriber deleted",
        description: "The subscriber has been removed from the list.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useToggleSubscriberStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .update({ 
          is_active, 
          unsubscribed_at: is_active ? null : new Date().toISOString() 
        })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["newsletter-subscribers"] });
      toast({
        title: "Status updated",
        description: "Subscriber status has been updated.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
