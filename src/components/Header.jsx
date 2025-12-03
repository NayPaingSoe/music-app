import { Search, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function Header() {
  return (
    <div className="h-16 bg-[#0a0a0a]/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8">
      {/* Search Bar */}
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search for songs, artists, albums..."
          className="pl-10 bg-white/5 border-white/10 focus:border-pink-500/50 focus:ring-pink-500/20"
        />
      </div>

      {/* Notification */}
      <div className="relative">
        <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
          <Bell className="w-5 h-5 text-gray-300" />
        </button>
        <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
      </div>
    </div>
  );
}
