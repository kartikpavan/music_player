import React, { useEffect } from "react";
import { useGlobalContext } from "../../context/AppContext";
import { fetchAllArtists } from "../../api";
import { actionType } from "../../reducers/reducer";
import UserSongCard from "../UserSongCard";

const AllArtists = () => {
   const { state, dispatch } = useGlobalContext();

   useEffect(() => {
      if (!state.allArtists) {
         fetchAllArtists().then((response) =>
            dispatch({ type: actionType.SET_ALL_ARTISTS, allArtists: response.data })
         );
      }
   }, []);
   return (
      <div className="mx-auto">
         <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-x-16 gap-y-8 ">
            {/* <!-- CARD 1 --> */}
            {state.allArtists?.map((artist, idx) => {
               return <UserSongCard key={artist?._id} data={artist} index={idx} type="artist" />;
            })}
         </section>
      </div>
   );
};

export default AllArtists;
