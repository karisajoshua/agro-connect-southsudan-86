import { useState } from "react";
import { ShoppingCart, MapPin, Minus, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAddToCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { EcommerceProduct } from "@/hooks/useEcommerceProducts";
import { getProductImage } from "@/utils/productImages";

interface ProductModalProps {
  product: EcommerceProduct | null;
  open: boolean;
  onClose: () => void;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US").format(price);
};

const ProductModal = ({ product, open, onClose }: ProductModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();
  const addToCart = useAddToCart();
  const { openCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    if (!user) {
      navigate("/auth?redirect=/shop");
      onClose();
      return;
    }
    addToCart.mutate(
      { productId: product.id, quantity },
      {
        onSuccess: () => {
          setQuantity(1);
          onClose();
          openCart();
        },
      }
    );
  };

  const imageUrl = getProductImage(product.name, product.image_url);
  const location = product.seller?.location as { county?: string; state?: string } | undefined;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-agro-blue">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <span className="absolute top-2 right-2 bg-agro-green text-white text-sm px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>

          <div className="space-y-4">
            {product.seller && (
              <div>
                <p className="text-sm text-muted-foreground">Sold by</p>
                <p className="font-medium">{product.seller.business_name}</p>
                {location && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin size={14} />
                    {location.county}, {location.state}
                  </p>
                )}
              </div>
            )}

            <div>
              <p className="text-3xl font-bold text-agro-blue">
                SSP {formatPrice(product.price)}
              </p>
              <p className="text-muted-foreground">per {product.unit}</p>
            </div>

            {product.description && (
              <p className="text-sm text-muted-foreground">{product.description}</p>
            )}

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Stock: {product.stock_quantity} available
              </p>
              <p className="text-sm text-muted-foreground">
                Min. order: {product.min_order_quantity} {product.unit}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(product.min_order_quantity, quantity - 1))}
                  disabled={quantity <= product.min_order_quantity}
                >
                  <Minus size={16} />
                </Button>
                <span className="px-4 font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                  disabled={quantity >= product.stock_quantity}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-lg font-medium">
                Total: SSP {formatPrice(product.price * quantity)}
              </p>
            </div>

            <Button
              className="w-full bg-agro-green hover:bg-agro-green/90"
              onClick={handleAddToCart}
              disabled={addToCart.isPending}
            >
              <ShoppingCart className="mr-2" size={18} />
              Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
