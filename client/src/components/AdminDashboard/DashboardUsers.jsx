import React from "react";
import { useGlobalContext } from "../../context/AppContext";
import { motion } from "framer-motion";
const DashboardUsers = () => {
   const { state, dispatch } = useGlobalContext();

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
                  return <DashboardUserCard key={idx} data={item} index={idx} />;
               })}
         </div>
      </div>
   );
};

export const DashboardUserCard = ({ data, index }) => {
   const dateConverter = (time) => {
      const d = new Date(time);
      return d.toDateString();
   };
   return (
      <motion.div className="relative w-full rounded-md flex items-center justify-center py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md duration-200 transition-all ease-linear">
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
         <p
            className={`text-base ${
               data?.role === "admin" ? "text-yellow-500 font-semibold" : "text-textColor"
            } w-275 min-w-[160px] text-center`}
         >
            {data?.role.toUpperCase()}
         </p>
      </motion.div>
   );
};

export default DashboardUsers;
