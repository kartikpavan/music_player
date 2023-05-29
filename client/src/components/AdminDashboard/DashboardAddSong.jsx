import { useEffect, useState, useRef } from "react";
// firebase
import { ref, deleteObject } from "firebase/storage";
import { firebaseStorage } from "../../config/firebase.config";
import { motion } from "framer-motion";
import { useGlobalContext } from "../../context/AppContext";
import DropDownMenu from "../DropDownMenu";
import { categories, languages } from "../../utils/data";
import { fetchAllAlbums, fetchAllArtists, saveNewSong } from "../../api";
import { actionType } from "../../reducers/reducer";
import Loader from "../Loader";
import FileUpload from "../FileUpload";

const DashboardAddSong = () => {
   const { state, dispatch } = useGlobalContext();
   const [songName, setSongName] = useState("");
   // Image Upload state
   const [isImageUploading, setIsImageUploading] = useState(false);
   const [artistImageCover, setArtistImageCover] = useState(null);

   // Audio Upload State
   const [isAudioUploading, setIsAudioUploading] = useState(false);
   const [audioURL, setAudioURL] = useState(null);

   const deleteUploadedFile = (url, image) => {
      if (image) {
         setIsImageUploading(true);
         const deleteRef = ref(firebaseStorage, url);
         deleteObject(deleteRef)
            .then(() => {
               setIsImageUploading(false);
               setArtistImageCover(null);
            })
            .catch((err) => console.log(err));
      } else {
         setIsAudioUploading(true);
         const delRef = ref(firebaseStorage, url);
         deleteObject(delRef)
            .then(() => {
               setIsAudioUploading(false);
               setAudioURL(null);
            })
            .catch((err) => console.log(err));
      }
   };

   useEffect(() => {
      if (!state.allArtists) {
         fetchAllArtists().then((response) =>
            dispatch({
               type: actionType.SET_ALL_ARTISTS,
               allArtists: response.data,
            })
         );
      }

      if (!state.allAlbums) {
         fetchAllAlbums().then((response) =>
            dispatch({
               type: actionType.SET_ALL_ALBUMS,
               allAlbums: response.data,
            })
         );
      }
   }, []);

   const isSendBtnDisabled = Boolean(artistImageCover) && Boolean(audioURL);

   // Save Song in the Mongo Db Database
   const saveSong = () => {
      if (!artistImageCover || !audioURL) {
         // throw error
         alert("Cannot Submit");
      } else {
         setIsAudioUploading(true);
         setIsImageUploading(true);

         const data = {
            name: songName,
            imageUrl: artistImageCover,
            songUrl: audioURL,
            album: state.albumFilter,
            artist: state.artistFilter,
            language: state.languageFilter,
            category: state.filterTerm,
         };
         // saving the song
         saveNewSong(data)
            .then((response) => {
               console.log(response);
               setSongName("");
               setIsAudioUploading(false);
               setIsImageUploading(false);
               setArtistImageCover(null);
               setAudioURL(null);
               dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
               dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
               dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: null });
               dispatch({ type: actionType.SET_FILTER_TERM, allFilter: "all" });
            })
            .catch((err) => {
               console.log(err);
               setIsAudioUploading(false);
               setIsImageUploading(false);
            });
      }
   };

   return (
      <section className="flex items-center justify-between p-4 border flex-col gap-4">
         <div className="p-2 border ">
            {/* input */}
            <input
               value={songName}
               onChange={(e) => setSongName(e.target.value)}
               type="text"
               placeholder="Name of the Song"
               className="w-full rounded-md p-3 text-base font-semibold text-textColor outline-none border shadow-sm focus:border-orange-500"
            />
            {/* filter buttons */}
            <div className="flex items-center justify-between gap-4 w-full my-2">
               <DropDownMenu filterData={state.allArtists} title={"Artists"} />
               <DropDownMenu filterData={state.allAlbums} title={"Albums"} />
               <DropDownMenu filterData={languages} title={"Language"} />
               <DropDownMenu filterData={categories} title={"Category"} />
            </div>
            {/* file upload container */}
            <div className="bg-card w-full h-300 backdrop-blur-md rounded-md border-dotted shadow-sm my-2 border-gray-300 cursor-pointer">
               {isImageUploading && <Loader isImage={true} />}
               {!isImageUploading && (
                  <>
                     {!artistImageCover ? (
                        <FileUpload
                           isUploading={setIsImageUploading}
                           isPresent={setArtistImageCover}
                           isImage={true}
                        />
                     ) : (
                        <div className="relative w-full h-full rounded-md overflow-hidden ">
                           <img
                              src={artistImageCover}
                              alt="image"
                              className="w-full h-full object-contain"
                           />
                           <button
                              onClick={() => deleteUploadedFile(artistImageCover, true)}
                              className="p-2 text-sm absolute top-1 right-1 z-50 font-semibold text-red-500 bg-red-100 rounded-md hover:scale-110 duration-100 transition-all"
                           >
                              DELETE
                           </button>
                        </div>
                     )}
                  </>
               )}
            </div>
            {/* Audio Upload Container */}
            <div className="bg-card w-full h-300 backdrop-blur-md rounded-md border-dotted shadow-sm my-2 border-gray-300 cursor-pointer">
               {isAudioUploading && <Loader isImage={false} />}
               {!isAudioUploading && (
                  <>
                     {!audioURL ? (
                        <FileUpload
                           isUploading={setIsAudioUploading}
                           isPresent={setAudioURL}
                           isImage={false}
                        />
                     ) : (
                        <div className="relative flex items-center justify-center w-full h-full rounded-md overflow-hidden ">
                           <audio controls>
                              <source src={audioURL} />
                              <a href={audioURL}>Download</a>
                           </audio>
                           <button
                              onClick={() => deleteUploadedFile(audioURL, false)}
                              className="p-2 text-sm absolute top-1 right-1 z-50 font-semibold text-red-500 bg-red-100 rounded-md hover:scale-110 duration-100 transition-all"
                           >
                              DELETE
                           </button>
                        </div>
                     )}
                  </>
               )}
            </div>
            {/* submit Button */}
            <div className="flex items-center justify-center">
               <div className="inline-block mr-2 mt-2">
                  <motion.button
                     type="button"
                     onClick={saveSong}
                     whileTap={{ scale: 0.75 }}
                     disabled={!isSendBtnDisabled}
                     className="w-40  rounded-md shadow-md p-2 text-white font-semibold bg-orange-600 text-lg disabled:bg-gray-300 disabled:text-gray-400"
                  >
                     SAVE SONG
                  </motion.button>
               </div>
            </div>
         </div>
         <div></div>
      </section>
   );
};

export default DashboardAddSong;
