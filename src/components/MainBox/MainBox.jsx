import React, { useState, useContext, useCallback } from "react";
import AddIcon from "@mui/icons-material/Add";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { BoxContext } from "../BoxContext/BoxContext";
import Tiptap from "../TiptapEditor/Tiptap";
import AddInfo from "../AddInfo/AddInfo";
import QuestionTypes from "../QuestionTypes/QuestionTypes";
import QuestionOptions from "../QuestionOptions/QuestionOptions";
import { MdOutlineClose } from "react-icons/md";
import parse from "html-react-parser";
import image1 from "../../assets/image1.png";

const MainBox = ({ box }) => {
  const {
    boxes,
    colors,
    showsettitlebox,
    handleQuizTitle,
    closeUntitledSettings,
    setQuestion,
  } = useContext(BoxContext);

  const [mode, setMode] = useState("single"); // "single" or "multi"
  const [items, setItems] = useState(box.options);
  const [counterForOption, setCounterForOption] = useState(0);

  const handleEditorContentSave = (html) => {
    const con = parse(html);
    setQuestion((box.question = con.props.children));
  };

  const addOption = useCallback(() => {
    const newOption = {
      id: counterForOption,
      text: "",
      selected: false,
    };
    setItems((prev) => [...prev, newOption]);
    setCounterForOption(counterForOption + 1);
    box.options = items;
  }, [setItems, setCounterForOption, counterForOption]);

  const handleModeChange = (e) => {
    setMode(e.target.value);
    setCounterForOption(0);
    // Reset selections when mode changes
    setItems([]);
    setQuestion("");
    box.image_for_question = "";
  };

  const handleCheckboxChange = (id) => {
    if (mode === "single") {
      const updatedItems = items.map((item) => ({
        ...item,
        selected: item.id === id, // Only the selected item is true
      }));
      setItems((box.options = updatedItems));
    } else if (mode === "multi") {
      const updatedItems = items.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      );
      setItems((box.options = updatedItems));
    }
  };

  const handleDeleteOption = useCallback(
    (id) => {
      const updatedItems = items.filter((item) => item.id !== id);
      setItems((box.options = updatedItems));
    },
    [box, setItems, items]
  );

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full h-full flex lg:justify-start items-center flex-col p-1">
        <div className="w-full h-full flex justify-start items-center lg:flex-row flex-col overflow-hidden">
          <div className="w-full h-full flex justify-center items-center flex-col">
            <div className="w-full h-auto flex justify-between items-center flex-col bg-white">
              <div className="w-full h-auto flex justify-between items-center flex-row">
                <div className="w-1/3 h-full flex justify-start items-center flex-row">
                  <h1 className="lg:text-base sm:text-sm text-xs">
                    {box.title || "Untitled"}
                  </h1>
                  <div
                    className="w-auto h-full flex justify-center items-center p-1 mx-1 rounded-sm cursor-pointer"
                    onClick={handleQuizTitle}
                  >
                    <SettingsIcon style={{ fontSize: "medium" }} />
                  </div>

                  <div
                    className="w-full h-full hidden justify-center items-center flex-col fixed left-0 bottom-0 bg-[#202122e0] z-50"
                    style={{ display: showsettitlebox }}
                  >
                    <div className="lg:w-6/12 md:8/12 w-11/12 flex justify-center items-center flex-col sm:p-2 p-1 relative rounded-md bg-white">
                      <div
                        className="w-full h-auto flex justify-end px-2 text-black absolute right-1 top-2 cursor-pointer"
                        onClick={closeUntitledSettings}
                      >
                        <MdOutlineClose />
                      </div>
                      <div className="w-full flex justify-start items-center my-2">
                        <img
                          src={image1}
                          alt=""
                          className="lg:w-10 w-7 flex justify-center items-center rounded-full object-cover aspect-square mr-2"
                        />
                        <div>
                          <h2 className="font-bold lg:text-lg md:text-base text-sm">
                            Quiz Setting
                          </h2>
                          <p className="font-normal md:text-sm text-xs">
                            Review quiz settings and you are good to go.
                          </p>
                        </div>
                      </div>

                      {/* Add Information */}
                      <AddInfo box={box} />
                    </div>
                  </div>
                </div>
                <div className="w-auto h-full flex justify-center items-center flex-row">
                  <button className="p-2 border border-gray-400 md:text-sm text-xs  text-gray-500 md:mx-4 mx-2">
                    Add a tag
                  </button>
                  <button className="lg:flex hidden bg-gray-200 p-2 border border-black text-sm text-black">
                    Add explanation
                  </button>
                  <div className="w-auto h-full lg:hidden flex justify-center items-center bg-gray-300 p-1 mx-1 rounded-sm">
                    <LightbulbOutlinedIcon />
                  </div>

                  <div className="w-auto h-full lg:hidden flex justify-center items-center bg-gray-300 p-1 mx-1 rounded-sm">
                    <MoreVertOutlinedIcon />
                  </div>
                </div>
              </div>
              {/* Question Types  */}
              <QuestionTypes
                selectionMode={mode}
                handleModeChange={handleModeChange}
              />
            </div>

            {/* Text Editors  */}
            <div
              className="lg:w-10/12 w-full h-full flex justify-center items-center flex-col text-sm p-2 mt-1 rounded-md border-none"
              style={{ backgroundColor: `${colors[box.id - 1]}` }}
            >
              {/* Question Div */}
              <div className="w-full h-2/6 flex justify-between lg:items-center items-start flex-row">
                {box.image_for_question ? (
                  <div className="w-full lg:h-full flex justify-between items-center flex-row">
                    <img
                      src={box.image_for_question ? box.image_for_question : ""}
                      alt=""
                      className="w-auto h-full md:flex hidden rounded-lg border-none mr-2"
                    />
                    <div className="w-full h-full border border-white rounded-lg">
                      <Tiptap
                        onEditorContentSave={handleEditorContentSave}
                        box={box}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full border border-white rounded-lg">
                    <Tiptap
                      onEditorContentSave={handleEditorContentSave}
                      box={box}
                    />
                  </div>
                )}
              </div>

              {/* Answer Div */}
              <div className="w-full h-4/6 flex justify-center items-center flex-row mt-2">
                <div className="w-full lg:h-full h-full flex justify-start items-center lg:flex-row flex-col lg:space-y-0 space-y-1">
                  <div className="w-full lg:h-full h-96 lg:flex lg:justify-evenly lg:justice-start lg:items-start lg:flex-row lg:overflow-hidden overflow-y-auto lg:scroll-none scroll-smooth lg:space-y-0 lg:space-x-1 space-y-1">
                    {items.map((item) => {
                      return (
                        <div key={item.id} className="w-full lg:h-full h-auto">
                          <QuestionOptions
                            item={item}
                            box={box}
                            handleCheckboxChange={handleCheckboxChange}
                            boxes={boxes}
                            handleDeleteOption={handleDeleteOption}
                          />
                        </div>
                      );
                    })}
                  </div>
                  {/* Button Div */}
                  <div className="lg:w-auto w-full h-auto flex justify-center items-center">
                    <button
                      className="w-auto"
                      onClick={addOption}
                      disabled={counterForOption === 5}
                    >
                      <AddIcon
                        style={{
                          color: "#f700ff",
                          fontSize: "2rem",
                          fontWeight: "bolder",
                        }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBox;
