import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CooperativeVendor {
  id: string;
  cooperativeName: string;
  phone: string;
  location: {
    address?: string;
    state?: string;
    county?: string;
  };
  products: string;
  productMatch?: {
    name: string;
    price: number;
    unit: string;
  };
}

// Parse products_services field to extract product and price
// Format examples: "Maize grains (200,000 SSP/100kgs)" or just "Maize grains"
const parseProductWithPrice = (productStr: string, subcategory: string): { name: string; price: number; unit: string } | null => {
  const normalizedSubcat = subcategory.toLowerCase().trim();
  const productLower = productStr.toLowerCase();
  
  // Check if this product matches the subcategory
  const matchTerms = [
    normalizedSubcat,
    normalizedSubcat.replace(/s$/, ''), // singular form
    normalizedSubcat + 's', // plural form
  ];
  
  const isMatch = matchTerms.some(term => productLower.includes(term));
  if (!isMatch) return null;
  
  // Try to extract price and unit from format like "Product (200,000 SSP/100kgs)"
  const priceMatch = productStr.match(/\(([0-9,]+)\s*SSP\/([^)]+)\)/i);
  
  if (priceMatch) {
    const priceStr = priceMatch[1].replace(/,/g, '');
    const price = parseInt(priceStr, 10);
    const unit = priceMatch[2].trim();
    const name = productStr.replace(/\s*\([^)]+\)/, '').trim();
    
    return { name, price, unit };
  }
  
  // No price found, return with default
  return { 
    name: productStr.trim(), 
    price: 0, 
    unit: 'kg' 
  };
};

export const useCooperativeVendors = (subcategory?: string) => {
  return useQuery({
    queryKey: ["cooperative-vendors", subcategory],
    queryFn: async () => {
      // Fetch all approved cooperatives with their business info
      const { data, error } = await supabase
        .from("cooperatives")
        .select(`
          id,
          business:businesses!inner(
            id,
            business_name,
            phone,
            location,
            products_services,
            verification_status
          )
        `)
        .eq("business.verification_status", "approved");

      if (error) throw error;
      
      if (!data || !subcategory) return [];

      // Filter cooperatives that have products matching the subcategory
      const vendors: CooperativeVendor[] = [];
      
      for (const coop of data) {
        const business = coop.business as any;
        if (!business?.products_services) continue;
        
        // Split products_services by comma
        const productsList = business.products_services.split(',').map((p: string) => p.trim());
        
        for (const productStr of productsList) {
          const productMatch = parseProductWithPrice(productStr, subcategory);
          
          if (productMatch) {
            vendors.push({
              id: coop.id,
              cooperativeName: business.business_name,
              phone: business.phone || "Contact not available",
              location: business.location || {},
              products: business.products_services,
              productMatch,
            });
            break; // Only add once per cooperative
          }
        }
      }
      
      // Sort by price (cheapest first), items with no price (0) go last
      vendors.sort((a, b) => {
        const priceA = a.productMatch?.price || Infinity;
        const priceB = b.productMatch?.price || Infinity;
        return priceA - priceB;
      });
      
      return vendors;
    },
    enabled: !!subcategory,
  });
};

// Get all unique products/subcategories from cooperatives
export const useCooperativeProducts = (category?: string) => {
  return useQuery({
    queryKey: ["cooperative-products", category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cooperatives")
        .select(`
          business:businesses!inner(
            products_services,
            verification_status
          )
        `)
        .eq("business.verification_status", "approved");

      if (error) throw error;
      
      if (!data) return [];
      
      const productsSet = new Set<string>();
      
      for (const coop of data) {
        const business = coop.business as any;
        if (!business?.products_services) continue;
        
        const products = business.products_services.split(',').map((p: string) => {
          // Extract just the product name without price
          return p.replace(/\s*\([^)]+\)/, '').trim();
        });
        
        products.forEach((p: string) => productsSet.add(p));
      }
      
      return Array.from(productsSet).sort();
    },
  });
};
