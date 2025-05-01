
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

const AdminLink = () => {
  return (
    <Link to="/admin/login" className="text-white">
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-white hover:bg-agro-green/20 items-center space-x-1"
      >
        <ShieldCheck size={16} />
        <span>Admin</span>
      </Button>
    </Link>
  );
};

export default AdminLink;
