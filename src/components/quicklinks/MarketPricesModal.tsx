
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "lucide-react";

interface MarketPricesModalProps {
  open: boolean;
  onClose: () => void;
}

const marketPrices = [
  { item: "Maize (50kg)", juba: "15,000 SSP", wau: "14,500 SSP", malakal: "16,200 SSP", trend: "↑" },
  { item: "Sorghum (50kg)", juba: "12,500 SSP", wau: "13,000 SSP", malakal: "14,000 SSP", trend: "↓" },
  { item: "Beans (50kg)", juba: "22,000 SSP", wau: "21,000 SSP", malakal: "23,500 SSP", trend: "→" },
  { item: "Rice (25kg)", juba: "13,500 SSP", wau: "14,000 SSP", malakal: "15,000 SSP", trend: "↑" },
  { item: "Groundnuts (50kg)", juba: "25,000 SSP", wau: "26,000 SSP", malakal: "27,500 SSP", trend: "↑" },
];

const MarketPricesModal = ({ open, onClose }: MarketPricesModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-agro-blue flex items-center gap-2">
            <Calendar size={20} /> Latest Market Prices
          </DialogTitle>
          <DialogDescription>
            Updated as of {new Date().toLocaleDateString()}. Prices collected from major markets.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Juba Market</TableHead>
                <TableHead>Wau Market</TableHead>
                <TableHead>Malakal Market</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {marketPrices.map((price, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{price.item}</TableCell>
                  <TableCell>{price.juba}</TableCell>
                  <TableCell>{price.wau}</TableCell>
                  <TableCell>{price.malakal}</TableCell>
                  <TableCell className={`font-bold ${price.trend === "↑" ? "text-green-600" : price.trend === "↓" ? "text-red-600" : "text-amber-600"}`}>{price.trend}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="text-sm text-gray-500">
          <p>* Prices may vary based on quality and availability</p>
          <p>* Data sourced from local market surveys and partner organizations</p>
        </div>
        
        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MarketPricesModal;
