import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoMdPlay } from "react-icons/io";
import { FaSave } from "react-icons/fa";

const Header = () => {
  return (
    <div className="w-full h-auto flex justify-center items-center p-1">
      <div className="w-1/3 flex justify-start items-center lg:text-lg text-base lg:font-extrabold font-bold italic">
        <span className="border border-gray-700 p-[0.1rem] mr-2 rounded-md">
          <IoIosArrowBack />
        </span>
        <h1 className="w-auto flex justify-start items-center text-gray-500">
          QUIZZARD
        </h1>
      </div>
      <div className="w-2/3 flex justify-end items-center lg:text-base sm:text-sm text-xs">
        <button className="w-15 flex justify-center items-center bg-gray-300 p-2 mr-2 cursor-pointer">
          <span className="mr-2">
            <IoMdPlay />
          </span>
          Preview
        </button>
        <button className="w-15 flex justify-center items-center mr-2 bg-purple-800 text-white p-2 cursor-pointer">
          <span className="mr-2">
            <FaSave />
          </span>
          Publish
        </button>
      </div>
    </div>
  );
};
export default Header;
