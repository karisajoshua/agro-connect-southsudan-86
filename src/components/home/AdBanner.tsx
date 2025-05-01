
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const AdBanner = () => {
  return (
    <div className="w-full relative overflow-hidden rounded-lg">
      <Card className="bg-gradient-to-r from-agro-blue to-agro-green p-0">
        <div className="p-6 text-white">
          <h3 className="text-2xl font-bold mb-3">Agricultural Support Program</h3>
          <p className="mb-4">
            Access grants, training, and equipment for small-scale farmers. 
            Join 2,000+ farmers who have boosted their productivity by 35%.
          </p>
          <Button className="bg-agro-orange hover:bg-agro-orange/90 text-white">
            Apply Now <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AdBanner;
