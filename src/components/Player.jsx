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
import { MotionWrapper } from "@/components/MotionWrapper";
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
    <MotionWrapper className="h-24 bg-linear-to-r from-pink-700 via-pink-600 to-pink-500 border-t border-white/5 shadow-[0_-10px_35px_rgba(0,0,0,0.25)]">
      <div className="h-full px-6 flex items-center gap-6 text-white">
        {/* Current Track Info */}
        <div className="flex items-center gap-3 w-56">
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/20">
            {currentTrack.albumArt ? (
              <img
                src={currentTrack.albumArt}
                alt={currentTrack.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Music className="w-6 h-6 text-white/60" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium text-sm truncate">
              {currentTrack.name}
            </p>
            <p className="text-white/70 text-xs truncate">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Controls & Progress */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center gap-3 text-white/80">
            <button className="w-9 h-9 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors">
              <Shuffle className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-white text-pink-600 shadow-lg flex items-center justify-center transition-transform hover:scale-105"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>
            <button className="w-9 h-9 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
            <button className="w-9 h-9 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors">
              <Repeat className="w-4 h-4" />
            </button>
            <span className="text-xs text-white/70 ml-2">
              {formatTime(currentPosition)}
            </span>
            <div
              className="flex-1 h-1.5 bg-white/25 rounded-full relative cursor-pointer"
              onClick={handleProgressClick}
            >
              <div
                className="absolute inset-y-0 left-0 bg-white rounded-full"
                style={{ width: `${progress}%` }}
              >
                <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full bg-white shadow" />
              </div>
            </div>
            <span className="text-xs text-white/70">
              {formatTime(duration || 0)}
            </span>
          </div>
        </div>

        {/* Utility Controls */}
        <div className="flex items-center gap-4 text-white/80">
          <button className="hover:text-white transition-colors">
            <Mic2 className="w-4 h-4" />
          </button>
          <button className="hover:text-white transition-colors">
            <ListMusic className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            <div
              className="w-24 h-1.5 bg-white/25 rounded-full cursor-pointer"
              onClick={handleVolumeClick}
            >
              <div
                className="h-full bg-white rounded-full"
                style={{ width: `${volume}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </MotionWrapper>
  );
}
