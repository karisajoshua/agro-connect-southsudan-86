// Product image imports
import bananas from "@/assets/products/bananas.jpg";
import beans from "@/assets/products/beans.jpg";
import cabbage from "@/assets/products/cabbage.jpg";
import cotton from "@/assets/products/cotton.jpg";
import greenGrams from "@/assets/products/green-grams.jpg";
import greenPepper from "@/assets/products/green-pepper.jpg";
import lentils from "@/assets/products/lentils.jpg";
import matooke from "@/assets/products/matooke.jpg";
import pawpaws from "@/assets/products/pawpaws.jpg";
import pears from "@/assets/products/pears.jpg";

// Map product names to imported images
const productImageMap: Record<string, string> = {
  bananas: bananas,
  beans: beans,
  cabbage: cabbage,
  cotton: cotton,
  "green grams": greenGrams,
  "green pepper": greenPepper,
  lentils: lentils,
  matooke: matooke,
  "matooke (green bananas)": matooke,
  pawpaws: pawpaws,
  pears: pears,
};

const defaultImage = "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=300&fit=crop";

export const getProductImage = (productName: string, imageUrl?: string | null): string => {
  // If the URL is already a full URL (http/https), use it directly
  if (imageUrl && (imageUrl.startsWith("http://") || imageUrl.startsWith("https://"))) {
    return imageUrl;
  }

  // Check if we have a local image for this product name
  const normalizedName = productName.toLowerCase();
  for (const [key, value] of Object.entries(productImageMap)) {
    if (normalizedName.includes(key)) {
      return value;
    }
  }

  // Fallback to default image
  return defaultImage;
};
