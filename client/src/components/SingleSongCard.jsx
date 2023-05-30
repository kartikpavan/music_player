import React from "react";
import { motion } from "framer-motion";
import {
   deleteSingleAlbum,
   deleteSingleArtist,
   deleteSingleSong,
   fetchAllAlbums,
   fetchAllArtists,
   fetchAllSongs,
} from "../api";
import { actionType } from "../reducers/reducer";
import { useGlobalContext } from "../context/AppContext";

// toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { deleteObject, ref } from "firebase/storage";
import { firebaseStorage } from "../config/firebase.config";

const SingleSongCard = ({ data, index, type }) => {
   const [showDeleteModal, setShowDeleteModal] = React.useState(false);
   const { state, dispatch } = useGlobalContext();

   const deleteInstance = (data) => {
      // deleting Single song
      if (type === "song") {
         // Deleting Images from Firebase Storage
         const deleteRef = ref(firebaseStorage, data.imageUrl);
         deleteObject(deleteRef).then(() => {});
         //  deleting Instance from Mongo DB
         deleteSingleSong(data._id).then((response) => {
            // once the data is deleted we will fetch the new data from DB and also update the Context provider with the new Data
            if (response) {
               fetchAllSongs().then((data) =>
                  dispatch({ type: actionType.SET_ALL_SONGS, allSongs: data.data })
               );
            }
            toast.success("Song Deleted");
            setShowDeleteModal(false);
         });
         // deleting Single Artist
      } else if (type === "artist") {
         // Deleting Artist from Firebase Storage
         const deleteRef = ref(firebaseStorage, data.imageUrl);
         deleteObject(deleteRef).then(() => {});
         //  deleting Instance from Mongo DB
         deleteSingleArtist(data._id).then((response) => {
            // once the data is deleted we will fetch the new data from DB and also update the Context provider with the new Data
            if (response) {
               fetchAllArtists().then((data) =>
                  dispatch({ type: actionType.SET_ALL_ARTISTS, allArtists: data.data })
               );
            }
            toast.success("Artist Deleted");
            setShowDeleteModal(false);
         });
         // deleting Single Album
      } else if (type === "album") {
         // Deleting Album from Firebase Storage
         const deleteRef = ref(firebaseStorage, data.imageUrl);
         deleteObject(deleteRef).then(() => {});
         //  deleting Instance from Mongo DB
         deleteSingleAlbum(data._id).then((response) => {
            // once the data is deleted we will fetch the new data from DB and also update the Context provider with the new Data
            if (response) {
               fetchAllAlbums().then((data) =>
                  dispatch({ type: actionType.SET_ALL_ALBUMS, allAlbums: data.data })
               );
            }
            toast.success("Album Deleted");
            setShowDeleteModal(false);
         });
      }
   };

   return (
      <motion.div className="relative mt-8 w-40 min-w-[210px] p-2 cursor-pointer bg-white hover:bg-card duration-200 transition-all ease-in-out shadow-md rounded-md flex flex-col items-center">
         {/* image container */}
         <div className="w-40 min-w-[160px] min-h-[160px] rounded-md drop-shadow-md relative overflow-hidden">
            <motion.img
               whileHover={{ scale: 1.05 }}
               src={data?.imageUrl}
               alt="name"
               className="rounded-md w-full h-36 object-contain"
            />
         </div>
         {/* song name */}
         <p className="text-base text-center text-headingColor font-semibold my-2">
            {data?.name.length > 20 ? `${data?.name.slice(0, 20)}...` : data?.name}
            {/* artist name */}
            {data?.artist && (
               <span className="block text-sm text-orange-400 my-1 text-center">
                  {data?.artist.length > 20 ? `${data?.artist.slice(0, 20)}...` : data?.artist}
               </span>
            )}
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
                        <div className="relative p-6 flex-auto">
                           <p className="my-4 text-slate-500 text-lg leading-relaxed">
                              Are you sure you want to Delete this ?
                           </p>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                           <button
                              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setShowDeleteModal(false)}
                           >
                              Close
                           </button>
                           <button
                              className="bg-orange-500 text-white active:bg-orange-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => deleteInstance(data)}
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
