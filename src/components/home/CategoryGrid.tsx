import CategoryGrid from "@/components/CategoryGrid"; // Adjust the import path if necessary

const agriculturalProducts = [
  {
    name: "Cereals",
    link: "/cereals",
    image: "https://wsgsygmyyiybfaynmzok.supabase.co/storage/v1/object/public/southsudan/images/Cereals.png",
  },
  {
    name: "Legumes",
    link: "/legumes",
    image: "https://wsgsygmyyiybfaynmzok.supabase.co/storage/v1/object/public/southsudan/images/Legumes.png",
  },
  {
    name: "Vegetables",
    link: "/vegetables",
    image: "https://wsgsygmyyiybfaynmzok.supabase.co/storage/v1/object/public/southsudan/images/Vegetables%20.png",
  },
  {
    name: "Fruits",
    link: "/fruits",
    image: "https://wsgsygmyyiybfaynmzok.supabase.co/storage/v1/object/public/southsudan/images/Fruits.png", // <- Upload this separately if missing
  },
  {
    name: "Tubers",
    link: "/tubers",
    image: "https://wsgsygmyyiybfaynmzok.supabase.co/storage/v1/object/public/southsudan/images/Tubers.png",
  },
];

const moreCategories = [
  {
    name: "Poultry",
    link: "/poultry",
    image: "https://wsgsygmyyiybfaynmzok.supabase.co/storage/v1/object/public/southsudan/images/Poultry.png",
  },
  {
    name: "Livestock",
    link: "/livestock",
    image: "https://wsgsygmyyiybfaynmzok.supabase.co/storage/v1/object/public/southsudan/images/Livestock.png",
  },
  {
    name: "Cash crops",
    link: "/cash-crops",
    image: "https://wsgsygmyyiybfaynmzok.supabase.co/storage/v1/object/public/southsudan/images/Cash%20Crops.png",
  },
  {
    name: "Fish & honey",
    link: "/fish-honey",
    image: "https://wsgsygmyyiybfaynmzok.supabase.co/storage/v1/object/public/southsudan/images/Fish%20%26%20Honey.png",
  },
  {
    name: "Agro-forestry",
    link: "/agro-forestry",
    image: "https://wsgsygmyyiybfaynmzok.supabase.co/storage/v1/object/public/southsudan/images/Agro-forestry.png",
  },
];

export function HomePage() {
  return (
    <div className="space-y-12">
      {/* Agricultural Products */}
      <CategoryGrid title="Agricultural Products" categories={agriculturalProducts} />

      {/* More Categories */}
      <CategoryGrid title="More Categories" categories={moreCategories} />
    </div>
  );
}
