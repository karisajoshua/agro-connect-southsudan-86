import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartCount } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

interface CartIconProps {
  onClick: () => void;
}

const CartIcon = ({ onClick }: CartIconProps) => {
  const { user } = useAuth();
  const { data: count = 0 } = useCartCount();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="relative text-white hover:bg-agro-green/20"
    >
      <ShoppingCart size={20} />
      {user && count > 0 && (
        <span className="absolute -top-1 -right-1 bg-agro-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Button>
  );
};

export default CartIcon;
