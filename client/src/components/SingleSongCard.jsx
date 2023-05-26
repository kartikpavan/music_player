import React from "react";
import { motion } from "framer-motion";

const SingleSongCard = ({ song, index }) => {
   const { _id, name, imageUrl, songUrl, album, artist, language, category } = song;

   const [showDeleteModal, setShowDeleteModal] = React.useState(false);

   const deleteSong = (songId) => {
      setShowDeleteModal(false);
   };

   return (
      <motion.div className="relative w-40 min-w-[210px] p-2 cursor-pointer bg-orange-100/50 hover:bg-card duration-200 transition-all ease-in-out shadow-md rounded-md flex flex-col items-center">
         {/* image container */}
         <div className="w-40 min-w-[160px] min-h-[160px] rounded-md drop-shadow-md relative overflow-hidden">
            <motion.img
               whileHover={{ scale: 1.05 }}
               src={imageUrl}
               alt="name"
               className="rounded-md object-cover"
            />
         </div>
         {/* song name */}
         <p className="text-base text-headingColor font-semibold my-2">
            {name.length > 20 ? `${name.slice(0, 20)}...` : name}
            {/* artist name */}
            <span className="block text-sm text-orange-400 my-1 text-center">
               {artist.length > 20 ? `${artist.slice(0, 20)}...` : artist}
            </span>
         </p>
         {/* Delete Song */}
         <motion.button
            onClick={() => setShowDeleteModal(true)}
            whileTap={{ scale: 0.75 }}
            whileHover={{ scale: 1.1 }}
            className="px-2 py-1 text-red-500 text-sm font-semibold bg-red-100 rounded-md shadow-sm"
         >
            Delete
         </motion.button>
         {/* Delete Modal */}
         {showDeleteModal ? (
            <>
               <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                     {/*content*/}
                     <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*body*/}
                        <div className="relative p-4 flex-auto">
                           <p className="my-4 text-slate-500 text-lg leading-relaxed">
                              Are you sure you want to Delete the song ?
                           </p>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b gap-x-4">
                           <button
                              className="text-red-500 font-semibold"
                              type="button"
                              onClick={() => setShowDeleteModal(false)}
                           >
                              Close
                           </button>
                           <button
                              className="bg-orange-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => deleteSong(_id)}
                           >
                              Save Changes
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
         ) : null}
      </motion.div>
   );
};

export default SingleSongCard;
