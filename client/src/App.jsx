import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { firebaseAuth } from "../config/firebase.config";
import { Home, Login, Notfound } from "./pages";

const App = () => {
  const navigate = useNavigate();
  //if auth is false,navigate user to LOGIN screen
  const [auth, setAuth] = useState(false || window.localStorage.getItem("auth") === "true");

  // Firebase Auth Observer
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      /*
      -If user is logged in , access the refresh Token and pass it to Backend for verification
      -Redirect User from Login page to HOME screen
      */
      if (user) {
        user.getIdToken().then((token) => {
          console.log(token);
        });
        console.log(user);
      } else {
        window.localStorage.setItem("auth", "false");
        navigate("/login");
      }
    });
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
};

export default App;
