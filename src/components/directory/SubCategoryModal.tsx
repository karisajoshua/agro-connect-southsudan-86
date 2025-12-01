import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { subCategories, SubCategory } from "@/data/subCategories";

interface SubCategoryModalProps {
  open: boolean;
  onClose: () => void;
  category: string;
  categoryName: string;
}

const SubCategoryModal = ({
  open,
  onClose,
  category,
  categoryName,
}: SubCategoryModalProps) => {
  const navigate = useNavigate();
  const subs = subCategories[category] || [];

  const handleSubCategoryClick = (subCategory: SubCategory) => {
    navigate(`/directory?category=${category}&product=${encodeURIComponent(subCategory.name)}`);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-agro-blue">
            {categoryName} - Select Product
          </DialogTitle>
          <DialogDescription>
            Choose a specific product to see all vendors
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {subs.map((sub, index) => (
            <Card
              key={index}
              className="cursor-pointer transition-transform hover:scale-105 hover:shadow-lg"
              onClick={() => handleSubCategoryClick(sub)}
            >
              <CardContent className="p-4 text-center">
                <p className="font-medium text-agro-blue">{sub.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubCategoryModal;
