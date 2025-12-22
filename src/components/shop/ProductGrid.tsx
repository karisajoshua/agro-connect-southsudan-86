import { useState } from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import { EcommerceProduct } from "@/hooks/useEcommerceProducts";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductGridProps {
  products: EcommerceProduct[];
  isLoading?: boolean;
  title?: string;
}

const ProductGrid = ({ products, isLoading, title }: ProductGridProps) => {
  const [selectedProduct, setSelectedProduct] = useState<EcommerceProduct | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {title && <h2 className="text-2xl font-bold text-agro-blue">{title}</h2>}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-32 md:h-40 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="space-y-4">
        {title && <h2 className="text-2xl font-bold text-agro-blue">{title}</h2>}
        <div className="text-center py-8 text-muted-foreground">
          No products available in this category
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {title && <h2 className="text-2xl font-bold text-agro-blue">{title}</h2>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetails={setSelectedProduct}
          />
        ))}
      </div>

      <ProductModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default ProductGrid;
