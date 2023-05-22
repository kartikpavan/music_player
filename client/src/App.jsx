import React, {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import {firebaseAuth} from "../config/firebase.config";
import {Home, Login, Notfound} from "./pages";

const App = () => {
   const navigate = useNavigate();
   //if auth is false,navigate user to LOGIN screen
   const [authStatus, setAuthStatus] = useState(false || window.localStorage.getItem("auth") === "true");

   // Firebase Auth Observer
   useEffect(() => {
      firebaseAuth.onAuthStateChanged((userCred) => {
         if (userCred) {
            // if user exist then send the token id to backend for verification
            userCred.getIdToken().then(token => console.log(token))
         } else {
            setAuthStatus(false)
            window.localStorage.setItem("auth", "false");
            navigate('/login')
         }
      })
   }, []);

   // checking if local storage auth state is true
   useEffect(() => {
      if (window.localStorage.getItem("auth") === "true") {
         navigate("/", {replace: true});
      }
   }, []);

   return (
       <div className="w-screen h-screen flex justify-center items-center">
          <Routes>
             <Route path="/" element={<Home/>}/>
             <Route path="/login" element={<Login setAuthStatus={setAuthStatus}/>}/>
             <Route path="*" element={<Notfound/>}/>
          </Routes>
       </div>
   );
};

export default App;
