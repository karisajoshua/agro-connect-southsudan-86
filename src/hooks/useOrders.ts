import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useClearCart } from "./useCart";
import { toast } from "@/hooks/use-toast";

export interface OrderItem {
  id: string;
  order_id: string;
  ecommerce_product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface DeliveryAddress {
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  state: string;
}

export interface Order {
  id: string;
  user_id: string;
  order_number: string;
  status: string;
  total_amount: number;
  delivery_address: DeliveryAddress;
  payment_method: string;
  payment_status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export const useOrders = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["orders", user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          items:order_items(*)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }) as { data: any; error: any };

      if (error) throw error;
      return data as Order[];
    },
    enabled: !!user,
  });
};

export const useAllOrders = () => {
  return useQuery({
    queryKey: ["all-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          items:order_items(*)
        `)
        .order("created_at", { ascending: false }) as { data: any; error: any };

      if (error) throw error;
      return data as Order[];
    },
  });
};

export const useOrder = (orderId: string) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          items:order_items(*)
        `)
        .eq("id", orderId)
        .single() as { data: any; error: any };

      if (error) throw error;
      return data as Order;
    },
    enabled: !!orderId,
  });
};

interface CreateOrderInput {
  delivery_address: DeliveryAddress;
  payment_method: string;
  notes?: string;
  items: {
    ecommerce_product_id: string;
    product_name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }[];
}

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const clearCart = useClearCart();

  return useMutation({
    mutationFn: async (input: CreateOrderInput) => {
      if (!user) throw new Error("Must be logged in to place order");

      const total_amount = input.items.reduce((sum, item) => sum + item.total_price, 0);

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          order_number: "",
          total_amount,
          delivery_address: input.delivery_address,
          payment_method: input.payment_method,
          notes: input.notes || null,
        } as any)
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = input.items.map((item) => ({
        order_id: order.id,
        ecommerce_product_id: item.ecommerce_product_id,
        product_name: item.product_name,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.total_price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart after successful order
      await clearCart.mutateAsync();

      return order as unknown as Order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast({
        title: "Order placed successfully!",
        description: "You will receive a confirmation shortly",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to place order",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      const { data, error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", orderId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["all-orders"] });
      toast({
        title: "Order updated",
        description: "Order status has been updated",
      });
    },
  });
};
