import React, { useState, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { FaBold } from "react-icons/fa";
import { GoItalic } from "react-icons/go";
import { FaStrikethrough } from "react-icons/fa6";
import { FaCode } from "react-icons/fa6";
import { RiUnderline } from "react-icons/ri";
import { MdOutlineFormatColorText } from "react-icons/md";
import { LuSubscript } from "react-icons/lu";
import { LuSuperscript } from "react-icons/lu";
import { MdOutlineDeleteOutline } from "react-icons/md";

const extensions = [
  StarterKit,
  Underline,
  Placeholder.configure({
    // Use a placeholder:
    placeholder: "Write question here …",
  }),
  TextStyle,
  Color.configure({ types: ["textStyle"] }), // Enables textStyle for color support
  Subscript,
  Superscript,
  Image,
];

const content = ``;

const TiptapEditorForOption = ({
  onEditorContentSave,
  handleDeleteOption,
  optionId,
}) => {
  const [color, setColor] = useState("#ffffff"); // State to track selected color
  const colorInputRef = useRef(null); // Create a ref to the input element
  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onEditorContentSave(html);
    },
  });

  if (!editor) {
    return null;
  }

  // Function to apply color to selected text
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

  return (
    <div className="w-full h-full flex justify-center items-center flex-col border-none">
      <div className="w-full h-1/6 flex justify-start items-center flex-wrap text-xs p-1 gap-2 text-white border-none bg-transparent">
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
        <button onClick={() => handleDeleteOption(optionId)}>
          <MdOutlineDeleteOutline />
        </button>
      </div>
      <div className="w-full h-5/6 flex border-none">
        <EditorContent
          editor={editor}
          className="w-full h-full outline-none overflow-auto"
        />
      </div>
    </div>
  );
};

export default TiptapEditorForOption;
