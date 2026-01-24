import { CooperativeVendor } from "@/hooks/useCooperativeVendors";
import VendorCard from "./VendorCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Package, Youtube } from "lucide-react";
import Footer from "@/components/Footer";

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
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 space-y-6">
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
                price={vendor.productMatch?.price ?? null}
                priceLabel={vendor.productMatch?.priceLabel ?? null}
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

        {/* Social Links Section */}
        <div className="bg-muted/30 rounded-lg p-4 mt-8">
          <p className="text-sm text-muted-foreground mb-2">Follow us for more updates:</p>
          <div className="flex gap-4">
            <a 
              href="https://www.youtube.com/@southsudanagromarketplace6933" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <Youtube className="h-4 w-4" />
              YouTube
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=100083286009559" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default VendorListingView;
