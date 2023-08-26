import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowModal } from "../redux/features/DesignSlice";

import { BiDotsVertical } from "react-icons/bi";

const PlaylistPopupButton = ({ width, heigth }) => {
  const { showModal } = useSelector((state) => state.design);
  const dispatch = useDispatch();

  console.log(showModal);

  return (
    <div>
      <BiDotsVertical
        className={`text-white w-${width} h-${heigth} text_primary hover:text-white cursor-pointer`}
        onClick={() => dispatch(setShowModal(!showModal))}
      />
    </div>
  );
};

export default PlaylistPopupButton;
