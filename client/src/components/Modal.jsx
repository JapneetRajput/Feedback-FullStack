import React, { useState } from "react";
import crossIcon from "../assets/crossIcon.svg";

const Modal = ({ isOpen, toggleModal, children }) => {
  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-900 opacity-75"></div>{" "}
          {/* Overlay */}
          <div className="bg-white inset-0 sm:w-2/3 w-5/6 h-3/4 sm:h-4/5 relative">
            <div
              className="absolute top-6 right-6 cursor-pointer"
              onClick={toggleModal}
            >
              <img src={crossIcon} alt="close" className="w-4 h-4" />
            </div>
            <div className="flex flex-row sm:h-full">
              <div className="sm:w-3/5 w-full">{children}</div>
              <div className="sm:w-2/5 bg-bluePrimary hidden sm:flex sm:flex-col sm:items-start items-center">
                <p className="text-white mt-24 ml-12 text-3xl font-bold">
                  Feedback
                </p>
                <p className="text-white mt-8 pr-36 ml-12 text-2xl text-start">
                  Add your product and rate other items.............
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
