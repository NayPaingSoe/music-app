import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import RecentlyPlayed from './components/RecentlyPlayed';
import Recommended from './components/Recommended';
import Player from './components/Player';

function App() {
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header />

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-8">
              {/* Hero Section */}
              <HeroSection />

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
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
