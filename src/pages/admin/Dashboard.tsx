
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Database,
  Bell,
  Settings,
  ChevronDown,
  ChevronUp,
  Bug,
  MessageSquare,
  Map,
  ChartBar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SidebarItemProps {
  icon: React.ReactNode;
  title: string;
  to: string;
  active?: boolean;
}

const SidebarItem = ({ icon, title, to, active }: SidebarItemProps) => {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
        active
          ? "bg-agro-blue text-white"
          : "hover:bg-agro-blue/10 text-gray-700"
      }`}
    >
      {icon}
      <span>{title}</span>
    </Link>
  );
};

interface SidebarGroupProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const SidebarGroup = ({
  title,
  children,
  defaultOpen = false,
}: SidebarGroupProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-1">
      <CollapsibleTrigger className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-agro-blue/5 rounded-md">
        {title}
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-3 space-y-1">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

const AdminDashboard = () => {
  const currentPath = window.location.pathname;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-sm overflow-y-auto">
        <div className="p-4">
          <h1 className="text-xl font-bold text-agro-blue">Admin Panel</h1>
        </div>
        <div className="px-3 py-2 space-y-4">
          <SidebarItem
            icon={<LayoutDashboard size={18} />}
            title="Overview"
            to="/admin"
            active={currentPath === "/admin"}
          />

          <SidebarGroup title="Registration Management" defaultOpen={true}>
            <SidebarItem
              icon={<Database size={18} />}
              title="Business Directory"
              to="/admin/directory"
              active={currentPath.includes("/admin/directory")}
            />
            <SidebarItem
              icon={<Users size={18} />}
              title="Cooperatives"
              to="/admin/cooperatives"
              active={currentPath.includes("/admin/cooperatives")}
            />
          </SidebarGroup>

          <SidebarGroup title="Disease Monitoring">
            <SidebarItem
              icon={<Bug size={18} />}
              title="Outbreak Reports"
              to="/admin/disease-reports"
              active={currentPath.includes("/admin/disease-reports")}
            />
            <SidebarItem
              icon={<Map size={18} />}
              title="Outbreak Map"
              to="/admin/outbreak-map"
              active={currentPath.includes("/admin/outbreak-map")}
            />
          </SidebarGroup>

          <SidebarGroup title="Content Management">
            <SidebarItem
              icon={<FileText size={18} />}
              title="News & Articles"
              to="/admin/news"
              active={currentPath.includes("/admin/news")}
            />
            <SidebarItem
              icon={<FileText size={18} />}
              title="Publications"
              to="/admin/publications"
              active={currentPath.includes("/admin/publications")}
            />
            <SidebarItem
              icon={<FileText size={18} />}
              title="Trainings"
              to="/admin/trainings"
              active={currentPath.includes("/admin/trainings")}
            />
          </SidebarGroup>

          <SidebarItem
            icon={<MessageSquare size={18} />}
            title="User Engagement"
            to="/admin/engagement"
            active={currentPath.includes("/admin/engagement")}
          />

          <SidebarItem
            icon={<ChartBar size={18} />}
            title="Analytics"
            to="/admin/analytics"
            active={currentPath.includes("/admin/analytics")}
          />

          <SidebarItem
            icon={<Bell size={18} />}
            title="Notifications"
            to="/admin/notifications"
            active={currentPath.includes("/admin/notifications")}
          />

          <SidebarItem
            icon={<Settings size={18} />}
            title="Settings"
            to="/admin/settings"
            active={currentPath.includes("/admin/settings")}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
