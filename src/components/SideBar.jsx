import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { HiMagnifyingGlass } from "react-icons/hi2";
import Library from "./Library";

const SideBar = () => {
  return (
    <div className="w-full flex flex-col h-full gap-2">
      <div className="flex flex-col gap-8 bg_primary px-6 py-8 text_primary rounded-lg">
        <NavLink
          to="/"
          end
          className="w-full flex items-center gap-4 hover:text-white"
          style={({ isActive }) => {
            return {
              color: isActive && "white",
            };
          }}
        >
          <AiFillHome className="w-8 h-8" />
          <p className="text-xl font-semibold">Home</p>
        </NavLink>
        <NavLink
          to="/search"
          className="w-full flex items-center gap-4 hover:text-white"
          style={({ isActive }) => {
            return {
              color: isActive && "white",
            };
          }}
        >
          <HiMagnifyingGlass className="w-8 h-8" />
          <p className="text-xl font-semibold">Szukaj</p>
        </NavLink>
      </div>
      <div className="bg_primary flex-grow rounded-lg px-6 py-8">
        <Library />
      </div>
    </div>
  );
};

export default SideBar;
