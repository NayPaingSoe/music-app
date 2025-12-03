import { useState, useEffect } from 'react';
import { Play, Music } from 'lucide-react';
import { getRecommendedArtists, getArtistAlbums } from '@/services/audioDb';

export default function Recommended() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const artists = await getRecommendedArtists();
        const albumsData = [];

        // Get first album from each artist
        for (const artist of artists.slice(0, 3)) {
          const artistAlbums = await getArtistAlbums(artist.idArtist);
          if (artistAlbums.length > 0) {
            albumsData.push({
              id: artistAlbums[0].idAlbum,
              name: artistAlbums[0].strAlbum,
              artist: artist.strArtist,
              cover: artistAlbums[0].strAlbumThumb || artist.strArtistThumb,
            });
          }
        }

        setAlbums(albumsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Recommended For You</h2>
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-square bg-secondary rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-4">Recommended For You</h2>
      <div className="grid grid-cols-3 gap-6">
        {albums.map((album) => (
          <div
            key={album.id}
            className="group cursor-pointer"
          >
            {/* Album Cover */}
            <div className="relative aspect-square rounded-lg overflow-hidden mb-3 bg-gradient-to-br from-gray-200 to-gray-300">
              {album.cover ? (
                <img
                  src={album.cover}
                  alt={album.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Music className="w-16 h-16 text-muted-foreground" />
                </div>
              )}
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="w-14 h-14 rounded-full bg-pink-500 hover:bg-pink-600 hover:scale-110 flex items-center justify-center transition-all duration-300 shadow-2xl">
                  <Play className="w-6 h-6 text-white fill-white ml-1" />
                </button>
              </div>
            </div>

            {/* Album Info */}
            <div>
              <h3 className="text-foreground font-medium text-sm mb-1 truncate group-hover:text-pink-500 transition-colors">
                {album.name}
              </h3>
              <p className="text-muted-foreground text-xs truncate">{album.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
