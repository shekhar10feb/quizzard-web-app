import React, { useState, useRef, useContext, useCallback } from "react";
import TiptapEditorForOption from "../TiptapEditorForOption/TiptapEditorForOption";
import { BoxContext } from "../BoxContext/BoxContext";
import parse from "html-react-parser";

const QuestionOptions = ({
  item,
  handleCheckboxChange,
  handleDeleteOption,
}) => {
  const [option_for_question, setOption_for_question] = useState("");
  const { colors_for_option, inputRef } = useContext(BoxContext);

  const handleEditorContentSaveForOption = (html) => {
    const con = parse(html);
    setOption_for_question((item.text = con.props.children));
  };

  return (
    <div
      className="w-full lg:h-full h-40 flex justify-start items-center flex-col p-1 border-none rounded-lg border border-red-700"
      style={{ backgroundColor: `${colors_for_option[item.id]}` }}
      ref={(el) => (inputRef.current[`${item.id}`] = el)}
    >
      <div className="w-full h-auto flex justify-end items-center border-none">
        <div className="flex justify-center items-center">
          {/* <!-- Circular Checkbox --> */}
          <label className="relative flex justify-center items-center space-x-2">
            <input
              type="checkbox"
              id={`checkbox-${item.id}`}
              checked={item.selected}
              className="peer w-6 h-6 bg-black rounded-full cursor-pointer appearance-none border-2 border-gray-500 checked:bg-green-500 checked:border-green-500 focus:ring-2 focus:ring-green-300"
              onChange={() => handleCheckboxChange(item.id)}
            />
            {/* <!-- Tick Icon --> */}
            <svg
              className="absolute left-[-0.2rem] hidden peer-checked:block w-4 h-4 text-white font-bold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </label>
        </div>
      </div>
      <TiptapEditorForOption
        onEditorContentSave={handleEditorContentSaveForOption}
        handleDeleteOption={handleDeleteOption}
        optionId={item.id}
      />
    </div>
  );
};

export default QuestionOptions;
