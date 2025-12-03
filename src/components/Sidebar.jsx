import {
  Home,
  Music,
  ListMusic,
  Sparkles,
  TrendingUp,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: Home, label: "Home", active: true },
  { icon: Music, label: "Songs", active: false },
  { icon: ListMusic, label: "Playlists", active: false },
  { icon: Sparkles, label: "Just for You", active: false },
  { icon: TrendingUp, label: "Top Charts", active: false },
];

const playlists = [
  "Workout Mix",
  "Chillin' at Home",
  "Booping at Adobe",
  "XD 4 Life",
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-card h-screen flex flex-col border-r border-border">
      {/* User Profile */}
      <div className="p-6 flex items-center gap-3 border-b border-border">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-semibold">
          J
        </div>
        <div className="flex-1">
          <p className="text-foreground font-medium text-sm">Joshua</p>
          <p className="text-muted-foreground text-xs">Premium</p>
        </div>
      </div>

      {/* Browse Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-4">
            Browse
          </h3>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  item.active
                    ? "bg-secondary text-foreground font-bold text-pink-500"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
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
            <h3 className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
              Your Playlists
            </h3>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <nav className="space-y-1">
            {playlists.map((playlist) => (
              <button
                key={playlist}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
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
