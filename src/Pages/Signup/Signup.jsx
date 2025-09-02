import React, { use, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../../Athentication/firebase';
  import { Link, useLocation, useNavigate } from "react-router";
import AuthProvider from '../../Context/AuthProvider';
import { AuthContext } from '../../Context/Authcontext';
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
    const [firebaseError, setFirebaseError] = useState("");
    const {setUser} = use(AuthContext)
    const navigate = useNavigate()
    const provider = new GoogleAuthProvider()
    const location = useLocation()

// Google Sign In
  const handleGoogleLogin =()=>{
        setFirebaseError("");

       signInWithPopup(auth,provider)
       .then(async(result)=>{
        // console.log(result)
        setUser(result)
        navigate(location?.state || "/")

       })
  }


    return (
        <div className='flex justify-center items-center min-h-screen    px-5'>

        
         <div className="w-fit text-center  flex-col  space-y-3 border-2 p-5 rounded-2xl  lg:-mt-30">
      {/* Info text */}
      <h1 className='text-3xl font-medium'>Google Sign in</h1>
      <p className="text-blue-600 text-sm text-center">
        Sign in with your Instagram account to connect faster <br />
        and personalize your experience.
      </p>

      {/* Instagram Sign-In Button */}
      {/* Google */}
<button onClick={handleGoogleLogin} className="btn bg-white text-black text-lg border-[#f1a0a0] shadow-2xl shadow-amber-100 my-6 hover:bg-base-200">
  <svg aria-label="Google logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Sign In with Google
</button>
    </div>
    </div>
    );
}

export default Signup;