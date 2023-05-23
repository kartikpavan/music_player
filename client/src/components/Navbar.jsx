import { FaCrown } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo2.png";
//Firebase
import { firebaseAuth } from "../config/firebase.config";
import { signOut } from "firebase/auth";
// Context Provider
import { useGlobalContext } from "../context/AppContext";
// Framer Motion
import { motion } from "framer-motion";
import { useState } from "react";

const activeLinkStyle =
   "text-lg text-headingColor hover:text-headingColor font-semibold duration-100 transition-all ease-in-out";
const nonActiveLinkStyle =
   "text-lg text-text-color hover:text-headingColor duration-100 transition-all ease-in-out";

const Navbar = () => {
   const { state } = useGlobalContext();
   // user profile drop down state
   const [dropDownState, setDropDownState] = useState(false);

   // Sign Out
   const logOut = () => {
      signOut(firebaseAuth)
         .then(() => {
            window.localStorage.setItem("auth", "false");
            console.log("signed-out successfully");
         })
         .catch((error) => console.log(error));
   };
   return (
      <nav className="flex items-center w-full p-4 md:py-2 md:px-6">
         {/* Logo */}
         <NavLink to="/">
            <img src={Logo} alt="logo" className="w-24" />
         </NavLink>
         {/* List */}
         <ul className="flex items-center justify-center ml-7">
            <li className="mx-5 text-lg">
               <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? activeLinkStyle : nonActiveLinkStyle)}
               >
                  Home
               </NavLink>
            </li>
            <li className="mx-5 text-lg">
               <NavLink
                  to="/music"
                  className={({ isActive }) => (isActive ? activeLinkStyle : nonActiveLinkStyle)}
               >
                  My Music
               </NavLink>
            </li>
            <li className="mx-5 text-lg">
               <NavLink
                  to="/premium"
                  className={({ isActive }) => (isActive ? activeLinkStyle : nonActiveLinkStyle)}
               >
                  Premium
               </NavLink>
            </li>
            <li className="mx-5 text-lg">
               <NavLink
                  to="/contact"
                  className={({ isActive }) => (isActive ? activeLinkStyle : nonActiveLinkStyle)}
               >
                  Contact Us
               </NavLink>
            </li>
         </ul>
         {/* User Profile */}
         {/* when mouse hovers profile trigger the drop down menu */}
         <div
            onMouseEnter={(e) => setDropDownState(true)}
            onMouseLeave={(e) => setDropDownState(false)}
            className="flex items-center ml-auto cursor-pointer gap-2 relative h-20"
         >
            <div className="flex flex-col">
               <p className="text-lg text-textColor hover:text-headingColor font-semibold text-right">
                  {state?.user?.user?.name}
               </p>
               <p className="text-yellow-500 text-sm flex font-semibold items-center gap-1 ml-auto">
                  <FaCrown className="text-sm -ml-1" /> Pro Member
               </p>
            </div>
            <img
               src={
                  state?.user?.user?.userImageUrl ||
                  "https://www.ohe.org/wp-content/uploads/2023/02/fallback-profile-image_1.jpg"
               }
               rel="noreferrer" // noreferrer is related to analytics and tracking , referrer shows the previous page the user came from ,
               //by saaying no referrer, we prevent other pages to see where we came from
               alt="profile-pic"
               className="w-12 h-12 rounded-full drop-shadow-xl min-w-10 object-cover bg-black"
            />
            {dropDownState && (
               <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  className="absolute z-10 top-20 right-0 bg-card p-3 shadow-lg rounded-lg backdrop-blur-sm flex flex-col w-48 gap-2 "
               >
                  <NavLink to="/my-account">
                     <p className="text-base text-textColor hover:font-semibold duration-200 transition-all ease-in-out">
                        Profile
                     </p>
                  </NavLink>
                  <NavLink to="/my-music">
                     <p className="text-base text-textColor hover:font-semibold duration-200 transition-all ease-in-out">
                        My Music
                     </p>
                  </NavLink>
                  <hr />
                  {/* Admin Priviliges */}
                  {state?.user?.user?.role === "admin" && (
                     <>
                        <NavLink to={"/dashboard/home"}>
                           <p className="text-base text-textColor hover:font-semibold duration-200 transition-all ease-in-out">
                              ADMIN DASHBOARD
                           </p>
                        </NavLink>
                        <hr />
                     </>
                  )}

                  <p onClick={logOut} className="text-base text-red-500 ">
                     LOG OUT
                  </p>
               </motion.div>
            )}
         </div>
      </nav>
   );
};

export default Navbar;
