import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCart, useUpdateCartQuantity, useRemoveFromCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US").format(price);
};

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const { user } = useAuth();
  const { data: cartItems = [], isLoading } = useCart();
  const updateQuantity = useUpdateCartQuantity();
  const removeFromCart = useRemoveFromCart();

  const totalAmount = cartItems.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);

  const defaultImage = "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=100&h=100&fit=crop";

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart size={20} />
            Shopping Cart
          </SheetTitle>
        </SheetHeader>

        {!user ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <p className="text-muted-foreground">Please login to view your cart</p>
            <Button asChild onClick={onClose}>
              <Link to="/auth?redirect=/cart">Login</Link>
            </Button>
          </div>
        ) : isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground">Loading cart...</p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <ShoppingCart size={48} className="text-muted-foreground" />
            <p className="text-muted-foreground">Your cart is empty</p>
            <Button asChild onClick={onClose}>
              <Link to="/shop">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.product?.image_url || defaultImage}
                      alt={item.product?.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">
                        {item.product?.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {item.product?.seller?.business_name}
                      </p>
                      <p className="text-sm font-medium text-agro-blue">
                        SSP {formatPrice(item.product?.price || 0)}/{item.product?.unit}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-destructive"
                        onClick={() => removeFromCart.mutate(item.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() =>
                            updateQuantity.mutate({
                              itemId: item.id,
                              quantity: item.quantity - 1,
                            })
                          }
                        >
                          <Minus size={12} />
                        </Button>
                        <span className="px-2 text-sm">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() =>
                            updateQuantity.mutate({
                              itemId: item.id,
                              quantity: item.quantity + 1,
                            })
                          }
                          disabled={item.quantity >= (item.product?.stock_quantity || 0)}
                        >
                          <Plus size={12} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total:</span>
                <span className="text-xl font-bold text-agro-blue">
                  SSP {formatPrice(totalAmount)}
                </span>
              </div>
              <div className="grid gap-2">
                <Button asChild className="w-full bg-agro-green hover:bg-agro-green/90">
                  <Link to="/checkout" onClick={onClose}>
                    Proceed to Checkout
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/cart" onClick={onClose}>
                    View Full Cart
                  </Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
