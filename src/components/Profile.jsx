import React, { useState } from "react";
import { auth } from "../firebase.config.cjs";
import OAuth from "./OAuth";
import { useAuthStatus } from "../hooks/useAuthStatus";

const ProfileComponent = ({ user }) => {
  const [showProfilePanel, setShowProfilePanel] = useState(false);

  const onClick = () => {
    auth.signOut();
    window.location.reload(false);
  };

  return (
    <div className="px-4 relative">
      <div className="flex justify-end">
        <div
          className="flex items-center gap-3 cursor-pointer sm:px-2 rounded-lg transition-all"
          onClick={() => setShowProfilePanel((prevState) => !prevState)}
        >
          <p className="text-lg text_primary hover:text-white font-semibold">
            {user.displayName}
          </p>
          <img
            src={user.photoURL}
            alt="profile picture"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>
      {showProfilePanel && (
        <div className="flex flex-col items-end absolute mt-2 mr-6 z-50 right-0 shadow-xl">
          <div className="flex flex-col  bg-[#282828] text_primary rounded-md overflow-hidden">
            <p className="pl-2 pr-28 py-2  hover:bg-[#424040] text_primary font-semibold hover:text-white cursor-pointer">
              Profile
            </p>
            <p
              className="pl-2 py-2 hover:bg-[#424040] text-red-600 font-semibold hover:text-red-500 cursor-pointer"
              onClick={onClick}
            >
              log out
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

function Profile({ gradientColor }) {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) return <p>loading...</p>;

  return (
    <div className="py-4 pr-2">
      {loggedIn ? <ProfileComponent user={auth.currentUser} /> : <OAuth />}
    </div>
  );
}

export default Profile;
