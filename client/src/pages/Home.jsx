import React, { useEffect } from "react";
import {
   AllAlbums,
   AllArtists,
   AllUsers,
   Navbar,
   UserAddSong,
   UserHome,
   UserSongs,
} from "../components";
import { NavLink, useNavigate, Route, Routes } from "react-router-dom";

const activeNavLink =
   "w-28 h-10 flex items-center text-orange-500 justify-center bg-orange-100 rounded-lg transition-all duration-100 ease-in";
const inactiveNavLink = "w-28 h-10 text-textColor flex items-center justify-center rounded-lg";

const Home = () => {
   const navigate = useNavigate;

   useEffect(() => {});

   return (
      <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
         <Navbar />
         <div className="my-4 p-2 flex items-center gap-x-4 border border-white bg-white rounded-lg shadow-md">
            <NavLink
               to="/"
               className={({ isActive }) => (isActive ? activeNavLink : inactiveNavLink)}
            >
               <p className="text-lg font-semibold">Home</p>
            </NavLink>
            <NavLink
               to="/users"
               className={({ isActive }) => (isActive ? activeNavLink : inactiveNavLink)}
            >
               <p className="text-lg font-semibold ">Users</p>
            </NavLink>
            <NavLink
               to="/songs"
               className={({ isActive }) => (isActive ? activeNavLink : inactiveNavLink)}
            >
               <p className="text-lg font-semibold ">Songs</p>
            </NavLink>
            <NavLink
               to="/artists"
               className={({ isActive }) => (isActive ? activeNavLink : inactiveNavLink)}
            >
               <p className="text-lg font-semibold ">Artists</p>
            </NavLink>

            <NavLink
               to="/albums"
               className={({ isActive }) => (isActive ? activeNavLink : inactiveNavLink)}
            >
               <p className="text-lg font-semibold ">Albums</p>
            </NavLink>
         </div>
         <main className="my-4 w-full lg:w-[70%] p-4 border-2">
            {/* all cards container */}

            <Routes>
               <Route path="/" element={<UserHome />} />
               <Route path="/songs" element={<UserSongs />} />
               <Route path="/users" element={<AllUsers />} />
               <Route path="/artists" element={<AllArtists />} />
               <Route path="/albums" element={<AllAlbums />} />
               <Route path="/addSong" element={<UserAddSong />} />
            </Routes>
         </main>
      </div>
   );
};

export default Home;
