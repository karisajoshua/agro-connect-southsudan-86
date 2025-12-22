import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart, useUpdateCartQuantity, useRemoveFromCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

const formatPrice = (price: number) => new Intl.NumberFormat("en-US").format(price);

const Cart = () => {
  const { user } = useAuth();
  const { data: cartItems = [], isLoading } = useCart();
  const updateQuantity = useUpdateCartQuantity();
  const removeFromCart = useRemoveFromCart();

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  const defaultImage = "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=100&h=100&fit=crop";

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <ShoppingCart size={64} className="text-muted-foreground" />
        <h2 className="text-2xl font-bold">Please login to view your cart</h2>
        <Button asChild><Link to="/auth?redirect=/cart">Login</Link></Button>
      </div>
    );
  }

  if (isLoading) return <div className="py-8 text-center">Loading cart...</div>;

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <ShoppingCart size={64} className="text-muted-foreground" />
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <Button asChild><Link to="/shop">Browse Products</Link></Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-agro-blue">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4 flex gap-4">
                <img src={item.product?.image_url || defaultImage} alt={item.product?.name} className="w-24 h-24 object-cover rounded-md" />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.product?.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.product?.seller?.business_name}</p>
                  <p className="text-agro-blue font-bold mt-1">SSP {formatPrice(item.product?.price || 0)}/{item.product?.unit}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => removeFromCart.mutate(item.id)}><Trash2 size={18} /></Button>
                  <div className="flex items-center border rounded-md">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity.mutate({ itemId: item.id, quantity: item.quantity - 1 })}><Minus size={14} /></Button>
                    <span className="px-3">{item.quantity}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity.mutate({ itemId: item.id, quantity: item.quantity + 1 })} disabled={item.quantity >= (item.product?.stock_quantity || 0)}><Plus size={14} /></Button>
                  </div>
                  <p className="font-medium">SSP {formatPrice((item.product?.price || 0) * item.quantity)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="h-fit">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-bold">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>SSP {formatPrice(totalAmount)}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span className="text-muted-foreground">Calculated at checkout</span></div>
            </div>
            <div className="border-t pt-4 flex justify-between text-lg font-bold">
              <span>Total</span><span className="text-agro-blue">SSP {formatPrice(totalAmount)}</span>
            </div>
            <Button asChild className="w-full bg-agro-green hover:bg-agro-green/90">
              <Link to="/checkout">Proceed to Checkout <ArrowRight className="ml-2" size={18} /></Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
