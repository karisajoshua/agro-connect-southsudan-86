import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMarketPricesByLocation } from "@/hooks/useMarketPrices";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown } from "lucide-react";

const MarketPricesDashboard = () => {
  const [location, setLocation] = useState("all");
  const { data: prices, isLoading } = useMarketPricesByLocation(location);

  // Group prices by product
  const groupedPrices = (prices || []).reduce((acc: any, price: any) => {
    const productName = price.product?.name || "Unknown";
    if (!acc[productName]) {
      acc[productName] = [];
    }
    acc[productName].push(price);
    return acc;
  }, {});

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Market Prices</h2>
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="Magwi">Magwi</SelectItem>
            <SelectItem value="Juba">Juba</SelectItem>
            <SelectItem value="Torit">Torit</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Market Prices</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price (SSP)</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Source</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(prices || []).length > 0 ? (
                (prices || []).map((price: any) => (
                  <TableRow key={price.id}>
                    <TableCell className="font-medium">
                      {price.product?.name || "N/A"}
                    </TableCell>
                    <TableCell>{price.market_location}</TableCell>
                    <TableCell className="font-semibold">
                      {price.price.toLocaleString()}
                    </TableCell>
                    <TableCell>{price.unit}</TableCell>
                    <TableCell>
                      {new Date(price.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {price.source || "N/A"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No market prices found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Price Summary by Product */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(groupedPrices).map(([productName, productPrices]: [string, any]) => {
          const avgPrice =
            productPrices.reduce((sum: number, p: any) => sum + Number(p.price), 0) /
            productPrices.length;
          const minPrice = Math.min(...productPrices.map((p: any) => Number(p.price)));
          const maxPrice = Math.max(...productPrices.map((p: any) => Number(p.price)));

          return (
            <Card key={productName}>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">{productName}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Price:</span>
                    <span className="font-medium">
                      {avgPrice.toLocaleString()} SSP
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Range:</span>
                    <span className="font-medium">
                      {minPrice.toLocaleString()} - {maxPrice.toLocaleString()} SSP
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Listings:</span>
                    <span className="font-medium">{productPrices.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MarketPricesDashboard;
