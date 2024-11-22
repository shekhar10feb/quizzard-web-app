import { useEditor, EditorContent } from "@tiptap/react";
import React from "react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Image from "@tiptap/extension-image";
import TiptapButtons from "./TiptapButtons";

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

const Tiptap = ({ onEditorContentSave, box }) => {
  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onEditorContentSave(html);
    },
  });

  return (
    <div className="w-full h-full flex justify-start items-center flex-col">
      <div className="w-full h-1/6 flex justify-start items-center flex-wrap text-xs p-1 gap-2 text-white border-none bg-transparent relative">
        <TiptapButtons editor={editor} box={box} />
      </div>
      <div className="w-full h-5/6 flex">
        <EditorContent
          editor={editor}
          className="w-full h-full outline-none overflow-auto"
        />
      </div>
    </div>
  );
};

export default Tiptap;
