import React from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase.config.cjs";

function OAuth() {
  const navigate = useNavigate();

  const onFacebookAuth = async () => {
    try {
      const providerFacebook = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, providerFacebook);
      const user = result.user;

      const docRef = doc(db, "users", user.uid);

      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          avatarUrl: user.photoURL,
          favSongs: [],
          friends: [],
          timestamp: serverTimestamp(),
        });
      }

      navigate("/");
    } catch (error) {}
  };
  const onGoogleAuth = async () => {
    try {
      const providerGoogle = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, providerGoogle);
      const user = result.user;

      const docRef = doc(db, "users", user.uid);

      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          avatarUrl: user.photoURL,
          favSongs: [],
          friends: [],
          timestamp: serverTimestamp(),
        });
      }

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-wrap justify-end gap-1">
      <div
        className="py-2 px-4 flex items-center bg-black text_primary hover:text-white gap-2 rounded-xl cursor-pointer"
        onClick={onFacebookAuth}
      >
        <p className="sm:text-lg font-semibold">Log in with</p>
        <FaFacebook className="w-4 h-4 sm:h-8 sm:w-8 hover:text-primary cursor-pointer " />
      </div>
      <div
        className="py-2 px-4 flex items-center bg-black text_primary hover:text-white  gap-2 rounded-xl cursor-pointer"
        onClick={onGoogleAuth}
      >
        <p className="sm:text-lg font-semibold">Log in with</p>
        <FaGoogle className="w-4 h-4 sm:h-8 sm:w-8 hover:text-primary " />
      </div>
    </div>
  );
}

export default OAuth;
