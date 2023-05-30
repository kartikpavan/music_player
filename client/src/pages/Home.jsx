import React, { useEffect } from "react";
import { Navbar } from "../components";
import AdminDashboard from "./admin/AdminDashboard";
import { useNavigate } from "react-router-dom";
const Home = () => {
   const navigate = useNavigate();
   // useEffect(() => {
   //    navigate("/dashboard/songs", { replace: true });
   // }, []);
   return (
      <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
         <Navbar />
      </div>
   );
};

export default Home;
