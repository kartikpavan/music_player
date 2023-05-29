import { useEffect } from "react";
import { useGlobalContext } from "../../context/AppContext";
import { fetchAllArtists } from "../../api";
import { actionType } from "../../reducers/reducer";
import SingleSongCard from "../SingleSongCard";

const DashboardArtists = () => {
   const { state, dispatch } = useGlobalContext();

   useEffect(() => {
      if (!state.allArtists) {
         fetchAllArtists().then((response) =>
            dispatch({ type: actionType.SET_ALL_ARTISTS, allArtists: response.data })
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
                  <span className="text-textColor">Total Artists : </span>
                  {state.allArtists?.length}
               </p>
            </div>
            {/* ArtistContainer Container */}
            <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
               {state.allArtists &&
                  state.allArtists?.map((item, idx) => {
                     return (
                        <SingleSongCard key={item?._id} data={item} index={idx} type="artist" />
                     );
                  })}
            </div>
         </div>
      </div>
   );
};

export default DashboardArtists;
