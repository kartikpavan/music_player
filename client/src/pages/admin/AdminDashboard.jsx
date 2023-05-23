import React from "react";
import { Navbar } from "../../components";

const AdminDashboard = () => {
   return (
      <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
         <Navbar />
         <di className="w-[60%] my-2 bg-blue-500 p-4 flex items-center justify-evenly"></di>
      </div>
   );
};

export default AdminDashboard;
