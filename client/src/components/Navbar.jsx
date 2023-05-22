import { FaCrown } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";
const activeLinkStyle =
   "text-lg text-headingColor hover:text-headingColor font-semibold duration-100 transition-all ease-in-out";
const nonActiveLinkStyle =
   "text-lg text-text-color hover:text-headingColor duration-100 transition-all ease-in-out";

const Navbar = () => {
   return (
      <nav className="flex items-center w-full p-4 md:py-2 md:px-6">
         {/* Logo */}
         <NavLink to="/">
            <img src={Logo} alt="logo" className="w-16" />
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
         <div className="flex items-center ml-auto cursor-pointer gap-2 relative">
            <div className="flex flex-col">
               <p className="text-lg text-textColor hover:text-headingColor font-semibold text-right">
                  Kartik Pavan
               </p>
               <p className="text-yellow-500 text-sm flex font-semibold items-center gap-1 ml-auto">
                  <FaCrown className="text-sm -ml-1" /> Pro Member
               </p>
            </div>
            <img
               src=""
               alt="profile-pic"
               className="w-12 h-12 rounded-full shadow-md min-w-10 object-cover bg-black"
            />
         </div>
      </nav>
   );
};

export default Navbar;
