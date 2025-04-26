
const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-agro-blue mb-6">About Us</h1>
      
      <div className="prose max-w-none">
        <p className="mb-4">
          South Sudan Agro Marketplace is a digital platform connecting South Sudanese farmers, 
          cooperatives, and agri-businesses directly to markets, buyers, donors, and service providers. 
          It boosts agricultural productivity, enhances market access, and promotes "Farming as a Business" (FaaB) 
          across the region.
        </p>
        
        <h2 className="text-2xl font-semibold text-agro-blue mt-8 mb-4">Our Mission</h2>
        <p className="mb-4">
          To transform South Sudan's agricultural sector by bridging the gap between farmers and markets,
          promoting sustainable farming practices, and empowering rural communities through technology 
          and market access.
        </p>
        
        <h2 className="text-2xl font-semibold text-agro-blue mt-8 mb-4">Our Vision</h2>
        <p className="mb-4">
          A thriving, self-sustaining agricultural sector in South Sudan that ensures food security,
          economic growth, and improved livelihoods for farming communities.
        </p>
        
        <h2 className="text-2xl font-semibold text-agro-blue mt-8 mb-4">Our Partners</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 border rounded-lg flex items-center justify-center h-32">
            <span className="text-gray-500">Partner Logo</span>
          </div>
          <div className="p-4 border rounded-lg flex items-center justify-center h-32">
            <span className="text-gray-500">Partner Logo</span>
          </div>
          <div className="p-4 border rounded-lg flex items-center justify-center h-32">
            <span className="text-gray-500">Partner Logo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
