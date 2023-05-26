import { useEffect, useState, useRef } from "react";
// firebase
import {
   getStorage,
   ref,
   getDownloadURL,
   uploadBytesResumable,
   deleteObject,
} from "firebase/storage";
//framer motion
import { motion } from "framer-motion";
import { firebaseStorage } from "../../config/firebase.config";
import { useGlobalContext } from "../../context/AppContext";
import DropDownMenu from "../DropDownMenu";
import { categories, languages } from "../../utils/data";
import { fetchAllAlbums, fetchAllArtists } from "../../api";
import { actionType } from "../../reducers/reducer";

const DashboardAddSong = () => {
   const { state, dispatch } = useGlobalContext();
   const [songName, setSongName] = useState("");

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

   return (
      <section className="flex items-center justify-center p-4 border flex-col gap-4">
         {/* input */}
         <input
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            type="text"
            placeholder="Name of the Song"
            className="w-full rounded-md p-3 text-base font-semibold text-textColor outline-none border shadow-sm focus:border-orange-500"
         />
         {/* filter buttons */}
         <div className="flex items-center justify-between gap-4 w-full">
            <DropDownMenu filterData={state.allArtists} title={"Artists"} />
            <DropDownMenu filterData={state.allAlbums} title={"Albums"} />
            <DropDownMenu filterData={languages} title={"Language"} />
            <DropDownMenu filterData={categories} title={"Category"} />
         </div>
      </section>
   );
};

export default DashboardAddSong;
