import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import AdCard from "../AdCard";
import ProductModal from "../shop/ProductModal";
import { useEcommerceProducts, EcommerceProduct } from "@/hooks/useEcommerceProducts";
import { useAddToCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { getProductImage } from "@/utils/productImages";

export interface CategoryItem {
  name: string;
  link: string;
  image: string;
  isAd?: boolean;
}

interface CategoryGridProps {
  title: string;
  categories: CategoryItem[];
}

const formatPrice = (price: number) => new Intl.NumberFormat("en-US").format(price);

const CategoryGrid = ({ title, categories }: CategoryGridProps) => {
  const [selectedProduct, setSelectedProduct] = useState<EcommerceProduct | null>(null);
  const { data: products = [], isLoading } = useEcommerceProducts();
  const addToCart = useAddToCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { openCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    if (!user) {
      navigate("/auth?redirect=/shop");
      return;
    }
    addToCart.mutate(
      { productId },
      {
        onSuccess: () => {
          openCart();
        },
      }
    );
  };

  // If products are loaded, show products instead of categories
  if (!isLoading && products.length > 0) {
    // Show first 10 products for homepage
    const displayProducts = products.slice(0, 10);

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-agro-blue">{title}</h2>
          <Button variant="link" className="text-agro-green" onClick={() => navigate("/shop")}>
            View All Products →
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {displayProducts.map((product) => {
            const imageUrl = getProductImage(product.name, product.image_url);
            return (
              <Card
                key={product.id}
                className="overflow-hidden transition-all hover:shadow-lg cursor-pointer group"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <span className="absolute top-2 right-2 bg-agro-green text-white text-xs px-2 py-0.5 rounded-full">
                    {product.category}
                  </span>
                </div>
                <CardContent className="p-2">
                  <h3 className="font-semibold text-sm truncate">{product.name}</h3>
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
                      onClick={(e) => handleAddToCart(e, product.id)}
                      disabled={addToCart.isPending}
                      className="bg-agro-green hover:bg-agro-green/90 h-7 w-7 p-0"
                    >
                      <ShoppingCart size={14} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <ProductModal
          product={selectedProduct}
          open={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </div>
    );
  }

  // Fallback to categories if no products
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-agro-blue">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category, index) =>
          category.isAd ? (
            <div key={index} className="col-span-full md:col-span-1">
              <AdCard />
            </div>
          ) : (
            <Card
              key={index}
              className="overflow-hidden transition-transform hover:scale-105 cursor-pointer"
              onClick={() => navigate(`/shop?category=${encodeURIComponent(category.name.toLowerCase())}`)}
            >
              <div
                className="h-32 bg-cover bg-center"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              <CardContent className="p-2 text-center">
                <p className="font-medium">{category.name}</p>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </div>
  );
};

export default CategoryGrid;
