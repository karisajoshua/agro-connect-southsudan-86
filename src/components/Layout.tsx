
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import LiveChat from "./LiveChat";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-grow">
        {/* Sidebar - visible on larger screens, toggleable on smaller ones */}
        <div 
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 fixed lg:static top-16 bottom-0 left-0 w-64 z-40 bg-agro-orange bg-opacity-70 overflow-y-auto lg:translate-x-0`}
        >
          <Sidebar />
        </div>
        
        {/* Overlay for mobile - when sidebar is open */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Main content */}
        <main className={`flex-grow p-4 transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-0"}`}>
          <Outlet />
        </main>
      </div>
      
      <Footer />
      <LiveChat />
    </div>
  );
};

export default Layout;
