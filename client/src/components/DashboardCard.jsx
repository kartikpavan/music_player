import React from "react";

const DashboardCard = ({ icon, name, count }) => {
   return (
      <div className="p-2 w-40 gap-2 h-auto rounded-md shadow-md bg-orange-100/30">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
               {icon}
               <p className="text-lg text-textColor font-semibold">{name}</p>
            </div>
            <p className="text-lg text-gray-500 font-bold">{count}</p>
         </div>
      </div>
   );
};

export default DashboardCard;
