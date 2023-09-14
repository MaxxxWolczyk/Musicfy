import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalContent from "./ModalContent";
import { setShowModal } from "../../redux/features/DesignSlice";
import { IoClose } from "react-icons/io5";

const Modal = () => {
  const { showModal } = useSelector((state) => state.design);

  const dispatch = useDispatch();

  return (
    <>
      {showModal && (
        <div
          className={`
        w-screen h-screen flex bg-black/70 flex-col justify-center items-center absolute top-0 z-50`}
        >
          <div className="w-[90%] h-[90%] sm:w-[50%] sm:h-[80%] flex flex-row-reverse relative">
            <div
              className="bg_primary flex items-center justify-center p-2  cursor-pointer group absolute"
              onClick={() => dispatch(setShowModal(!showModal))}
            >
              <IoClose className="text-white w-8 h-8 group-hover:scale-125 transition-transform" />
            </div>
            <ModalContent />
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
