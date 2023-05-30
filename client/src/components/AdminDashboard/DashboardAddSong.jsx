import { useEffect, useState, useRef } from "react";
// firebase
import { ref, deleteObject } from "firebase/storage";
import { firebaseStorage } from "../../config/firebase.config";
import { motion } from "framer-motion";
import { useGlobalContext } from "../../context/AppContext";
import DropDownMenu from "../DropDownMenu";
import { categories, languages } from "../../utils/data";
import {
   fetchAllAlbums,
   fetchAllArtists,
   fetchAllSongs,
   saveNewAlbum,
   saveNewArtist,
   saveNewSong,
} from "../../api";
import { actionType } from "../../reducers/reducer";
import Loader from "../Loader";
import FileUpload from "../FileUpload";

// toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const DashboardAddSong = () => {
   const { state, dispatch } = useGlobalContext();
   const [songName, setSongName] = useState("");
   // Image Upload state
   const [isImageUploading, setIsImageUploading] = useState(false);
   const [songImageCover, setSongImageCover] = useState(null);

   // Audio Upload State
   const [isAudioUploading, setIsAudioUploading] = useState(false);
   const [audioURL, setAudioURL] = useState(null);

   // Artist Upload State
   const [artistName, setArtistName] = useState("");
   const [artistSocialMedia, setArtistSocialMedia] = useState("");
   const [artistImageCover, setArtistImageCover] = useState(null);
   const [isArtistUploading, setIsArtistUploading] = useState(false);

   // Album Upload State
   const [albumName, setAlbumName] = useState("");
   const [albumImageCover, setAlbumImageCover] = useState(null);
   const [isAlbumUploading, setIsAlbumUploading] = useState(false);

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

   // Deleting Uploaded Files
   const deleteUploadedFile = (url, isSongCover, isArtist, isAlbum) => {
      if (isSongCover) {
         setIsImageUploading(true);
         const deleteRef = ref(firebaseStorage, url);
         deleteObject(deleteRef)
            .then(() => {
               setIsImageUploading(false);
               setSongImageCover(null);
               toast.info("Resource Deleted");
            })
            .catch((err) => {
               console.log(err);
               toast.error(err);
            });
      } else if (isArtist) {
         setIsArtistUploading(true);
         const deleteRef = ref(firebaseStorage, url);
         deleteObject(deleteRef)
            .then(() => {
               setIsArtistUploading(false);
               setArtistImageCover(null);
               toast.info("Resource Deleted");
            })
            .catch((err) => {
               console.log(err);
               toast.error(err);
            });
      } else if (isAlbum) {
         setIsAlbumUploading(true);
         const deleteRef = ref(firebaseStorage, url);
         deleteObject(deleteRef)
            .then(() => {
               setIsAlbumUploading(false);
               setAlbumImageCover(null);
               toast.info("Resource Deleted");
            })
            .catch((err) => {
               console.log(err);
               toast.error(err);
            });
      } else {
         setIsAudioUploading(true);
         const delRef = ref(firebaseStorage, url);
         deleteObject(delRef)
            .then(() => {
               setIsAudioUploading(false);
               setAudioURL(null);
               toast.info("Resource Deleted");
            })
            .catch((err) => {
               console.log(err);
               toast.error(err);
            });
      }
   };

   // Save Song in the Mongo DB
   const saveSong = () => {
      if (!songImageCover || !audioURL || !songName) {
         // throw error
         alert("Missing Song Credentials");
      } else {
         setIsAudioUploading(true);
         setIsImageUploading(true);

         const data = {
            name: songName,
            imageUrl: songImageCover,
            songUrl: audioURL,
            album: state.albumFilter,
            artist: state.artistFilter,
            language: state.languageFilter,
            category: state.filterTerm,
         };
         // saving the songc

         saveNewSong(data)
            .then((response) => {
               fetchAllSongs().then((res) => {
                  dispatch({
                     type: actionType.SET_ALL_SONGS,
                     allSongs: res.data,
                  });
               });
               toast.success("Song Added To Database");
               setSongName("");
               setIsAudioUploading(false);
               setIsImageUploading(false);
               setSongImageCover(null);
               setAudioURL(null);
               dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
               dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
               dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: null });
               dispatch({ type: actionType.SET_FILTER_TERM, allFilter: "all" });
            })
            .catch((err) => {
               console.log(err);
               toast.error(err);
            });
      }
   };

   // Save Artist in Mongo DB
   const saveArtist = () => {
      if (!artistName || !artistSocialMedia || !artistImageCover) {
         alert("Missing Artist Credentials");
      } else {
         setIsArtistUploading(true);

         const data = {
            name: artistName,
            imageUrl: artistImageCover,
            twitter: artistSocialMedia,
         };

         // saving the song
         saveNewArtist(data)
            .then((response) => {
               fetchAllArtists().then((res) => {
                  dispatch({
                     type: actionType.SET_ALL_ARTISTS,
                     allArtists: res.data,
                  });
               });
               toast.success("Artist Added To Database");
               setArtistName("");
               setArtistSocialMedia("");
               setIsArtistUploading(false);
               setArtistImageCover(null);
            })
            .catch((err) => {
               console.log(err);
               toast.error(err);
            });
      }
   };

   // Save Album in Mongo DB
   const saveAlbum = () => {
      if (!albumName || !albumImageCover) {
         alert("Missing Artist Credentials");
      } else {
         setIsAlbumUploading(true);
         const data = {
            name: albumName,
            imageUrl: albumImageCover,
         };

         // saving the song
         saveNewAlbum(data)
            .then((response) => {
               fetchAllAlbums().then((res) => {
                  dispatch({
                     type: actionType.SET_ALL_ALBUMS,
                     allAlbums: res.data,
                  });
               });
               toast.success("Album Added To Database");
               setAlbumName("");
               setIsAlbumUploading(false);
               setAlbumImageCover(null);
            })
            .catch((err) => {
               console.log(err);
               toast.error(err);
            });
      }
   };

   const isSaveSongBtnDisabled = Boolean(songImageCover) && Boolean(audioURL);
   const isSaveArtistBtnDisabled =
      Boolean(artistImageCover) && Boolean(artistName.length) && Boolean(artistSocialMedia.length);
   const isSaveAlbumBtnDisabled = Boolean(albumImageCover) && Boolean(albumName.length);

   return (
      <section className="flex flex-col lg:flex-row gap-10 p-4 border">
         <div className=" w-full flex-basis">
            <p className="text-lg font-semibold text-orange-600 text-center mb-2">Song Details</p>
            {/* song input */}
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
            <div className="bg-card w-full h-48 backdrop-blur-md rounded-md border-dotted shadow-sm my-2 border-gray-300 cursor-pointer">
               {isImageUploading && <Loader isImage={true} />}
               {!isImageUploading && (
                  <>
                     {!songImageCover ? (
                        <FileUpload
                           isUploading={setIsImageUploading}
                           isPresent={setSongImageCover}
                           isImage={true}
                        />
                     ) : (
                        <div className="relative w-full h-full rounded-md overflow-hidden ">
                           <img
                              src={songImageCover}
                              alt="image"
                              className="w-full h-full object-contain"
                           />
                           <button
                              onClick={() => deleteUploadedFile(songImageCover, true, false, false)}
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
            <div className="bg-card w-full h-48 backdrop-blur-md rounded-md border-dotted shadow-sm my-2 border-gray-300 cursor-pointer">
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
                              onClick={() => deleteUploadedFile(audioURL, false, false, false)}
                              className="p-2 text-sm absolute top-1 right-1 z-50 font-semibold text-red-500 bg-red-100 rounded-md hover:scale-110 duration-100 transition-all"
                           >
                              DELETE
                           </button>
                        </div>
                     )}
                  </>
               )}
            </div>
            {/* Save Song */}
            <div className="flex items-center justify-center mb-4">
               <div className="inline-block mr-2 mt-2">
                  <motion.button
                     type="button"
                     onClick={saveSong}
                     whileTap={{ scale: 0.75 }}
                     disabled={!isSaveSongBtnDisabled}
                     className="w-40 rounded-md shadow-md p-2 text-white font-semibold bg-orange-600 text-lg disabled:bg-gray-300 disabled:text-gray-400"
                  >
                     SAVE SONG
                  </motion.button>
               </div>
            </div>
         </div>
         <div className=" w-full flex-basis">
            {/* Artist Upload Container*/}
            <p className="text-lg font-semibold text-center text-orange-600">Artist Details</p>
            <div className="bg-card w-full h-48 backdrop-blur-md rounded-md border-dotted shadow-sm my-2 border-gray-300 cursor-pointer">
               {isArtistUploading && <Loader isImage={true} />}
               {!isArtistUploading && (
                  <>
                     {!artistImageCover ? (
                        <FileUpload
                           isUploading={setIsArtistUploading}
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
                              onClick={() =>
                                 deleteUploadedFile(artistImageCover, false, true, false)
                              }
                              className="p-2 text-sm absolute top-1 right-1 z-50 font-semibold text-red-500 bg-red-100 rounded-md hover:scale-110 duration-100 transition-all"
                           >
                              DELETE
                           </button>
                        </div>
                     )}
                  </>
               )}
            </div>

            {/* Artist input */}
            <input
               value={artistName}
               onChange={(e) => setArtistName(e.target.value)}
               type="text"
               placeholder="Artist Name"
               className="w-full rounded-md p-3 text-base font-semibold text-textColor outline-none border shadow-sm focus:border-orange-500"
            />
            {/* Artist Social Media */}
            <input
               value={artistSocialMedia}
               onChange={(e) => setArtistSocialMedia(e.target.value)}
               type="text"
               placeholder="Artist's Twitter Handle"
               className="w-full rounded-md p-3 text-base font-semibold text-textColor outline-none border shadow-sm focus:border-orange-500"
            />
            {/* Save Artist */}
            <div className="flex items-center justify-center mb-4">
               <div className="inline-block mr-2 mt-2">
                  <motion.button
                     type="button"
                     onClick={saveArtist}
                     whileTap={{ scale: 0.75 }}
                     disabled={!isSaveArtistBtnDisabled}
                     className="w-40 rounded-md shadow-md p-2 text-white font-semibold bg-orange-600 text-lg disabled:bg-gray-300 disabled:text-gray-400"
                  >
                     SAVE ARTIST
                  </motion.button>
               </div>
            </div>

            {/* Album Upload Container*/}
            <p className="text-lg font-semibold text-center text-orange-600">Album Details</p>
            <div className="bg-card w-full h-48 backdrop-blur-md rounded-md border-dotted shadow-sm my-2 border-gray-300 cursor-pointer">
               {isAlbumUploading && <Loader isImage={true} />}
               {!isAlbumUploading && (
                  <>
                     {!albumImageCover ? (
                        <FileUpload
                           isUploading={setIsAlbumUploading}
                           isPresent={setAlbumImageCover}
                           isImage={true}
                        />
                     ) : (
                        <div className="relative w-full h-full rounded-md overflow-hidden ">
                           <img
                              src={albumImageCover}
                              alt="image"
                              className="w-full h-full object-contain"
                           />
                           <button
                              onClick={() =>
                                 deleteUploadedFile(artistImageCover, false, false, true)
                              }
                              className="p-2 text-sm absolute top-1 right-1 z-50 font-semibold text-red-500 bg-red-100 rounded-md hover:scale-110 duration-100 transition-all"
                           >
                              DELETE
                           </button>
                        </div>
                     )}
                  </>
               )}
            </div>
            {/* Album input */}
            <input
               value={albumName}
               onChange={(e) => setAlbumName(e.target.value)}
               type="text"
               placeholder="Album Name"
               className="w-full rounded-md p-3 text-base font-semibold text-textColor outline-none border shadow-sm focus:border-orange-500"
            />
            {/* Save Album */}
            <div className="flex items-center justify-center mb-4">
               <div className="inline-block mr-2 mt-2">
                  <motion.button
                     type="button"
                     onClick={saveAlbum}
                     whileTap={{ scale: 0.75 }}
                     disabled={!isSaveAlbumBtnDisabled}
                     className="w-40 rounded-md shadow-md p-2 text-white font-semibold bg-orange-600 text-lg disabled:bg-gray-300 disabled:text-gray-400"
                  >
                     SAVE ALBUM
                  </motion.button>
               </div>
            </div>
         </div>
      </section>
   );
};

export default DashboardAddSong;
