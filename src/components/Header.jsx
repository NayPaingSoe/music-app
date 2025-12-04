import { Search, Bell, Menu } from "lucide-react";
import { MotionWrapper } from "@/components/MotionWrapper";
import { Input } from "@/components/ui/input";

export default function Header({ onMenuClick }) {
  return (
    <MotionWrapper className="bg-background/80 backdrop-blur-xl border-b border-border flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-0">
      <div className="flex items-center justify-between sm:hidden">
        <button
          type="button"
          onClick={onMenuClick}
          className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5 text-foreground" />
        </button>
        <div className="relative">
          <button className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
          </button>
          <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="w-full sm:flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for songs, artists, albums..."
          className="pl-10 bg-secondary border-border focus:border-pink-500/50 focus:ring-pink-500/20 text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Notification */}
      <div className="relative self-end sm:self-auto hidden sm:block">
        <button className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
        </button>
        <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
      </div>
    </MotionWrapper>
  );
}
