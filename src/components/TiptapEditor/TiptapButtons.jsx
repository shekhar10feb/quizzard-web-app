import React, { useState, useRef } from "react";
import { FaBold } from "react-icons/fa";
import { GoItalic } from "react-icons/go";
import { FaStrikethrough } from "react-icons/fa6";
import { FaCode } from "react-icons/fa6";
import { RiUnderline } from "react-icons/ri";
import { MdOutlineFormatColorText } from "react-icons/md";
import { LuSubscript } from "react-icons/lu";
import { LuSuperscript } from "react-icons/lu";
import { RiImageAddLine } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import { RxImage } from "react-icons/rx";
import ImageCropper from "./ImageCropper";

const TiptapButtons = ({ editor, box }) => {
  const [color, setColor] = useState("#ffffff"); // State to track selected color
  const [showImageCropperDiv, setShowImageCropperDiv] = useState(false);
  const [image, setImage] = useState(null);
  const colorInputRef = useRef(null); // Create a ref to the input element
  const insertImageRef = useRef(null);
  const resetButtonRef = useRef(null);

  const setTextColor = (newColor) => {
    if (editor) {
      editor.chain().focus().setColor(newColor).run();
      setColor(newColor); // Update the current color in state
    }
  };

  // Handle button click to trigger color input click
  const handleColorChooseClick = () => {
    colorInputRef.current.click(); // Programmatically click the color input
  };

  const insertButton = () => {
    insertImageRef.current.click();
  };

  const resetButton = () => {
    resetButtonRef.current.click();
  };

  return (
    <div className="w-full flex justify-start items-center flex-wrap text-xs p-1 gap-2 text-white bg-transparent border-none">
      {/* Color Picker Input */}
      <input
        type="color"
        value={color}
        ref={colorInputRef} // Attach ref to the input
        onChange={(e) => setTextColor(e.target.value)}
        className="hidden"
        style={{ marginBottom: "10px" }}
      />
      <button onClick={handleColorChooseClick}>
        <MdOutlineFormatColorText />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <FaBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <GoItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is-active" : ""}
      >
        <RiUnderline />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <FaStrikethrough />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        <FaCode />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        className={editor.isActive("subscript") ? "is-active" : ""}
      >
        <LuSubscript />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        className={editor.isActive("superscript") ? "is-active" : ""}
      >
        <LuSuperscript />
      </button>
      <button onClick={() => setShowImageCropperDiv(!showImageCropperDiv)}>
        <RiImageAddLine />
      </button>
      {showImageCropperDiv && (
        <div className="w-full h-full flex justify-center items-center fixed left-0 top-0 bg-[#000000ce] text-base z-20">
          <div className="lg:w-4/6 w-[95%] h-auto flex justify-center items-center flex-col text-black bg-white lg:p-4 p-2 lg:rounded-md rounded-sm">
            <span
              className="w-full flex justify-end items-center lg:text-base text-sm cursor-pointer"
              onClick={() => setShowImageCropperDiv(!showImageCropperDiv)}
            >
              <IoCloseSharp />
            </span>
            <div className="w-full flex justify-start items-start flex-col mb-3">
              <div className="w-full flex justify-start items-start">
                <div className="w-auto lg:text-3xl md:text-2xl text-xl rounded-full bg-cyan-400 text-white p-2">
                  <RxImage />
                </div>
                <div className="w-auto flex justify-start items-start flex-col pl-2">
                  <h2 className="lg:text-lg md:text-base text-[1rem] font-semibold">
                    Add Image
                  </h2>
                  <p className="w-full text-start md:text-xs sm:text-[0.8rem] text-[0.67rem] text-gray-500">
                    Use Ctrl + V to paste image from your clipboard
                  </p>
                </div>
              </div>
              <ImageCropper
                box={box}
                image={image}
                setImage={setImage}
                insertImageRef={insertImageRef}
                resetButtonRef={resetButtonRef}
              />
            </div>
            <div
              className="w-full flex justify-evenly items-center"
              onClick={() => setShowImageCropperDiv(!showImageCropperDiv)}
            >
              <button
                className="w-5/12 flex justify-center items-center text-white md:text-lg sm:text-base text-sm bg-cyan-400 p-1 rounded-md shadow-md cursor-pointer"
                onClick={insertButton}
              >
                Insert
              </button>
              <button
                className="w-5/12 flex justify-center items-center text-white md:text-lg sm:text-base text-sm bg-cyan-400 p-1 rounded-md shadow-md cursor-pointer"
                onClick={resetButton}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TiptapButtons;
