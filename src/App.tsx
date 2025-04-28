
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Reels from "./pages/Reels";
import ReelUpload from "./pages/ReelUpload";
import Resources from "./pages/Resources";
import Games from "./pages/Games";
import AITutor from "./pages/AITutor";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import GlobalModals from "./components/GlobalModals";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reels" element={<Reels />} />
          <Route path="/reels/upload" element={<ReelUpload />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/games" element={<Games />} />
          <Route path="/ai-tutor" element={<AITutor />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <GlobalModals />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
