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

// const DashboardUserCard = ({ data, index }) => {
//    const { state, dispatch } = useGlobalContext();
//    const [isModalOpen, setIsModalOpen] = useState(false);

//    // updating user Role
//    const updateUserRole = (userId, role) => {
//       changeUserRole(userId, role).then((response) => {
//          // once the data is updated we will fetch the new data from DB and also update the Context provider with the new Data
//          if (response) {
//             fetchAllUsers().then((data) =>
//                dispatch({ type: actionType.SET_ALL_USERS, allUsers: data.data })
//             );
//          }
//       });
//       setIsModalOpen(false);
//    };

//    // delete User
//    const deleteUser = (userId) => {
//       deleteSingleUser(userId).then((response) => {
//          // once the data is deleted we will fetch the new data from DB and also update the Context provider with the new Data
//          if (response) {
//             fetchAllUsers().then((data) =>
//                dispatch({ type: actionType.SET_ALL_USERS, allUsers: data.data })
//             );
//          }
//       });
//    };

//    const dateConverter = (time) => {
//       const d = new Date(time);
//       return d.toDateString();
//    };
//    return (
//       <motion.div
//          key={index}
//          className="relative w-full rounded-md flex items-center justify-center py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md duration-200 transition-all ease-linear"
//       >
//          {/* delete icon */}
//          {data?._id !== state.user?.user?._id && (
//             <motion.div
//                onClick={() => deleteUser(data?._id)}
//                whileTap={{ scale: 0.75 }}
//                className="absolute left-4 w-8 h-8 rounded-md shadow-md flex items-center justify-center bg-red-200 hover:bg-red-500 hover:scale-110 duration-200 transition-all"
//             >
//                <AiFillDelete className="text-red-500 hover:text-white duration-200 transition-all " />
//             </motion.div>
//          )}

//          {/* user image */}
//          <div className="w-275 min-w-[160px] flex items-center justify-center">
//             <img
//                src={data?.userImageUrl}
//                alt={data?.name}
//                className="w-10 h-10 rounded-md object-cover min-w-[40px] shadow-md"
//                referrerPolicy="noreferrer"
//             />
//          </div>
//          <p className="text-base text-textColor w-275 min-w-[160px] text-center">{data?.name}</p>
//          <p className="text-base text-textColor w-275 min-w-[160px] text-center">{data?.email}</p>
//          <p
//             className={`text-base font-semibold ${
//                data?.email_verified ? "text-green-700" : "text-textColor"
//             } w-275 min-w-[160px] text-center `}
//          >
//             {data?.email_verified ? "Verified" : "Not Verified"}
//          </p>
//          <p className="text-base text-textColor w-275 min-w-[160px] text-center">
//             {dateConverter(data?.createdAt)}
//          </p>
//          <div
//             className={`relative flex gap-x-3 items-center justify-center w-275 min-w-[160px] text-center ${
//                data?.role === "admin" ? "text-yellow-500 font-semibold" : "text-textColor"
//             }`}
//          >
//             {/* SUPER ADMIN , if row data id === current User Id */}
//             <p>{data?._id === state.user?.user?._id ? "SUPER ADMIN" : data?.role.toUpperCase()} </p>
//             {/* if user is a member then add setting button to change the role  */}
//             {data?._id !== state.user?.user?._id && (
//                <motion.div
//                   whileTap={{ scale: 0.75 }}
//                   onClick={() => setIsModalOpen((prev) => !prev)}
//                >
//                   <AiFillSetting className="text-textColor" size={22} />
//                </motion.div>
//             )}
//             {isModalOpen && (
//                <motion.div
//                   initial={{ opacity: 0, scale: 0.5 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.5 }}
//                   className="absolute z-10 top-6 right-4 p-2 bg-white rounded-md shadow-md border"
//                >
//                   <p className="text-textColor font-semibold text-sm">
//                      Do you want to grant the user
//                      <span className="text-orange-600">
//                         {data?.role === "admin" ? " MEMBER " : " ADMIN "}
//                      </span>
//                      Privilege ?
//                   </p>
//                   <motion.button
//                      whileTap={{ scale: 0.75 }}
//                      onClick={() => setIsModalOpen((prev) => !prev)}
//                      className="text-sm font-semibold px-2 py-1 m-1 bg-red-200 text-red-600 rounded-md shadow-md "
//                   >
//                      Cancel
//                   </motion.button>
//                   <motion.button
//                      onClick={() =>
//                         updateUserRole(data?._id, data?.role === "admin" ? "member" : "admin")
//                      }
//                      whileTap={{ scale: 0.75 }}
//                      className="text-sm font-semibold px-2 py-1 m-1 bg-orange-200 text-orange-600 rounded-md shadow-md "
//                   >
//                      Yes
//                   </motion.button>
//                </motion.div>
//             )}
//          </div>
//       </motion.div>
//    );
// };

export default DashboardUsers;
