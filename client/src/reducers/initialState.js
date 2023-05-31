export const initialState = {
   user: null,
   allUsers: null,
   allSongs: null,
   allAlbums: null,
   allArtists: null,
   // Filter Reducers
   filterTerm: "all",
   artistFilter: null,
   albumFilter: null,
   languageFilter: null,
   categoryFilter: null,
   // song player
   isSongPlaying: false,
   songIndex: 0, // which song is currently playing
   //favorites
   isFavorite: false,
};
