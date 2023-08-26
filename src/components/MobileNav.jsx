import React from "react";
import { AiFillHome } from "react-icons/ai";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { SiBookstack } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const MobileNav = () => {
  const navigate = useNavigate();

  return (
    <div className="block sm:hidden w-full bg-black">
      <ul className="flex w-full justify-evenly text_primary">
        <li>
          <NavLink
            to="/search"
            className="p-4 flex flex-col justify-center items-center hover:text-white"
            style={({ isActive, isPending }) => {
              return {
                color: isActive && "white",
              };
            }}
          >
            <HiMagnifyingGlass className="w-8 h-8" />
            <p>Wyszukaj</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            end
            className="p-4 flex flex-col justify-center items-center hover:text-white"
            style={({ isActive, isPending }) => {
              return {
                color: isActive && "white",
              };
            }}
          >
            <AiFillHome className="w-8 h-8" />
            <p>Home</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/library"
            end
            className="p-4 flex flex-col justify-center items-center hover:text-white"
            style={({ isActive, isPending }) => {
              return {
                color: isActive && "white",
              };
            }}
          >
            <SiBookstack className="w-8 h-8" />
            <p>Biblioteka</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default MobileNav;
