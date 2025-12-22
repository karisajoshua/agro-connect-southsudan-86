import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useEcommerceProducts } from "@/hooks/useEcommerceProducts";
import ProductGrid from "@/components/shop/ProductGrid";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || undefined;
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: products = [], isLoading } = useEcommerceProducts(category);

  const filteredProducts = searchQuery
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-agro-blue">
          {category ? `${category} Products` : "All Products"}
        </h1>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <ProductGrid products={filteredProducts} isLoading={isLoading} />
    </div>
  );
};

export default Shop;
