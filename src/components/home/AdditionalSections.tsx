
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdditionalSections = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Podcasts Section */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-bold bg-agro-blue text-white p-2 rounded-t-md">Podcasts</h3>
        <div className="p-2 space-y-2">
          <div className="flex items-center gap-2 border-b pb-2">
            <div className="bg-agro-green p-2 rounded-full">🎙️</div>
            <span className="font-medium">Modern Farming Techniques</span>
          </div>
          <div className="flex items-center gap-2 border-b pb-2">
            <div className="bg-agro-green p-2 rounded-full">🎙️</div>
            <span className="font-medium">Market Access Strategies</span>
          </div>
          <Link to="/podcasts" className="inline-block text-agro-blue hover:underline mt-2">
            View all podcasts →
          </Link>
        </div>
      </div>

      {/* Report Disease Section */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-bold bg-red-600 text-white p-2 rounded-t-md">
          Report Disease & Pest Outbreak!!!
        </h3>
        <div className="p-2">
          <p className="mb-3">
            Spotted a disease or pest outbreak? Report it immediately to help protect crops in your area.
          </p>
          <Link to="/disease-report">
            <Button className="bg-red-600 hover:bg-red-700 w-full">
              Report Now
            </Button>
          </Link>
        </div>
      </div>

      {/* YouTube Section */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-bold bg-red-700 text-white p-2 rounded-t-md">YouTube</h3>
        <div className="p-2">
          <div className="bg-gray-200 h-32 flex items-center justify-center rounded">
            <span className="text-gray-500">Featured Video</span>
          </div>
          <Link to="/videos" className="inline-block text-agro-blue hover:underline mt-2">
            View all videos →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdditionalSections;
