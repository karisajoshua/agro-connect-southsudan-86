import { CooperativeVendor } from "@/hooks/useCooperativeVendors";
import VendorCard from "./VendorCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Package } from "lucide-react";

interface VendorListingViewProps {
  vendors: CooperativeVendor[];
  subcategory: string;
  category: string;
  isLoading: boolean;
}

const VendorListingView = ({ vendors, subcategory, category, isLoading }: VendorListingViewProps) => {
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
          {vendors.length} cooperative{vendors.length !== 1 ? "s" : ""} found, sorted from cheapest to most expensive
        </p>
      </div>

      {/* Vendor Grid */}
      {vendors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vendors.map((vendor) => (
            <VendorCard
              key={vendor.id}
              vendorName={vendor.cooperativeName}
              price={vendor.productMatch?.price || 0}
              unit={vendor.productMatch?.unit || "kg"}
              location={getLocationString(vendor.location)}
              phone={vendor.phone}
              productName={vendor.productMatch?.name}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No vendors found</h3>
          <p className="text-muted-foreground">
            There are currently no cooperatives selling {subcategory} in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default VendorListingView;
