import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { motion } from "framer-motion";

const DropDownMenu = ({ filterData, title }) => {
   const [filterName, setFilterName] = useState(null);
   const [filterMenu, setFilterMenu] = useState(false);

   const updateFilterState = (name) => {
      setFilterMenu(false);
      setFilterName(name);
   };

   return (
      <div className="border border-gray-300 rounded-md px-4 py-1 relative cursor-pointer hover:border-gray-400 ">
         <p
            className="text-base tracking-wide text-textColor flex items-center gap-2"
            onClick={() => setFilterMenu((prev) => !prev)}
         >
            {/* if no filter name is selected then the fallback value will be title(prop)  */}
            {!filterName ? (
               title
            ) : (
               <>{filterName.length > 15 ? `${filterName.slice(0, 15)}...` : filterName}</>
            )}
            <IoChevronDown
               className={`text-base duration-150 transition-all ease-in-out ${
                  filterMenu ? "rotate-180" : "rotate-0"
               }`}
            />
         </p>
         {filterData && filterMenu && (
            <motion.div
               initial={{ opacity: 0, y: -50 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -50 }}
               className="w-48 z-50 backdrop-blur-sm max-h-44 overflow-y-scroll py-2 flex flex-col rounded-md shadow-md absolute top-10 left-0 border"
            >
               {filterData?.map((data) => (
                  <div
                     key={data.name}
                     className="flex items-center gap-2 px-4 py-1 hover:bg-orange-100/50 "
                     onClick={() => updateFilterState(data.name)}
                  >
                     {(title === "Artists" || title === "Albums") && (
                        <img
                           src={data.imageUrl}
                           alt="pic"
                           className="w-8 min-w-[32px] h-8 rounded-full object-cover"
                        />
                     )}
                     <p className="w-full">
                        {data.name.length > 15 ? `${data.name.slice(0, 15)}...` : data.name}
                     </p>
                  </div>
               ))}
            </motion.div>
         )}
      </div>
   );
};

export default DropDownMenu;
