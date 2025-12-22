import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { useCreateOrder } from "@/hooks/useOrders";
import { useAuth } from "@/hooks/useAuth";

const formatPrice = (price: number) => new Intl.NumberFormat("en-US").format(price);

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: cartItems = [] } = useCart();
  const createOrder = useCreateOrder();
  
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", city: "", state: "", notes: "" });

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || cartItems.length === 0) return;

    createOrder.mutate({
      delivery_address: { name: form.name, phone: form.phone, email: form.email, address: form.address, city: form.city, state: form.state },
      payment_method: "cash_on_delivery",
      notes: form.notes || undefined,
      items: cartItems.map((item) => ({
        ecommerce_product_id: item.ecommerce_product_id,
        product_name: item.product?.name || "",
        quantity: item.quantity,
        unit_price: item.product?.price || 0,
        total_price: (item.product?.price || 0) * item.quantity,
      })),
    }, { onSuccess: (order) => navigate(`/order-confirmation/${order.id}`) });
  };

  if (!user) { navigate("/auth?redirect=/checkout"); return null; }
  if (cartItems.length === 0) { navigate("/cart"); return null; }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-agro-blue">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Delivery Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Full Name *</Label><Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Phone *</Label><Input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
            <div><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div><Label>Address *</Label><Textarea required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>City *</Label><Input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></div>
              <div><Label>State *</Label><Input required value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} /></div>
            </div>
            <div><Label>Order Notes</Label><Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Any special instructions..." /></div>
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Order Summary ({cartItems.length} items)</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.product?.name} x {item.quantity}</span>
                  <span>SSP {formatPrice((item.product?.price || 0) * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span><span className="text-agro-blue">SSP {formatPrice(totalAmount)}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Payment Method</CardTitle></CardHeader>
            <CardContent><div className="p-3 border rounded-md bg-muted/50"><p className="font-medium">Cash on Delivery</p><p className="text-sm text-muted-foreground">Pay when your order arrives</p></div></CardContent>
          </Card>
          <Button type="submit" className="w-full bg-agro-green hover:bg-agro-green/90 h-12 text-lg" disabled={createOrder.isPending}>
            {createOrder.isPending ? "Placing Order..." : "Place Order"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
