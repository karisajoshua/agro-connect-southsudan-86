import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartCount } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

interface CartIconProps {
  onClick: () => void;
  showLabel?: boolean;
}

const CartIcon = ({ onClick, showLabel = false }: CartIconProps) => {
  const { user } = useAuth();
  const { data: count = 0 } = useCartCount();

  return (
    <Button
      variant="ghost"
      size={showLabel ? "sm" : "icon"}
      onClick={onClick}
      className={`relative text-white hover:bg-agro-green/20 ${
        showLabel ? "gap-2 px-3" : ""
      }`}
      aria-label="Open cart"
    >
      <ShoppingCart size={20} />
      {showLabel && <span className="hidden md:inline">Cart</span>}
      {user && count > 0 && (
        <span className="absolute -top-1 -right-1 bg-agro-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Button>
  );
};

export default CartIcon;
