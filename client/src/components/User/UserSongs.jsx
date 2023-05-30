import React, { useEffect } from "react";
import { fetchAllSongs } from "../../api";
import { useGlobalContext } from "../../context/AppContext";
import { actionType } from "../../reducers/reducer";
import UserSongCard from "../UserSongCard";
import { AiFillFileAdd } from "react-icons/ai";
import { NavLink } from "react-router-dom";
const UserSongs = () => {
   const { state, dispatch } = useGlobalContext();

   useEffect(() => {
      if (!state.allSongs) {
         fetchAllSongs().then((response) =>
            dispatch({ type: actionType.SET_ALL_SONGS, allSongs: response.data })
         );
      }
   }, []);

   return (
      <div className="mx-auto">
         <div className="w-full flex justify-center items-center mb-4">
            {/* <NavLink
               to="/addSong"
               className="flex gap-x-2 p-2 rounded-md border bg-orange-500 hover:bg-white text-white hover:text-orange-500  duration-200 transition-all hover:border-orange-500"
            >
               <AiFillFileAdd size={24} className=" hover:text-orange-500" />
               <p>Add Song</p>
            </NavLink> */}
            <button className="flex gap-x-2 p-2 rounded-md border bg-orange-500 hover:bg-white text-white hover:text-orange-500  duration-200 transition-all hover:border-orange-500">
               <AiFillFileAdd size={24} className=" hover:text-orange-500" />
               <p>Add Song</p>
            </button>
         </div>

         <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-x-16 gap-y-8 ">
            {/* <!-- CARD 1 --> */}
            {state.allSongs?.map((song, idx) => {
               return <UserSongCard key={song?._id} data={song} index={idx} type="song" />;
            })}
         </section>
      </div>
   );
};

export default UserSongs;
// https://tailwindcomponents.com/component/music-player-cards
