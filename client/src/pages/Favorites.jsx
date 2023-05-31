import React from "react";
import { useGlobalContext } from "../context/AppContext";

import UserSongCard from "../components/UserSongCard";

const Favorites = () => {
   const { state, dispatch } = useGlobalContext();

   return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-x-16 gap-y-8 ">
         {/* {state?.user?.user?.favoriteSongs?.map(({ data }, idx) => {
            return <UserSongCard key={idx} data={data} index={idx} type="song" />;
         })} */}
         WORK IN PROGRESS
      </div>
   );
};

export default Favorites;
