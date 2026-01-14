import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEcommerceProducts } from "@/hooks/useEcommerceProducts";
import { useCooperativeVendors } from "@/hooks/useCooperativeVendors";
import ProductGrid from "@/components/shop/ProductGrid";
import VendorListingView from "@/components/shop/VendorListingView";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowLeft } from "lucide-react";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get("category") || undefined;
  const subcategory = searchParams.get("subcategory") || undefined;
  const [searchQuery, setSearchQuery] = useState("");
  
  // For general product browsing (no subcategory selected)
  const { data: products = [], isLoading: productsLoading } = useEcommerceProducts(category, subcategory);
  
  // For vendor listing when subcategory is selected
  const { data: vendors = [], isLoading: vendorsLoading } = useCooperativeVendors(subcategory);

  const filteredProducts = searchQuery
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  // If subcategory is specified, show vendor listing view with cooperatives
  if (subcategory && category) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-2"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back
        </Button>
        <VendorListingView 
          vendors={vendors} 
          subcategory={subcategory}
          category={category}
          isLoading={vendorsLoading}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          {category && (
            <Button
              variant="ghost"
              onClick={() => navigate("/shop")}
              size="sm"
            >
              <ArrowLeft size={18} className="mr-2" />
              All Products
            </Button>
          )}
          <h1 className="text-3xl font-bold text-primary">
            {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : "All Products"}
          </h1>
        </div>
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
      <ProductGrid products={filteredProducts} isLoading={productsLoading} />
    </div>
  );
};

export default Shop;
