import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { firebaseAuth } from "../config/firebase.config";
import { Home, Login, Notfound } from "./pages";
// Framer Motion
import { AnimatePresence } from "framer-motion";
import { validateUser } from "./api";

const App = () => {
   const navigate = useNavigate();
   //if auth is false,navigate user to LOGIN screen
   const [authStatus, setAuthStatus] = useState(
      false || window.localStorage.getItem("auth") === "true"
   );

   // Firebase Auth Observer
   useEffect(() => {
      firebaseAuth.onAuthStateChanged(async (userCred) => {
         if (userCred) {
            // if user exist then send the token id to backend for verification
            const token = await userCred.getIdToken();
            const data = await validateUser(token);
            console.log(data);
         } else {
            setAuthStatus(false);
            window.localStorage.setItem("auth", "false");
            navigate("/login");
         }
      });
   }, []);

   // checking if local storage auth state is true
   useEffect(() => {
      if (window.localStorage.getItem("auth") === "true") {
         navigate("/", { replace: true });
      }
   }, []);

   return (
      <AnimatePresence mode="wait">
         <div className="h-auto min-w-[680px] bg-primary flex justify-center items-center">
            <Routes>
               <Route path="/*" element={<Home />} />
               <Route path="/login" element={<Login setAuthStatus={setAuthStatus} />} />
            </Routes>
         </div>
      </AnimatePresence>
   );
};

export default App;
