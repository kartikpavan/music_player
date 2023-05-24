import React from "react";
import {
   DashboardArtists,
   Navbar,
   DashboardHome,
   DashboardSongs,
   DashboardUsers,
   DashboardAlbums,
   DashboardAddSong,
} from "../../components";
import { NavLink, Route, Routes } from "react-router-dom";

const activeNavLink =
   "w-28 h-10 flex items-center text-orange-500 justify-center bg-orange-100 rounded-lg transition-all duration-100 ease-in";
const inactiveNavLink = "w-28 h-10 text-textColor flex items-center justify-center rounded-lg";

const AdminDashboard = () => {
   return (
      <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
         <Navbar />
         <div className="my-2 p-2 flex items-center border border-white bg-white rounded-lg shadow-md">
            <NavLink
               to="/dashboard/home"
               className={({ isActive }) => (isActive ? activeNavLink : inactiveNavLink)}
            >
               <p className="text-lg font-semibold">Home</p>
            </NavLink>
            <NavLink
               to="/dashboard/users"
               className={({ isActive }) => (isActive ? activeNavLink : inactiveNavLink)}
            >
               <p className="text-lg font-semibold ">Users</p>
            </NavLink>
            <NavLink
               to="/dashboard/songs"
               className={({ isActive }) => (isActive ? activeNavLink : inactiveNavLink)}
            >
               <p className="text-lg font-semibold ">Songs</p>
            </NavLink>
            <NavLink
               to="/dashboard/artists"
               className={({ isActive }) => (isActive ? activeNavLink : inactiveNavLink)}
            >
               <p className="text-lg font-semibold ">Artists</p>
            </NavLink>

            <NavLink
               to="/dashboard/albums"
               className={({ isActive }) => (isActive ? activeNavLink : inactiveNavLink)}
            >
               <p className="text-lg font-semibold ">Albums</p>
            </NavLink>
         </div>
         <main className="my-4 w-full p-4">
            <Routes>
               <Route path="/home" element={<DashboardHome />} />
               <Route path="/songs" element={<DashboardSongs />} />
               <Route path="/users" element={<DashboardUsers />} />
               <Route path="/artists" element={<DashboardArtists />} />
               <Route path="/albums" element={<DashboardAlbums />} />
               <Route path="/addSong" element={<DashboardAddSong />} />
            </Routes>
         </main>
      </div>
   );
};

export default AdminDashboard;
