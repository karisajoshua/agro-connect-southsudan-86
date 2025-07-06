
export interface ChatResponse {
  text: string;
  type: 'direct' | 'contact' | 'guided' | 'followup';
  data?: any;
  suggestions?: string[];
}

export interface KnowledgeBase {
  [key: string]: ChatResponse;
}

export const knowledgeBase: KnowledgeBase = {
  // Greetings and general
  greeting: {
    text: "Welcome to South Sudan Agro Marketplace! I'm here to help you with information about our agricultural platform. How can I assist you today?",
    type: 'direct',
    suggestions: ['Market prices', 'Weather forecast', 'Join cooperative', 'Contact information']
  },

  // Organization information
  about: {
    text: "South Sudan Agro Marketplace is an initiative of Quantum Consult with support from partners. We connect farmers, cooperatives, and agri-businesses directly to markets, buyers, donors, and service providers to boost agricultural productivity across South Sudan.",
    type: 'direct',
    suggestions: ['Our services', 'Contact us', 'How to register']
  },

  contact: {
    text: "📧 Email: info@ssdagromarketplace.org\n📞 Phone: +211 922 423 065\n📍 Address: Juba Business Center, Airport Road, Juba, South Sudan\n\nWe're here to help you connect with agricultural markets and services!",
    type: 'direct'
  },

  // Market prices
  prices: {
    text: "🌾 Current Market Prices (per 100kg):\n\n📍 JUBA MARKET:\n• Maize: 18,000 - 22,000 SSP\n• Sorghum: 15,000 - 18,000 SSP\n• Beans: 25,000 - 30,000 SSP\n• Rice: 35,000 - 40,000 SSP\n• Groundnuts: 28,000 - 32,000 SSP\n\n📍 WAU MARKET:\n• Maize: 16,000 - 20,000 SSP\n• Sorghum: 14,000 - 17,000 SSP\n• Beans: 23,000 - 28,000 SSP\n\n📍 MALAKAL MARKET:\n• Maize: 17,000 - 21,000 SSP\n• Sorghum: 15,000 - 18,000 SSP\n• Beans: 24,000 - 29,000 SSP\n\nPrices are updated regularly. For real-time updates, check our market prices section!",
    type: 'direct',
    suggestions: ['Weather forecast', 'How to sell products', 'Transportation services']
  },

  // Weather information
  weather: {
    text: "🌤️ Current Weather Forecasts:\n\n📍 CENTRAL EQUATORIA (Juba):\n• Today: Partly cloudy, 32°C\n• Tomorrow: Scattered showers, 28°C\n• Humidity: 65%\n\n📍 WESTERN BAHR EL GHAZAL (Wau):\n• Today: Sunny, 35°C\n• Tomorrow: Clear skies, 33°C\n• Humidity: 45%\n\n📍 UPPER NILE (Malakal):\n• Today: Overcast, 30°C\n• Tomorrow: Light rain, 27°C\n• Humidity: 70%\n\nFor 5-day detailed forecasts, visit our weather section!",
    type: 'direct',
    suggestions: ['Farming tips', 'Best planting times', 'Crop recommendations']
  },

  // Services and categories
  services: {
    text: "🌾 Our Services Include:\n\n✅ Market Access - Connect directly with buyers\n✅ Agricultural Directory - Find cooperatives, suppliers, transport\n✅ Real-time Market Prices - Updated pricing information\n✅ Weather Forecasts - 5-day regional forecasts\n✅ Farming Tips & Techniques - Expert agricultural advice\n✅ Cooperative Registration - Join farming groups\n✅ Publications & Resources - Agricultural guides and reports\n✅ Disease/Pest Alerts - Early warning systems\n\nWhich service interests you most?",
    type: 'direct',
    suggestions: ['Join cooperative', 'Register business', 'View directory', 'Get farming tips']
  },

  // Cooperative information
  cooperative: {
    text: "🤝 Joining a Cooperative:\n\n1️⃣ Choose your cooperative type:\n   • Crop Production\n   • Livestock\n   • Mixed Farming\n   • Processing\n\n2️⃣ Required documents:\n   • Valid ID\n   • Proof of farming activity\n   • Membership fee (varies by cooperative)\n\n3️⃣ Benefits:\n   • Shared resources and equipment\n   • Better market access\n   • Training opportunities\n   • Group purchasing power\n\nWould you like help finding cooperatives in your area?",
    type: 'guided',
    suggestions: ['Find cooperatives near me', 'Registration requirements', 'Membership benefits']
  },

  // Farming tips
  farming: {
    text: "🌱 Key Farming Tips:\n\n🌾 SOIL PREPARATION:\n• Test soil pH (6.0-7.0 ideal)\n• Add organic matter\n• Proper drainage\n\n🐛 PEST MANAGEMENT:\n• Regular crop inspection\n• Use integrated pest management\n• Natural predators\n\n💧 WATER MANAGEMENT:\n• Efficient irrigation systems\n• Rainwater harvesting\n• Mulching to retain moisture\n\n🌿 CROP ROTATION:\n• Rotate between legumes and cereals\n• Prevent soil depletion\n• Break pest cycles\n\nNeed specific advice for your crops?",
    type: 'direct',
    suggestions: ['Maize growing tips', 'Sorghum cultivation', 'Pest control methods', 'Irrigation advice']
  },

  // Product categories
  products: {
    text: "🛒 Agricultural Product Categories:\n\n🌾 CEREALS: Maize, Sorghum, Rice, Wheat, Millet\n🫘 LEGUMES: Beans, Groundnuts, Cowpeas, Soybeans\n🥬 VEGETABLES: Tomatoes, Onions, Okra, Cabbage\n🍎 FRUITS: Mangoes, Bananas, Oranges, Papayas\n🐔 POULTRY: Chickens, Eggs, Ducks\n🐄 LIVESTOCK: Cattle, Goats, Sheep\n🌿 CASH CROPS: Cotton, Sesame, Sunflower\n🐟 FISH & HONEY: Fresh fish, Honey products\n\nWhich category are you interested in?",
    type: 'direct',
    suggestions: ['Sell my products', 'Find buyers', 'Price information', 'Quality standards']
  }
};

export const keywordMatching = {
  // Greetings
  greetings: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'help'],
  
  // About/Contact
  about: ['about', 'who are you', 'organization', 'company', 'quantum consult'],
  contact: ['contact', 'phone', 'email', 'address', 'location', 'reach'],
  
  // Market prices
  prices: ['price', 'cost', 'market', 'selling', 'buying', 'maize', 'sorghum', 'beans', 'rice', 'groundnut'],
  
  // Weather
  weather: ['weather', 'forecast', 'rain', 'temperature', 'climate', 'season'],
  
  // Services
  services: ['service', 'what do you do', 'offerings', 'features', 'platform'],
  
  // Cooperatives
  cooperative: ['cooperative', 'group', 'association', 'join', 'member', 'farming group'],
  
  // Farming
  farming: ['farming', 'tips', 'cultivation', 'growing', 'planting', 'harvest', 'soil', 'pest', 'irrigation'],
  
  // Products
  products: ['products', 'crops', 'vegetables', 'fruits', 'livestock', 'poultry', 'sell', 'categories']
};

export const fallbackResponses = [
  "I'd be happy to help you with that! However, I need to connect you with one of our agricultural experts for detailed assistance. Could you please share your email and phone number so our support team can get back to you?",
  "That's a great question! For personalized support with your specific needs, please provide your contact details (email and phone number) and our experts will reach out to you soon.",
  "I want to make sure you get the most accurate information. Please share your email and phone number, and our agricultural specialists will contact you directly to assist with your inquiry."
];
