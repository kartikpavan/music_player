import React from "react";
import { FcGoogle } from "react-icons/fc";
import bgVideo from "../assets/bgVideo2.mp4";

// Firebase imports
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { firebaseAuth } from "../../config/firebase.config";

const Login = () => {
  // Google login
  const provider = new GoogleAuthProvider();
  const loginWithGoogle = async () => {
    const result = await signInWithRedirect(firebaseAuth, provider);
    if (result) {
      setAuth(true);
      window.localStorage.setItem("auth", "true");
    }
  };

  return (
    <main className="relative w-screen h-screen">
      {/* background Video */}
      <video
        src={bgVideo}
        autoPlay
        loop
        muted
        className="h-full w-full object-none lg:object-fill"
      />
      <div className="absolute inset-0 flex items-center justify-center p-4 ">
        <div onClick={loginWithGoogle}>
          <div className="shadow-lg rounded-md px-8 py-4 text-white hover:text-black bg-lightOverlay flex items-center gap-3 backdrop-blur-md hover:bg-card duration-200 transition-all cursor-pointer">
            <FcGoogle size={30} />
            <p>Sign in with Google</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
