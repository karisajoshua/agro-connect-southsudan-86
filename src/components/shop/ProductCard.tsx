import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAddToCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { EcommerceProduct } from "@/hooks/useEcommerceProducts";
import { getProductImage } from "@/utils/productImages";

interface ProductCardProps {
  product: EcommerceProduct;
  onViewDetails?: (product: EcommerceProduct) => void;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US").format(price);
};

const ProductCard = ({ product, onViewDetails }: ProductCardProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const addToCart = useAddToCart();
  const { openCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      navigate("/auth?redirect=/shop");
      return;
    }
    addToCart.mutate(
      { productId: product.id },
      {
        onSuccess: () => {
          openCart();
        },
      }
    );
  };

  const handleClick = () => {
    if (onViewDetails) {
      onViewDetails(product);
    }
  };

  const imageUrl = getProductImage(product.name, product.image_url);

  return (
    <Card 
      className="overflow-hidden transition-all hover:shadow-lg cursor-pointer group"
      onClick={handleClick}
    >
      <div className="relative h-32 md:h-40 overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-agro-green text-white text-xs px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
      </div>
      <CardContent className="p-3">
        <h3 className="font-semibold text-sm truncate text-foreground">{product.name}</h3>
        {product.seller && (
          <p className="text-xs text-muted-foreground truncate">
            {product.seller.business_name}
          </p>
        )}
        <div className="flex items-center justify-between mt-2">
          <div>
            <p className="text-sm font-bold text-agro-blue">
              SSP {formatPrice(product.price)}
            </p>
            <p className="text-xs text-muted-foreground">per {product.unit}</p>
          </div>
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={addToCart.isPending}
            className="bg-agro-green hover:bg-agro-green/90 h-8 px-2"
          >
            <ShoppingCart size={14} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
