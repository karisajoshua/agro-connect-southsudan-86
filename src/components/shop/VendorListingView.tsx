import { EcommerceProduct } from "@/hooks/useEcommerceProducts";
import VendorCard from "./VendorCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Package } from "lucide-react";

interface VendorListingViewProps {
  products: EcommerceProduct[];
  subcategory: string;
  category: string;
  isLoading: boolean;
}

const VendorListingView = ({ products, subcategory, category, isLoading }: VendorListingViewProps) => {
  // Sort by price ascending (cheapest first)
  const sortedProducts = [...products].sort((a, b) => a.price - b.price);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  const getLocationString = (location: any): string => {
    if (!location) return "Location not specified";
    if (typeof location === "string") return location;
    if (typeof location === "object") {
      const parts = [];
      if (location.address) parts.push(location.address);
      if (location.state) parts.push(location.state);
      if (location.county) parts.push(location.county);
      return parts.length > 0 ? parts.join(", ") : "Location not specified";
    }
    return "Location not specified";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <nav className="text-sm text-muted-foreground mb-2">
          <span className="capitalize">{category}</span> → <span>{subcategory}</span>
        </nav>
        <h1 className="text-3xl font-bold text-primary">{subcategory} Vendors</h1>
        <p className="text-muted-foreground mt-1">
          {sortedProducts.length} vendor{sortedProducts.length !== 1 ? "s" : ""} found, sorted from cheapest to most expensive
        </p>
      </div>

      {/* Vendor Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedProducts.map((product) => (
            <VendorCard
              key={product.id}
              vendorName={product.seller?.business_name || "Unknown Vendor"}
              price={product.price}
              unit={product.unit}
              location={getLocationString(product.seller?.location)}
              phone={product.seller?.phone || "Contact not available"}
              productName={product.name}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No vendors found</h3>
          <p className="text-muted-foreground">
            There are currently no vendors selling {subcategory} in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default VendorListingView;
