import React, { useEffect, useState } from "react";
import { fetchAllSongs } from "../../api";
import { useGlobalContext } from "../../context/AppContext";
import { actionType } from "../../reducers/reducer";
import UserSongCard from "../UserSongCard";
import { AiFillFileAdd } from "react-icons/ai";
import { NavLink } from "react-router-dom";
const UserSongs = () => {
   const { state, dispatch } = useGlobalContext();
   const [showModal, setShowModal] = useState(false);

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
            <button
               onClick={() => setShowModal(true)}
               className="flex gap-x-2 p-2 rounded-md border bg-orange-500 hover:bg-white text-white hover:text-orange-500  duration-200 transition-all hover:border-orange-500"
            >
               <AiFillFileAdd size={24} className=" hover:text-orange-500" />
               <p>Add Song</p>
            </button>
         </div>
         {/* Modal */}
         {showModal ? (
            <>
               <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                     {/*content*/}
                     <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                           <p className="my-4 text-slate-500 text-lg leading-relaxed">
                              This feature is only available to Admins, Please Contact <br />
                              <a
                                 href="mailto:kartikpavan2@gmail.com"
                                 className="underline italic font-semibold text-orange-600"
                              >
                                 kartikpavan2@gmail.com
                              </a>
                           </p>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                           <button
                              className="bg-orange-500 text-white active:bg-orange-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setShowModal(false)}
                           >
                              OK
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
         ) : null}
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
