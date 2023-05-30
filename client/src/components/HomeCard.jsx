import React, { useEffect } from "react";
import { useGlobalContext } from "../context/AppContext";
import { fetchAllUsers, fetchAllAlbums, fetchAllSongs, fetchAllArtists } from "../api";
import { actionType } from "../reducers/reducer";

const HomeCard = () => {
   const { state, dispatch } = useGlobalContext();

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
      <div className="flex gap-16 items-center justify-center flex-wrap  py-10 p-14">
         <div className="">
            <div className="w-48 bg-white max-w-xs mx-auto rounded-md overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
               <div className="h-20 bg-[#FFA836] flex items-center justify-between">
                  <p className="mr-0 text-white text-lg pl-5">ALL USERS</p>
               </div>
               <div className="flex justify-between px-5 pt-6 mb-2 text-sm text-gray-600">
                  <p>TOTAL</p>
               </div>
               <p className="py-4 text-3xl ml-5">
                  {state.allUsers?.length > 0 ? state.allUsers?.length : 0}
               </p>
            </div>
         </div>

         <div className="">
            <div className="w-48 bg-white max-w-xs mx-auto rounded-md overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
               <div className="h-20 bg-[#FF4F00] flex items-center justify-between">
                  <p className="mr-0 text-white text-lg pl-5">ALL SONGS </p>
               </div>
               <div className="flex justify-between px-5 pt-6 mb-2 text-sm text-gray-600">
                  <p>TOTAL</p>
               </div>
               <p className="py-4 text-3xl ml-5">
                  {state.allSongs?.length > 0 ? state.allSongs?.length : 0}
               </p>
            </div>
         </div>

         <div className="">
            <div className="w-48 bg-white max-w-xs mx-auto rounded-md overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
               <div className="h-20 bg-[#FEBA4F] flex items-center justify-between">
                  <p className="mr-0 text-white text-lg pl-5">ALL ARTISTS</p>
               </div>
               <div className="flex justify-between pt-6 px-5 mb-2 text-sm text-gray-600">
                  <p>TOTAL</p>
               </div>
               <p className="py-4 text-3xl ml-5">
                  {state.allArtists?.length > 0 ? state.allArtists?.length : 0}
               </p>
            </div>
         </div>

         <div className="">
            <div className="w-48 bg-white max-w-xs mx-auto rounded-md overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
               <div className="h-20 bg-[#E68000] flex items-center justify-between">
                  <p className="mr-0 text-white text-lg pl-5">ALL ALBUMS</p>
               </div>
               <div className="flex justify-between pt-6 px-5 mb-2 text-sm text-gray-600">
                  <p>TOTAL</p>
               </div>
               <p className="py-4 text-3xl ml-5">
                  {state.allAlbums?.length > 0 ? state.allAlbums?.length : 0}
               </p>
            </div>
         </div>
      </div>
   );
};

export default HomeCard;
