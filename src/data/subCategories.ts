export interface SubCategory {
  name: string;
  category: string;
}

export const subCategories: Record<string, SubCategory[]> = {
  cereals: [
    { name: "Maize grains", category: "cereals" },
    { name: "Maize seeds", category: "cereals" },
    { name: "Maize flour", category: "cereals" },
    { name: "Rice", category: "cereals" },
    { name: "Sorghum", category: "cereals" },
    { name: "Millet", category: "cereals" },
    { name: "Wheat", category: "cereals" },
    { name: "Cassava", category: "cereals" },
  ],
  legumes: [
    { name: "Beans", category: "legumes" },
    { name: "Groundnuts", category: "legumes" },
    { name: "Cowpeas", category: "legumes" },
    { name: "Soyabeans", category: "legumes" },
    { name: "Peas", category: "legumes" },
    { name: "Lentils", category: "legumes" },
  ],
  vegetables: [
    { name: "Tomatoes", category: "vegetables" },
    { name: "Onions", category: "vegetables" },
    { name: "Cabbage", category: "vegetables" },
    { name: "Okra", category: "vegetables" },
    { name: "Spinach", category: "vegetables" },
    { name: "Eggplant", category: "vegetables" },
  ],
  fruits: [
    { name: "Mangoes", category: "fruits" },
    { name: "Bananas", category: "fruits" },
    { name: "Oranges", category: "fruits" },
    { name: "Papaya", category: "fruits" },
    { name: "Watermelon", category: "fruits" },
  ],
  poultry: [
    { name: "Chicken", category: "poultry" },
    { name: "Eggs", category: "poultry" },
    { name: "Turkey", category: "poultry" },
    { name: "Duck", category: "poultry" },
  ],
  livestock: [
    { name: "Cattle", category: "livestock" },
    { name: "Goats", category: "livestock" },
    { name: "Sheep", category: "livestock" },
    { name: "Beef", category: "livestock" },
    { name: "Milk", category: "livestock" },
  ],
  "cash-crops": [
    { name: "Coffee", category: "cash-crops" },
    { name: "Cotton", category: "cash-crops" },
    { name: "Simsim", category: "cash-crops" },
    { name: "Tobacco", category: "cash-crops" },
    { name: "Tea", category: "cash-crops" },
  ],
  "fish-honey": [
    { name: "Fish", category: "fish-honey" },
    { name: "Honey", category: "fish-honey" },
    { name: "Bee products", category: "fish-honey" },
  ],
};
