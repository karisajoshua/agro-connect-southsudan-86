import cerealsImg from "@/assets/categories/cereals.jpg";
import legumesImg from "@/assets/categories/legumes.jpg";
import vegetablesImg from "@/assets/categories/vegetables.jpg";
import fruitsImg from "@/assets/categories/fruits.jpg";
import poultryImg from "@/assets/categories/poultry.jpg";
import livestockImg from "@/assets/categories/livestock.jpg";
import cashCropsImg from "@/assets/categories/cash-crops.jpg";
import fishHoneyImg from "@/assets/categories/fish-honey.jpg";

export const TopCategories = [
  { 
    name: "Cereals", 
    link: "/directory?category=cereals",
    image: cerealsImg
  },
  { 
    name: "Legumes", 
    link: "/directory?category=legumes",
    image: legumesImg
  },
  { 
    name: "Vegetables", 
    link: "/directory?category=vegetables",
    image: vegetablesImg
  },
  { 
    name: "Fruits", 
    link: "/directory?category=fruits",
    image: fruitsImg
  },
  { 
    name: "Ad Space", 
    link: "#",
    image: "",
    isAd: true
  },
];

export const BottomCategories = [
  { 
    name: "Poultry", 
    link: "/directory?category=poultry",
    image: poultryImg
  },
  { 
    name: "Livestock", 
    link: "/directory?category=livestock",
    image: livestockImg
  },
  { 
    name: "Cash crops", 
    link: "/directory?category=cash-crops",
    image: cashCropsImg
  },
  { 
    name: "Fish & honey", 
    link: "/directory?category=fish-honey",
    image: fishHoneyImg
  },
  { 
    name: "Ad Space", 
    link: "#",
    image: "",
    isAd: true
  },
];
