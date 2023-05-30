import React, { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useGlobalContext } from "../context/AppContext";
import { TbPlaylist, TbDownload, TbFileMusic } from "react-icons/tb";
import { motion } from "framer-motion";
import { fetchAllSongs } from "../api/index";
import { actionType } from "../reducers/reducer";

const MusicPlayer = () => {
   const { state, dispatch } = useGlobalContext();
   const [isPlaylist, setIsPlaylist] = useState(true);

   const nextTrack = () => {
      // edge case of last song
      if (state.songIndex > state.allSongs.length - 1) {
         dispatch({
            type: actionType.SET_SONG_INDEX,
            songIndex: 0,
         });
      } else {
         dispatch({
            type: actionType.SET_SONG_INDEX,
            songIndex: state.songIndex + 1,
         });
      }
   };

   const previousTrack = () => {
      // edge case of first song
      if (state.songIndex === 0) {
         dispatch({
            type: actionType.SET_SONG_INDEX,
            songIndex: 0,
         });
      } else {
         dispatch({
            type: actionType.SET_SONG_INDEX,
            songIndex: state.songIndex - 1,
         });
      }
   };

   return (
      <div className="w-full flex items-center gap-3 ">
         <div className={`w-full flex items-center gap-3 p-4 relative`}>
            {/* song cover */}
            <img
               src={state?.allSongs[state?.songIndex]?.imageUrl}
               alt="songName"
               className="w-40 h-20 object-cover rounded-md"
            />
            <div className="flex flex-col">
               <p className="text-xl text-headingColor font-semibold">
                  {/* song name */}
                  {`${
                     state.allSongs[state.songIndex]?.name.length > 20
                        ? state.allSongs[state.songIndex]?.name.slice(0, 20)
                        : state.allSongs[state.songIndex]?.name
                  }`}
                  {/* song album */}
                  {state.allSongs[state.song]?.album && (
                     <span className="text-base">({state.allSongs[state.song]?.album})</span>
                  )}
               </p>
               {/* song artist */}
               <p className="text-orange-600 font-semibold text-left">
                  {state.allSongs[state.songIndex]?.artist}
               </p>
               <div className="flex items-center justify-between border shadow-sm bg-orange-500 rounded-md p-1">
                  <motion.i
                     whileTap={{ scale: 0.75 }}
                     onClick={() => setIsPlaylist((prev) => !prev)}
                  >
                     <TbPlaylist size={22} className="text-white" />
                  </motion.i>
                  <motion.i whileTap={{ scale: 0.75 }}>
                     <TbDownload size={22} className="text-white" />
                  </motion.i>
               </div>
            </div>

            <div className="flex-1">
               <AudioPlayer
                  showSkipControls={true}
                  showJumpControls={true}
                  showFilledVolume={true}
                  onClickNext={nextTrack}
                  onClickPrevious={previousTrack}
                  showDownloadProgress={true}
                  volume={0.1}
                  src={state?.allSongs[state?.songIndex]?.songUrl}
                  onPlay={(e) => console.log("onPlay")}
                  // other props here
               />
            </div>
            {isPlaylist && <MusicPlayerPlaylist />}
         </div>
      </div>
   );
};

const MusicPlayerPlaylist = () => {
   const { state, dispatch } = useGlobalContext();

   useEffect(() => {
      if (!state.allSongs) {
         fetchAllSongs().then((res) => {
            dispatch({
               type: actionType.SET_ALL_SONGS,
               allSongs: res.data,
            });
         });
      }
   }, []);

   const newSelectedSong = (idx) => {
      if (!state.isSongPlaying) {
         dispatch({
            type: actionType.SET_IS_SONG_PLAYING,
            isSongPlaying: true,
         });
      }
      if (state.songIndex !== idx) {
         dispatch({
            type: actionType.SET_SONG_INDEX,
            songIndex: idx,
         });
      }
   };

   return (
      <div className="absolute z-50 left-4 bottom-24 gap-2 py-2 w-350 max-w-[350px] h-510 max-h-[510px] flex flex-col overflow-y-scroll rounded-md bg-primary ">
         {state.allSongs.length > 0 ? (
            state?.allSongs.map((music, idx) => {
               return (
                  <motion.div
                     key={music?._id}
                     initial={{ opacity: 0, translateX: -50 }}
                     animate={{ opacity: 1, translateX: 0 }}
                     transition={{ duration: 0.3 }}
                     className="group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer bg-transparent"
                     onClick={() => newSelectedSong(idx)}
                  >
                     <TbFileMusic className="text-textColor group-hover:text-headingColor text-xl cursor-pointer" />
                     <div className="flex flex-col">
                        <p className="text-lg text-headingColor font-semibold">
                           {`${music?.name.length > 20 ? music?.name.slice(0, 20) : music?.name}`}
                           <span className="text-base "> ({music?.album})</span>
                        </p>
                        <p className="text-orange-600">{music?.artist}</p>
                     </div>
                  </motion.div>
               );
            })
         ) : (
            <>null</>
         )}
      </div>
   );
};

export default MusicPlayer;
