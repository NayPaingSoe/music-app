import { Home, Music, ListMusic, Sparkles, TrendingUp, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: Home, label: 'Home', active: true },
  { icon: Music, label: 'Songs', active: false },
  { icon: ListMusic, label: 'Playlists', active: false },
  { icon: Sparkles, label: 'Just for You', active: false },
  { icon: TrendingUp, label: 'Top Charts', active: false },
];

const playlists = [
  'Workout Mix',
  "Chillin' at Home",
  'Booping at Adobe',
  'XD 4 Life',
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-[#0a0a0a] h-screen flex flex-col border-r border-white/5">
      {/* User Profile */}
      <div className="p-6 flex items-center gap-3 border-b border-white/5">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-semibold">
          J
        </div>
        <div className="flex-1">
          <p className="text-white font-medium text-sm">Joshua</p>
          <p className="text-gray-400 text-xs">Premium</p>
        </div>
      </div>

      {/* Browse Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Browse
          </h3>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  item.active
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Playlists Section */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
              Your Playlists
            </h3>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <nav className="space-y-1">
            {playlists.map((playlist) => (
              <button
                key={playlist}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <ListMusic className="w-5 h-5" />
                {playlist}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
