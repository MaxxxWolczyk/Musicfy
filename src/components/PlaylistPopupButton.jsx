import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowModal } from "../redux/features/DesignSlice";
import { setSelectedSong } from "../redux/features/PlayerSlice";

import { BiDotsVertical } from "react-icons/bi";
import { createPortal } from "react-dom";
import Modal from "./Modal/Modal";

const PlaylistPopupButton = ({ width, heigth, songObj }) => {
  const { showModal } = useSelector((state) => state.design);
  const dispatch = useDispatch();

  return (
    <div className="">
      <BiDotsVertical
        className={` w-${width} h-${heigth} text_primary hover:text-white cursor-pointer transition-colors relative`}
        onClick={() => {
          dispatch(setShowModal(!showModal));
          dispatch(setSelectedSong(songObj));
        }}
      />
    </div>
  );
};

export default PlaylistPopupButton;
