import { Link, useParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useOrder } from "@/hooks/useOrders";

const formatPrice = (price: number) => new Intl.NumberFormat("en-US").format(price);

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { data: order, isLoading } = useOrder(orderId || "");

  if (isLoading) return <div className="py-8 text-center">Loading order details...</div>;
  if (!order) return <div className="py-8 text-center">Order not found</div>;

  return (
    <div className="max-w-2xl mx-auto text-center space-y-6 py-8">
      <CheckCircle size={80} className="mx-auto text-agro-green" />
      <h1 className="text-3xl font-bold text-agro-blue">Order Placed Successfully!</h1>
      <p className="text-muted-foreground">Your order number is <span className="font-bold">{order.order_number}</span></p>
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between"><span>Status</span><span className="font-medium capitalize">{order.status}</span></div>
          <div className="flex justify-between"><span>Total Amount</span><span className="font-bold text-agro-blue">SSP {formatPrice(order.total_amount)}</span></div>
          <div className="flex justify-between"><span>Payment</span><span className="capitalize">{order.payment_method.replace("_", " ")}</span></div>
        </CardContent>
      </Card>
      <div className="flex gap-4 justify-center">
        <Button asChild variant="outline"><Link to="/my-orders">View My Orders</Link></Button>
        <Button asChild className="bg-agro-green hover:bg-agro-green/90"><Link to="/shop">Continue Shopping</Link></Button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
