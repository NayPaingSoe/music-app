import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const FALLBACK_TRACK_URL =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
const DEFAULT_VOLUME = 70;

const DEFAULT_TRACK = {
  id: "sample-track",
  name: "Mind-Blowing Beats",
  artist: "Various Artists",
  albumArt: null,
  url: FALLBACK_TRACK_URL,
};

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const audioRef = useRef(null);
  const [currentTrack, setCurrentTrack] = useState(DEFAULT_TRACK);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = DEFAULT_VOLUME / 100;
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      if (!audio.duration) return;
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleLoadedMetadata = () => {
      setDuration(Math.floor(audio.duration || 0));
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.url) return;

    audio.src = currentTrack.url;
    audio.load();

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
    }
  }, [currentTrack?.url, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.url) return;

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack?.url]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume / 100;
  }, [volume]);

  const playTrack = useCallback((track) => {
    if (!track) return;

    const trackWithAudio = {
      ...track,
      id: track.id || track.name || crypto.randomUUID(),
      url: track.url || FALLBACK_TRACK_URL,
    };

    setCurrentTrack(trackWithAudio);
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    if (!currentTrack?.url) return;
    setIsPlaying((prev) => !prev);
  }, [currentTrack?.url]);

  const seekToPercent = useCallback(
    (percent) => {
      if (!audioRef.current || !duration) return;
      const clamped = Math.max(0, Math.min(percent, 100));
      audioRef.current.currentTime = (clamped / 100) * duration;
      setProgress(clamped);
    },
    [duration]
  );

  const value = useMemo(
    () => ({
      currentTrack,
      isPlaying,
      progress,
      duration,
      volume,
      setVolume,
      togglePlay,
      playTrack,
      seekToPercent,
    }),
    [
      currentTrack,
      isPlaying,
      progress,
      duration,
      volume,
      togglePlay,
      playTrack,
      seekToPercent,
    ]
  );

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}
