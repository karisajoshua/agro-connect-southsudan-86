import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminOverview from "./pages/admin/Overview";
import AdminLogin from "./pages/admin/Login";
import DiseaseReports from "./pages/admin/DiseaseReports";
import DirectoryManagement from "./pages/admin/DirectoryManagement";
import OutbreakMapPage from "./pages/admin/OutbreakMap";
import CooperativesPage from "./pages/admin/Cooperatives";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
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
            {/* Other admin routes will be added here as they're implemented */}
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
