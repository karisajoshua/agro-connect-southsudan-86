import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Store } from "lucide-react";

interface VendorCardProps {
  vendorName: string;
  price: number | null;
  priceLabel?: string | null;
  unit: string;
  location: string;
  phone: string;
  productName?: string;
}

const formatPrice = (price: number): string => new Intl.NumberFormat("en-US").format(price);

const VendorCard = ({ vendorName, price, priceLabel, unit, location, phone, productName }: VendorCardProps) => {
  const displayPrice =
    priceLabel ? priceLabel : typeof price === "number" ? formatPrice(price) : null;

  return (
    <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-primary">
      <CardContent className="p-4 space-y-3">
        {/* Vendor Name */}
        <div className="flex items-center gap-2">
          <Store className="text-primary" size={20} />
          <h3 className="text-lg font-semibold text-primary">{vendorName}</h3>
        </div>
        
        {/* Product name if available */}
        {productName && (
          <p className="text-sm text-muted-foreground">{productName}</p>
        )}
        
        {/* Price - Bold and prominent */}
        <div className="bg-primary/10 rounded-lg p-3 text-center">
          <p className="text-3xl font-bold text-primary">
            {displayPrice ? `${displayPrice} SSP` : "Price on request"}
          </p>
          <p className="text-sm text-muted-foreground">per {unit}</p>
        </div>
        
        {/* Location */}
        <div className="flex items-center gap-2 text-sm">
          <MapPin size={16} className="text-muted-foreground flex-shrink-0" />
          <span className="text-foreground">{location}</span>
        </div>
        
        {/* Contact */}
        <div className="flex items-center gap-2 text-sm">
          <Phone size={16} className="text-muted-foreground flex-shrink-0" />
          <a 
            href={`tel:${phone}`} 
            className="text-primary hover:underline font-medium"
          >
            {phone}
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorCard;
