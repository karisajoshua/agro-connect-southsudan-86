
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HandShake } from "lucide-react";

interface FarmingTipsModalProps {
  open: boolean;
  onClose: () => void;
}

const farmingTips = [
  {
    category: "Soil Preparation",
    tips: [
      {
        title: "Test Your Soil",
        content: "Before planting, test your soil to determine its pH and nutrient levels. This helps you apply the right amendments."
      },
      {
        title: "Clear Land Properly",
        content: "Remove all weeds, rocks, and debris. This prevents competition for nutrients and allows for proper root development."
      },
      {
        title: "Timing is Key",
        content: "Prepare your soil 2-3 weeks before planting to allow amendments to integrate properly."
      }
    ]
  },
  {
    category: "Pest Management",
    tips: [
      {
        title: "Identify Before Treating",
        content: "Always identify pests correctly before applying any treatment to ensure effectiveness."
      },
      {
        title: "Crop Rotation",
        content: "Practice crop rotation to disrupt pest life cycles and reduce infestation risks."
      },
      {
        title: "Natural Predators",
        content: "Encourage beneficial insects like ladybugs and praying mantises that feed on harmful pests."
      }
    ]
  },
  {
    category: "Water Management",
    tips: [
      {
        title: "Early Morning Watering",
        content: "Water plants early in the morning to reduce evaporation and fungal disease risks."
      },
      {
        title: "Deep Watering",
        content: "Water deeply but less frequently to encourage deeper root growth and drought resilience."
      },
      {
        title: "Mulching Benefits",
        content: "Apply organic mulch to retain soil moisture and reduce watering frequency."
      }
    ]
  }
];

const FarmingTipsModal = ({ open, onClose }: FarmingTipsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-agro-blue flex items-center gap-2">
            <HandShake size={20} /> Farming Tips
          </DialogTitle>
          <DialogDescription>
            Practical agricultural advice for South Sudanese farmers to improve productivity
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="Soil Preparation">
          <TabsList className="grid grid-cols-3">
            {farmingTips.map((category) => (
              <TabsTrigger key={category.category} value={category.category}>
                {category.category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {farmingTips.map((category) => (
            <TabsContent key={category.category} value={category.category} className="mt-4">
              <div className="space-y-4">
                {category.tips.map((tip, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border">
                    <h3 className="font-semibold text-lg text-agro-blue">{tip.title}</h3>
                    <p className="mt-2 text-gray-700">{tip.content}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-4 p-3 bg-agro-green bg-opacity-10 rounded-lg">
          <p className="text-sm font-medium">
            These tips are adapted for South Sudan's climate zones and growing conditions. 
            For personalized advice, consult with local agricultural extension officers.
          </p>
        </div>
        
        <div className="flex justify-between mt-2">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button className="bg-agro-blue hover:bg-blue-800">View More Tips</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FarmingTipsModal;
