
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Auto-redirect to admin dashboard (dev mode - no auth required)
    navigate("/admin");
  }, [navigate]);

  return null;
};

export default AdminLogin;
