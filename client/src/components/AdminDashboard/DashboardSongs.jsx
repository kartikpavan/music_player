import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AiFillFileAdd } from "react-icons/ai";
import { FcClearFilters } from "react-icons/fc";
import { useGlobalContext } from "../../context/AppContext";
import { fetchAllSongs } from "../../api";
import { actionType } from "../../reducers/reducer";
import SingleSongCard from "../SingleSongCard";
const DashboardSongs = () => {
   const { state, dispatch } = useGlobalContext();
   const [searchTerm, setSearchTerm] = useState("");

   useEffect(() => {
      if (!state.allSongs) {
         fetchAllSongs().then((response) =>
            dispatch({ type: actionType.SET_ALL_SONGS, allSongs: response.data })
         );
      }
   }, []);

   return (
      <div className="w-full p-4 flex flex-col items-center justify-center ">
         {/* header bar*/}
         <div className="w-full flex items-center justify-center gap-20">
            {/* Add song button */}
            <NavLink
               to="/dashboard/addSong"
               className="flex gap-x-2 p-2 rounded-md border bg-orange-500 hover:bg-white text-white hover:text-orange-500  duration-200 transition-all hover:border-orange-500"
            >
               <AiFillFileAdd size={24} className=" hover:text-orange-500" />
               <p className="font-semibold  ">Add Song</p>
            </NavLink>
            {/* Search Bar */}
            <input
               type="text"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               placeholder="Search Here.."
               className="w-96 px-4 py-2 border rounded-md shadow-sm focus:outline-none
                focus:border-orange-500 focus:shadow-md border-gray-300"
            />
            {/* Clear Filter Button */}
            <div class="relative ">
               <div class="group cursor-pointer relative inline-block  text-center">
                  <FcClearFilters size={24} />
                  <div class="opacity-0 w-24 bg-white text-orange-500 text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-8 -right-10 ml-14 px-3 pointer-events-none duration-200 transition-all ease-in-out">
                     Clear Filters
                  </div>
               </div>
            </div>
         </div>

         {/* Main Container */}
         <div className="relative w-full my-4 p-4 border">
            {/* Total Songs Count */}
            <div className="absolute top-4 left-4">
               <p className="text-sm font-seemibold text-orange-500">
                  <span className="text-textColor">Total Songs : </span>
                  {state.allSongs?.length}
               </p>
            </div>
            {/* Songs Container */}
            <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
               {state.allSongs &&
                  state.allSongs?.map((item, idx) => {
                     return <SingleSongCard key={item?._id} song={item} index={idx} />;
                  })}
            </div>
         </div>
      </div>
   );
};

export default DashboardSongs;
