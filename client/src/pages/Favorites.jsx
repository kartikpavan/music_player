import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/AppContext";
import { actionType } from "../reducers/reducer";
import { addToLikedSongs, getSingleSong } from "../api";

const Favorites = () => {
   const { state, dispatch } = useGlobalContext();
   const [fav, setFav] = useState([]);
   useEffect(() => {
      // if favorite songs state is empty then , gatheer info from user state about favorite song list
      if (!state?.favoriteSongs) {
         dispatch({
            type: actionType.SET_FAVORITE_SONGS,
            favoriteSongs: state?.user?.user?.favoriteSongs,
         });
         setFav(state?.user?.user?.favoriteSongs);
      }
   }, []);

   return (
      <div>
         {fav?.map((id, idx) => {
            return <SingleFavoriteCard key={id} index={idx} songId={id} />;
         })}
      </div>
   );
};

const SingleFavoriteCard = ({ songId, index }) => {
   const [songDetails, setSongDetails] = useState([]);

   useEffect(() => {
      getSingleSong(songId)
         .then((response) => {
            const newList = [...new Set([response.data])];
            setSongDetails(newList);
         })
         .catch((err) => console.log(err));
   }, []);

   return (
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-x-16 gap-y-8 ">
         {/* <!-- CARD 1 --> */}
         {/* {songDetails?.map((song, idx) => {
            return <UserSongCard key={song?._id} data={song} index={idx} type="song" />;
         })} */}
      </section>
   );
};

export default Favorites;
