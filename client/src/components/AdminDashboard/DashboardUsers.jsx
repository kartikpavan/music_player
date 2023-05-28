import React, { useState } from "react";
import { useGlobalContext } from "../../context/AppContext";
import { motion } from "framer-motion";
import { AiFillSetting, AiFillDelete } from "react-icons/ai";
import { changeUserRole, deleteSingleUser, fetchAllUsers } from "../../api";
import { actionType } from "../../reducers/reducer";
// user Card
import DBUserCard from "../DBUserCard";

const DashboardUsers = () => {
   const { state } = useGlobalContext();

   return (
      <div className="w-full p-4 flex items-center justify-center flex-col">
         {/* filters */}

         {/* tabular data */}
         <div className="relative w-full py-12 min-h-[400px] overflow-x-scroll my-4 flex flex-col items-center justify-start p-4 border-gray-300 rounded-md gap-3">
            {/* total count of the user */}
            <div className="absolute top-0 left-0 flex bg-white rounded-md p-2 shadow-sm">
               <p className=" text-textColor font-bold">Total Users :</p>
               <p className=" font-bold text-orange-500 px-2"> {state.allUsers?.length}</p>
            </div>
            {/* table heading data */}
            <div className="w-full min-w-[750px] flex items-center justify-between">
               <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center"></p>
               <p className="text-sm font-semibold w-275 min-w-[160px] text-center">Name</p>
               <p className="text-sm font-semibold w-275 min-w-[160px] text-center">Email</p>
               <p className="text-sm font-semibold w-275 min-w-[160px] text-center">Verified</p>
               <p className="text-sm font-semibold w-275 min-w-[160px] text-center">Created</p>
               <p className="text-sm  font-semibold w-275 min-w-[160px] text-center">Role</p>
            </div>
            {/* Table Body Content */}
            {state.allUsers &&
               state.allUsers?.map((item, idx) => {
                  return <DBUserCard key={idx} data={item} index={idx} />;
               })}
         </div>
      </div>
   );
};



export default DashboardUsers;
