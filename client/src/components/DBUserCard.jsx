import React, { useState } from "react";
import { useGlobalContext } from "../context/AppContext";

import { changeUserRole, deleteSingleUser, fetchAllUsers } from "../api";
import { motion } from "framer-motion";
import { AiFillSetting, AiFillDelete } from "react-icons/ai";
import { actionType } from "../reducers/reducer";

const DBUserCard = ({ data, index }) => {
   const { state, dispatch } = useGlobalContext();

   const [isModalOpen, setIsModalOpen] = useState(false);

   // updating user Role
   const updateUserRole = (userId, role) => {
      changeUserRole(userId, role).then((response) => {
         // once the data is updated we will fetch the new data from DB and also update the Context provider with the new Data
         if (response) {
            fetchAllUsers().then((data) =>
               dispatch({ type: actionType.SET_ALL_USERS, allUsers: data.data })
            );
         }
      });
      setIsModalOpen(false);
   };

   // delete User
   const deleteUser = (userId) => {
      deleteSingleUser(userId).then((response) => {
         // once the data is deleted we will fetch the new data from DB and also update the Context provider with the new Data
         if (response) {
            fetchAllUsers().then((data) =>
               dispatch({ type: actionType.SET_ALL_USERS, allUsers: data.data })
            );
         }
      });
   };

   // Converting incoming date from Firebase into local Date String
   const dateConverter = (time) => {
      const d = new Date(time);
      return d.toDateString();
   };

   return (
      <motion.div
         key={index}
         className="relative w-full rounded-md flex items-center justify-center py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md duration-200 transition-all ease-linear"
      >
         {/* delete icon */}
         {data?._id !== state.user?.user?._id && (
            <motion.div
               onClick={() => deleteUser(data?._id)}
               whileTap={{ scale: 0.75 }}
               className="absolute left-4 w-8 h-8 rounded-md shadow-md flex items-center justify-center bg-red-200 hover:bg-red-500 hover:scale-110 duration-200 transition-all"
            >
               <AiFillDelete className="text-red-500 hover:text-white duration-200 transition-all " />
            </motion.div>
         )}

         {/* user image */}
         <div className="w-275 min-w-[160px] flex items-center justify-center">
            <img
               src={data?.userImageUrl}
               alt={data?.name}
               className="w-10 h-10 rounded-md object-cover min-w-[40px] shadow-md"
               referrerPolicy="noreferrer"
            />
         </div>
         <p className="text-base text-textColor w-275 min-w-[160px] text-center">{data?.name}</p>
         <p className="text-base text-textColor w-275 min-w-[160px] text-center">{data?.email}</p>
         <p
            className={`text-base font-semibold ${
               data?.email_verified ? "text-green-700" : "text-textColor"
            } w-275 min-w-[160px] text-center `}
         >
            {data?.email_verified ? "Verified" : "Not Verified"}
         </p>
         <p className="text-base text-textColor w-275 min-w-[160px] text-center">
            {dateConverter(data?.createdAt)}
         </p>
         <div
            className={`relative flex gap-x-3 items-center justify-center w-275 min-w-[160px] text-center ${
               data?.role === "admin" ? "text-yellow-500 font-semibold" : "text-textColor"
            }`}
         >
            {/* SUPER ADMIN , if row data id === current User Id */}
            <p>{data?._id === state.user?.user?._id ? "SUPER ADMIN" : data?.role.toUpperCase()} </p>
            {/* if user is a member then add setting button to change the role  */}
            {data?._id !== state.user?.user?._id && (
               <motion.div
                  whileTap={{ scale: 0.75 }}
                  onClick={() => setIsModalOpen((prev) => !prev)}
               >
                  <AiFillSetting className="text-textColor" size={22} />
               </motion.div>
            )}
            {isModalOpen && (
               <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="absolute z-10 top-6 right-4 p-2 bg-white rounded-md shadow-md border"
               >
                  <p className="text-textColor font-semibold text-sm">
                     Do you want to grant the user
                     <span className="text-orange-600">
                        {data?.role === "admin" ? " MEMBER " : " ADMIN "}
                     </span>
                     Privilege ?
                  </p>
                  <motion.button
                     whileTap={{ scale: 0.75 }}
                     onClick={() => setIsModalOpen((prev) => !prev)}
                     className="text-sm font-semibold px-2 py-1 m-1 bg-red-200 text-red-600 rounded-md shadow-md "
                  >
                     Cancel
                  </motion.button>
                  <motion.button
                     onClick={() =>
                        updateUserRole(data?._id, data?.role === "admin" ? "member" : "admin")
                     }
                     whileTap={{ scale: 0.75 }}
                     className="text-sm font-semibold px-2 py-1 m-1 bg-orange-200 text-orange-600 rounded-md shadow-md "
                  >
                     Yes
                  </motion.button>
               </motion.div>
            )}
         </div>
      </motion.div>
   );
};

export default DBUserCard;
