import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useOrders } from "@/hooks/useOrders";
import { useAuth } from "@/hooks/useAuth";
import { format } from "date-fns";

const formatPrice = (price: number) => new Intl.NumberFormat("en-US").format(price);
const statusColors: Record<string, string> = { pending: "bg-yellow-500", confirmed: "bg-blue-500", processing: "bg-purple-500", shipped: "bg-cyan-500", delivered: "bg-green-500", cancelled: "bg-red-500" };

const MyOrders = () => {
  const { user } = useAuth();
  const { data: orders = [], isLoading } = useOrders();

  if (!user) return <div className="py-16 text-center"><h2 className="text-2xl font-bold mb-4">Please login to view orders</h2><Button asChild><Link to="/auth?redirect=/my-orders">Login</Link></Button></div>;
  if (isLoading) return <div className="py-8 text-center">Loading orders...</div>;
  if (orders.length === 0) return <div className="py-16 text-center"><Package size={64} className="mx-auto text-muted-foreground mb-4" /><h2 className="text-2xl font-bold mb-4">No orders yet</h2><Button asChild><Link to="/shop">Start Shopping</Link></Button></div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-agro-blue">My Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardContent className="p-4">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <p className="font-bold">{order.order_number}</p>
                  <p className="text-sm text-muted-foreground">{format(new Date(order.created_at), "PPP")}</p>
                  <p className="text-sm">{order.items?.length || 0} items</p>
                </div>
                <div className="text-right">
                  <Badge className={statusColors[order.status] || "bg-gray-500"}>{order.status}</Badge>
                  <p className="text-lg font-bold text-agro-blue mt-2">SSP {formatPrice(order.total_amount)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
