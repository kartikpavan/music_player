import React, { useEffect } from "react";
import { useGlobalContext } from "../../context/AppContext";
import { fetchAllAlbums } from "../../api";
import { actionType } from "../../reducers/reducer";
import SingleSongCard from "../SingleSongCard";
const DashboardAlbums = () => {
   const { state, dispatch } = useGlobalContext();

   useEffect(() => {
      if (!state.allAlbums) {
         fetchAllAlbums().then((response) =>
            dispatch({ type: actionType.SET_ALL_ALBUMS, allAlbums: response.data })
         );
      }
   }, []);

   return (
      <div className="w-full p-4 flex flex-col items-center justify-center ">
         {/* Main Container */}
         <div className="relative w-full my-4 p-4 border">
            {/* Total Songs Count */}
            <div className="absolute top-4 left-4">
               <p className="text-sm font-semibold text-orange-500">
                  <span className="text-textColor">Total Albums : </span>
                  {state.allAlbums?.length}
               </p>
            </div>
            {/* ArtistContainer Container */}
            <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
               {state.allAlbums &&
                  state.allAlbums?.map((item, idx) => {
                     return <SingleSongCard key={item?._id} data={item} index={idx} type="album" />;
                  })}
            </div>
         </div>
      </div>
   );
};

export default DashboardAlbums;
