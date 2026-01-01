import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import Layout from "./components/Layout";
import HomePage from "./pages/Index";
import AboutPage from "./pages/AboutUs";
import DirectoryPage from "./pages/Directory";
import TendersPage from "./pages/Tenders";
import NewsPage from "./pages/News";
import TutorialsPage from "./pages/Tutorials";
import TrainingsPage from "./pages/Trainings";
import ConsultantsPage from "./pages/Consultants";
import PublicationsPage from "./pages/Publications";
import VideosPage from "./pages/Videos";
import PodcastsPage from "./pages/Podcasts";
import FAQsPage from "./pages/FAQs";
import ContactPage from "./pages/ContactUs";
import NotFoundPage from "./pages/NotFound";
import DiseaseReportPage from "./pages/DiseaseReport";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import MyOrders from "./pages/MyOrders";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminOverview from "./pages/admin/Overview";
import AdminLogin from "./pages/admin/Login";
import DiseaseReports from "./pages/admin/DiseaseReports";
import DirectoryManagement from "./pages/admin/DirectoryManagement";
import OutbreakMapPage from "./pages/admin/OutbreakMap";
import CooperativesPage from "./pages/admin/Cooperatives";
import MarketPricesPage from "./pages/admin/MarketPrices";
import NewsManagement from "./pages/admin/NewsManagement";
import PublicationsManagement from "./pages/admin/PublicationsManagement";
import TrainingsManagement from "./pages/admin/TrainingsManagement";
import UserEngagement from "./pages/admin/UserEngagement";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";
import EcommerceProductsAdmin from "./pages/admin/EcommerceProducts";
import OrdersAdmin from "./pages/admin/OrdersManagement";
import MediaLibrary from "./pages/admin/MediaLibrary";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="directory" element={<DirectoryPage />} />
              <Route path="tenders" element={<TendersPage />} />
              <Route path="news" element={<NewsPage />} />
              <Route path="tutorials" element={<TutorialsPage />} />
              <Route path="trainings" element={<TrainingsPage />} />
              <Route path="consultants" element={<ConsultantsPage />} />
              <Route path="publications" element={<PublicationsPage />} />
              <Route path="videos" element={<VideosPage />} />
              <Route path="podcasts" element={<PodcastsPage />} />
              <Route path="faqs" element={<FAQsPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="disease-report" element={<DiseaseReportPage />} />
              <Route path="auth" element={<Auth />} />
              <Route path="shop" element={<Shop />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="order-confirmation/:orderId" element={<OrderConfirmation />} />
              <Route path="my-orders" element={<MyOrders />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />}>
              <Route index element={<AdminOverview />} />
              <Route path="disease-reports" element={<DiseaseReports />} />
              <Route path="outbreak-map" element={<OutbreakMapPage />} />
              <Route path="directory" element={<DirectoryManagement />} />
              <Route path="cooperatives" element={<CooperativesPage />} />
              <Route path="market-prices" element={<MarketPricesPage />} />
              <Route path="news" element={<NewsManagement />} />
              <Route path="publications" element={<PublicationsManagement />} />
              <Route path="trainings" element={<TrainingsManagement />} />
              <Route path="ecommerce" element={<EcommerceProductsAdmin />} />
              <Route path="orders" element={<OrdersAdmin />} />
              <Route path="media" element={<MediaLibrary />} />
              <Route path="engagement" element={<UserEngagement />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
