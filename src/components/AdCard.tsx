
import { Button } from "@/components/ui/button";

interface AdCardProps {
  className?: string;
}

const AdCard = ({ className = "" }: AdCardProps) => {
  return (
    <div className={`bg-gradient-to-r from-blue-600 via-blue-500 to-green-500 rounded-lg p-6 flex flex-col items-center justify-center text-white text-center h-48 transition-transform hover:scale-105 ${className}`}>
      <h3 className="text-xl font-bold mb-4">Advertise Here</h3>
      <p className="text-sm mb-4 opacity-90">Reach thousands of buyers</p>
      <Button className="bg-orange-500 hover:bg-orange-600 text-white">
        Contact Us
      </Button>
    </div>
  );
};

export default AdCard;
