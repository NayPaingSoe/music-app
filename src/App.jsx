import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import RecentlyPlayed from "./components/RecentlyPlayed";
import Recommended from "./components/Recommended";
import Player from "./components/Player";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-hidden">
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Sidebar */}
        <Sidebar />
        <Sidebar
          isMobile
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        {isSidebarOpen && (
          <button
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar overlay"
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header onMenuClick={() => setIsSidebarOpen(true)} />

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 sm:p-6 lg:p-8 space-y-8">
              {/* Hero Section */}
              <HeroSection />

              <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 xl:gap-8">
                {/* Recently Played */}
                <RecentlyPlayed />

                {/* Recommended */}
                <Recommended />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Player */}
      <Player />
    </div>
  );
}

export default App;
