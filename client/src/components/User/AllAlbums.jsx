import React, { useEffect } from "react";
import { useGlobalContext } from "../../context/AppContext";
import { fetchAllAlbums } from "../../api";
import { actionType } from "../../reducers/reducer";
import UserSongCard from "../UserSongCard";

const AllAlbums = () => {
   const { state, dispatch } = useGlobalContext();

   useEffect(() => {
      if (!state.allAlbums) {
         fetchAllAlbums().then((response) => {
            dispatch({ type: actionType.SET_ALL_ALBUMS, allArtists: response.data });
         });
      }
   }, []);
   return (
      <div className="mx-auto">
         <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-x-16 gap-y-8 ">
            {/* <!-- CARD 1 --> */}
            {state.allAlbums?.map((album, idx) => {
               return <UserSongCard key={album?._id} data={album} index={idx} type="album" />;
            })}
         </section>
      </div>
   );
};

export default AllAlbums;
