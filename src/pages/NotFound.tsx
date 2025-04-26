
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-6xl font-bold text-agro-blue mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-6">Page Not Found</p>
      <p className="text-gray-500 mb-10 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <div className="space-x-4">
        <Link to="/">
          <Button className="bg-agro-blue hover:bg-blue-800">
            Return to Home
          </Button>
        </Link>
        <Link to="/directory">
          <Button variant="outline">
            Browse Directory
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
