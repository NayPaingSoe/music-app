import { Search, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function Header() {
  return (
    <div className="h-16 bg-background/80 backdrop-blur-xl border-b border-border flex items-center justify-between px-8">
      {/* Search Bar */}
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for songs, artists, albums..."
          className="pl-10 bg-secondary border-border focus:border-pink-500/50 focus:ring-pink-500/20 text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Notification */}
      <div className="relative">
        <button className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
        </button>
        <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
      </div>
    </div>
  );
}
