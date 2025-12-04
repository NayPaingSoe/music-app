import { useState, useEffect } from "react";
import { Heart, MoreHorizontal, Music } from "lucide-react";
import { MotionWrapper } from "@/components/MotionWrapper";
import {
  getRecommendedArtists,
  getArtistAlbums,
  getAlbumTracks,
} from "@/services/audioDb";
import { usePlayer } from "@/context/PlayerContext.jsx";

const SAMPLE_AUDIO_URLS = [
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
];

export default function RecentlyPlayed() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { playTrack, currentTrack } = usePlayer();

  useEffect(() => {
    const fetchRecentTracks = async () => {
      try {
        // Get some artists and their tracks
        const artists = await getRecommendedArtists();
        const tracksData = [];

        // Get albums and tracks for first few artists
        for (let i = 0; i < Math.min(4, artists.length); i++) {
          const albums = await getArtistAlbums(artists[i].idArtist);
          if (albums.length > 0) {
            const albumTracks = await getAlbumTracks(albums[0].idAlbum);
            if (albumTracks.length > 0) {
              tracksData.push({
                id: albumTracks[0].idTrack,
                name: albumTracks[0].strTrack,
                artist: artists[i].strArtist,
                duration: albumTracks[0].intDuration
                  ? `${Math.floor(albumTracks[0].intDuration / 60000)}:${String(
                      Math.floor((albumTracks[0].intDuration % 60000) / 1000)
                    ).padStart(2, "0")}`
                  : "3:45",
                albumArt: albums[0].strAlbumThumb || artists[i].strArtistThumb,
                url: SAMPLE_AUDIO_URLS[i % SAMPLE_AUDIO_URLS.length],
              });
            }
          }
        }

        setTracks(tracksData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tracks:", error);
        setLoading(false);
      }
    };

    fetchRecentTracks();
  }, []);

  if (loading) {
    return (
      <MotionWrapper className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Recently Played
        </h2>
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-16 bg-gray-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </MotionWrapper>
    );
  }

  return (
    <MotionWrapper className="mb-8">
      <h2 className="text-2xl font-bold text-foreground mb-4">
        Recently Played
      </h2>
      <div className="space-y-2">
        {tracks.map((track) => (
          <div
            key={track.id}
            className={`flex items-center gap-4 p-3 rounded-lg hover:bg-secondary hover:scale-[1.02] hover:shadow-sm transition-all duration-200 group cursor-pointer ${
              currentTrack.id === track.id ? "bg-secondary" : ""
            }`}
            onClick={() => playTrack(track)}
          >
            {/* Album Art */}
            <div className="w-12 h-12 rounded bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0">
              {track.albumArt ? (
                <img
                  src={track.albumArt}
                  alt={track.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Music className="w-6 h-6 text-muted-foreground" />
              )}
            </div>

            {/* Track Info */}
            <div className="flex-1 min-w-0">
              <p className="text-foreground font-medium text-sm truncate">
                {track.name}
              </p>
              <p className="text-muted-foreground text-xs truncate">
                {track.artist}
              </p>
            </div>

            {/* Duration */}
            <div className="text-muted-foreground text-sm">
              {track.duration}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="w-8 h-8 rounded-full hover:bg-secondary flex items-center justify-center transition-colors">
                <Heart className="w-4 h-4 text-muted-foreground hover:text-pink-500" />
              </button>
              <button className="w-8 h-8 rounded-full hover:bg-secondary flex items-center justify-center transition-colors">
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </MotionWrapper>
  );
}
