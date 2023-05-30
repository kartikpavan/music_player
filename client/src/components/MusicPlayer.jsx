import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useGlobalContext } from "../context/AppContext";
import { TbPlaylist, TbDownload } from "react-icons/tb";
import { motion } from "framer-motion";

const MusicPlayer = () => {
   const { state, dispatch } = useGlobalContext();

   const nextTrack = () => {};

   const previousTrack = () => {};

   return (
      <div className="w-full flex items-center gap-3 overflow-hidden">
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
                  <motion.i whileTap={{ scale: 0.75 }}>
                     <TbPlaylist size={22} className="text-white" />
                  </motion.i>
                  <motion.i whileTap={{ scale: 0.75 }}>
                     <TbDownload size={22} className="text-white" />
                  </motion.i>
               </div>
            </div>

            <div className="flex-1">
               <AudioPlayer
                  autoPlay
                  showSkipControls={true}
                  showJumpControls={true}
                  showFilledVolume={true}
                  onClickNext={nextTrack}
                  onClickPrevious={previousTrack}
                  showDownloadProgress={true}
                  src={state?.allSongs[state?.songIndex]?.songUrl}
                  onPlay={(e) => console.log("onPlay")}
                  // other props here
               />
            </div>
         </div>
      </div>
   );
};

export default MusicPlayer;
