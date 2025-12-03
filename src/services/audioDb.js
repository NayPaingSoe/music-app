import axios from 'axios';

const API_KEY = '523532'; // Free test API key from TheAudioDB
const BASE_URL = 'https://www.theaudiodb.com/api/v1/json';

const audioDbApi = axios.create({
  baseURL: `${BASE_URL}/${API_KEY}`,
});

// Search for artists
export const searchArtist = async (query) => {
  try {
    const response = await audioDbApi.get(`/search.php?s=${encodeURIComponent(query)}`);
    return response.data.artists || [];
  } catch (error) {
    console.error('Error searching artist:', error);
    return [];
  }
};

// Get trending artists (using popular artists as a workaround)
export const getTrendingArtists = async () => {
  try {
    // TheAudioDB doesn't have a trending endpoint, so we'll search for popular artists
    const popularArtists = ['Coldplay', 'Ed Sheeran', 'Taylor Swift', 'The Weeknd', 'Dua Lipa'];
    const randomArtist = popularArtists[Math.floor(Math.random() * popularArtists.length)];
    const response = await audioDbApi.get(`/search.php?s=${randomArtist}`);
    return response.data.artists || [];
  } catch (error) {
    console.error('Error fetching trending artists:', error);
    return [];
  }
};

// Get artist details by ID
export const getArtistById = async (artistId) => {
  try {
    const response = await audioDbApi.get(`/artist.php?i=${artistId}`);
    return response.data.artists?.[0] || null;
  } catch (error) {
    console.error('Error fetching artist:', error);
    return null;
  }
};

// Get albums by artist
export const getArtistAlbums = async (artistId) => {
  try {
    const response = await audioDbApi.get(`/album.php?i=${artistId}`);
    return response.data.album || [];
  } catch (error) {
    console.error('Error fetching albums:', error);
    return [];
  }
};

// Get album details
export const getAlbumById = async (albumId) => {
  try {
    const response = await audioDbApi.get(`/album.php?m=${albumId}`);
    return response.data.album?.[0] || null;
  } catch (error) {
    console.error('Error fetching album:', error);
    return null;
  }
};

// Get tracks by album
export const getAlbumTracks = async (albumId) => {
  try {
    const response = await audioDbApi.get(`/track.php?m=${albumId}`);
    return response.data.track || [];
  } catch (error) {
    console.error('Error fetching tracks:', error);
    return [];
  }
};

// Get track details
export const getTrackById = async (trackId) => {
  try {
    const response = await audioDbApi.get(`/track.php?h=${trackId}`);
    return response.data.track?.[0] || null;
  } catch (error) {
    console.error('Error fetching track:', error);
    return null;
  }
};

// Get multiple artists for recommendations
export const getRecommendedArtists = async () => {
  try {
    const artists = ['Adele', 'Bruno Mars', 'Maroon 5', 'Imagine Dragons', 'Ariana Grande', 'Post Malone'];
    const promises = artists.map(name => audioDbApi.get(`/search.php?s=${name}`));
    const responses = await Promise.all(promises);
    return responses
      .map(res => res.data.artists?.[0])
      .filter(Boolean);
  } catch (error) {
    console.error('Error fetching recommended artists:', error);
    return [];
  }
};

export default {
  searchArtist,
  getTrendingArtists,
  getArtistById,
  getArtistAlbums,
  getAlbumById,
  getAlbumTracks,
  getTrackById,
  getRecommendedArtists,
};
