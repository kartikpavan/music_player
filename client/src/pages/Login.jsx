import { FcGoogle } from "react-icons/fc";
import bgVideo from "../assets/bgVideo2.mp4";
import { useNavigate } from "react-router-dom";
// Firebase imports
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "../config/firebase.config";
// API Call
import { validateUser } from "../api";
// Context Provider
import { useGlobalContext } from "../context/AppContext";
import { actionType } from "../reducers/reducer";

const Login = ({ setAuthStatus }) => {
   const { state, dispatch } = useGlobalContext();

   const navigate = useNavigate();
   const googleProvider = new GoogleAuthProvider();
   const loginWithGoogle = async () => {
      await signInWithPopup(firebaseAuth, googleProvider).then((userCred) => {
         if (userCred) {
            setAuthStatus(true);
            window.localStorage.setItem("auth", "true");
            // if the user is logged in, redirect to home page
            firebaseAuth.onAuthStateChanged((userCred) => {
               if (userCred) {
                  // userCred.getIdToken().then(token=>validateUser(token).then(data=>dispatch({type:actionType.SET_USER,user:data})))
                  navigate("/", { replace: true });
               } else {
                  // dispatch({
                  //    type:actionType.SET_USER,
                  //    user:null
                  // })
                  setAuthStatus(false);
                  navigate("/login");
               }
            });
         }
      });
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
            <div>
               <div
                  onClick={loginWithGoogle}
                  className="shadow-lg rounded-md px-8 py-4 text-white hover:text-black bg-lightOverlay flex items-center gap-3 backdrop-blur-md hover:bg-card duration-200 transition-all cursor-pointer"
               >
                  <FcGoogle size={30} />
                  <p>Sign in with Google</p>
               </div>
            </div>
         </div>
      </main>
   );
};

export default Login;
