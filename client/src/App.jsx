import { useEffect, useState } from "react";
// React Router
import { Route, Routes, useNavigate } from "react-router-dom";
// Firebase
import { firebaseAuth } from "./config/firebase.config";
// Pages
import { Home, Login } from "./pages";
import AdminDashboard from "./pages/admin/AdminDashboard";
// Framer Motion
import { AnimatePresence } from "framer-motion";
// API request
import { validateUser } from "./api";
// context
import { useGlobalContext } from "./context/AppContext";
import { actionType } from "./reducers/reducer";
// Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const App = () => {
   const { state, dispatch } = useGlobalContext();

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
            // Storing user info using Context Provider
            dispatch({
               type: actionType.SET_USER,
               user: data,
            });
         } else {
            setAuthStatus(false);
            window.localStorage.setItem("auth", "false");
            // if there is no user clear the user state from Context Provider
            dispatch({
               type: actionType.SET_USER,
               user: null,
            });
            navigate("/login");
         }
      });
   }, []);

   // checking if local storage auth state is true
   // useEffect(() => {
   //    if (window.localStorage.getItem("auth") === "true") {
   //       navigate("/", { replace: true });
   //    }
   // }, []);

   return (
      <AnimatePresence mode="wait">
         {/* <div className="h-auto min-w-[680px] bg-primary flex justify-center items-center"> */}
         <div className="h-auto w-screen bg-primary flex justify-center items-center">
            <Routes>
               <Route path="/*" element={<Home />} />
               <Route path="/login" element={<Login setAuthStatus={setAuthStatus} />} />
               <Route path="/dashboard/*" element={<AdminDashboard />} />
            </Routes>
            <ToastContainer
               position="top-right"
               autoClose={5000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               theme="light"
            />
         </div>
      </AnimatePresence>
   );
};

export default App;
