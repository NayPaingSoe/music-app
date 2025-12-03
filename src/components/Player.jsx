import { useMemo } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  Music,
  ListMusic,
  Mic2,
} from "lucide-react";
import { usePlayer } from "@/context/PlayerContext.jsx";

export default function Player() {
  const {
    currentTrack,
    isPlaying,
    progress,
    duration,
    volume,
    setVolume,
    togglePlay,
    seekToPercent,
  } = usePlayer();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, "0")}`;
  };

  const currentPosition = useMemo(() => {
    if (!duration) return 0;
    return Math.floor((progress / 100) * duration);
  }, [progress, duration]);

  const handleProgressClick = (event) => {
    if (!duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    const newProgress = (clickPosition / rect.width) * 100;
    seekToPercent(newProgress);
  };

  const handleVolumeClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;
    const newVolume = Math.max(
      0,
      Math.min((clickPosition / rect.width) * 100, 100)
    );
    setVolume(newVolume);
  };

  return (
    <div className="h-24 gradient-player border-t border-white/10">
      <div className="h-full px-6 flex items-center justify-between gap-8">
        {/* Current Track Info */}
        <div className="flex items-center gap-4 w-64">
          <div className="w-14 h-14 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
            {currentTrack.albumArt ? (
              <img
                src={currentTrack.albumArt}
                alt={currentTrack.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Music className="w-6 h-6 text-white/50" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium text-sm truncate">
              {currentTrack.name}
            </p>
            <p className="text-white/60 text-xs truncate">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex-1 max-w-2xl">
          <div className="flex items-center justify-center gap-4 mb-2">
            <button className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
              <Shuffle className="w-4 h-4 text-white/70 hover:text-white" />
            </button>
            <button className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
              <SkipBack className="w-5 h-5 text-white fill-white" />
            </button>
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-white hover:bg-white/90 hover:scale-105 flex items-center justify-center transition-all"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-pink-600 fill-pink-600" />
              ) : (
                <Play className="w-5 h-5 text-pink-600 fill-pink-600 ml-0.5" />
              )}
            </button>
            <button className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
              <SkipForward className="w-5 h-5 text-white fill-white" />
            </button>
            <button className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
              <Repeat className="w-4 h-4 text-white/70 hover:text-white" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3">
            <span className="text-white/60 text-xs font-medium min-w-[35px]">
              {formatTime(currentPosition)}
            </span>
            <div
              className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden group cursor-pointer"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-white rounded-full transition-all group-hover:bg-pink-400"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-white/60 text-xs font-medium min-w-[35px]">
              {formatTime(duration || 0)}
            </span>
          </div>
        </div>

        {/* Additional Controls */}
        <div className="flex items-center gap-3 w-64 justify-end">
          <button className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
            <Mic2 className="w-4 h-4 text-white/70 hover:text-white" />
          </button>
          <button className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
            <ListMusic className="w-4 h-4 text-white/70 hover:text-white" />
          </button>
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-white/70" />
            <div
              className="w-24 h-1 bg-white/20 rounded-full overflow-hidden group cursor-pointer"
              onClick={handleVolumeClick}
            >
              <div
                className="h-full bg-white rounded-full transition-all group-hover:bg-pink-400"
                style={{ width: `${volume}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
