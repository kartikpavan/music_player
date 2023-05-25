import React, { useEffect } from "react";
import { useGlobalContext } from "../../context/AppContext";
import { fetchAllAlbums, fetchAllArtists, fetchAllSongs, fetchAllUsers } from "../../api";
import { actionType } from "../../reducers/reducer";

//  icons
import { HiUserGroup } from "react-icons/hi";
import { FaItunesNote } from "react-icons/fa";
import { ImUserCheck } from "react-icons/im";
import { RiAlbumFill } from "react-icons/ri";

// local Card Component
const DashboardCard = ({ icon, name, count }) => {
   return (
      <div className="p-2 w-40 gap-2 h-auto rounded-md shadow-md bg-orange-100/30">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
               {icon}
               <p className="text-lg text-textColor font-semibold">{name}</p>
            </div>
            <p className="text-lg text-gray-500 font-bold">{count}</p>
         </div>
      </div>
   );
};

const DashboardHome = () => {
   const { state, dispatch } = useGlobalContext();
   // state.allUsers , state.allSongs,state.allArtists,state.allAlbums

   useEffect(() => {
      // get all users
      if (!state.allUsers) {
         fetchAllUsers().then((res) =>
            dispatch({ type: actionType.SET_ALL_USERS, allUsers: res.data })
         );
      }
      // get all artists
      if (!state.allArtists) {
         fetchAllArtists().then((res) =>
            dispatch({ type: actionType.SET_ALL_ARTISTS, allArtists: res.data })
         );
      }
      // get all Albums
      if (!state.allAlbums) {
         fetchAllAlbums().then((res) =>
            dispatch({ type: actionType.SET_ALL_ALBUMS, allAlbums: res.data })
         );
      }
      // get all Songs
      if (!state.allSongs) {
         fetchAllSongs().then((res) =>
            dispatch({ type: actionType.SET_ALL_SONGS, allSongs: res.data })
         );
      }
   }, []);
   return (
      <section className="w-full p-4 flex items-center justify-evenly flex-wrap ">
         <DashboardCard
            icon={<HiUserGroup className="text-orange-500" size={20} />}
            name="Users"
            count={state.allUsers?.length > 0 ? state.allUsers?.length : 0}
         />
         <DashboardCard
            icon={<FaItunesNote className="text-orange-500" size={20} />}
            name="Songs"
            count={state.allSongs?.length > 0 ? state.allSongs?.length : 0}
         />
         <DashboardCard
            icon={<ImUserCheck className="text-orange-500" size={20} />}
            name="Artists"
            count={state.allArtists?.length > 0 ? state.allArtists?.length : 0}
         />
         <DashboardCard
            icon={<RiAlbumFill className="text-orange-500" size={20} />}
            name="Albums"
            count={state.allAlbums?.length > 0 ? state.allAlbums?.length : 0}
         />
      </section>
   );
};

export default DashboardHome;
