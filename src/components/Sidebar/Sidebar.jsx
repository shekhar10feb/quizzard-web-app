import React, { useState, useContext } from "react";
import { BoxContext } from "../BoxContext/BoxContext";
import { FaPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaSave } from "react-icons/fa";

const Sidebar = () => {
  const [draggedItemId, setDraggedItemId] = useState(null);
  const {
    addBox,
    boxes,
    setBoxes,
    add_zIndex,
    id_for_number_of_questions,
    activeDiv,
  } = useContext(BoxContext);

  const handleDragStart = (id) => {
    setDraggedItemId(id); // Save the ID of the dragged item
  };

  const handleDrop = (targetId) => {
    const draggedIndex = boxes.findIndex((item) => item.id === draggedItemId);
    const targetIndex = boxes.findIndex((item) => item.id === targetId);

    // Swap items
    const updatedItems = [...boxes];
    const [draggedItem] = updatedItems.splice(draggedIndex, 1);
    updatedItems.splice(targetIndex, 0, draggedItem);

    setBoxes(updatedItems);
    setDraggedItemId(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow drop
  };

  return (
    <div className="lg:w-2/12 w-full lg:h-full h-auto flex justify-start items-stretch lg:flex-col flex-row  relative border-t">
      <h3 className="w-11/12 lg:flex hidden justify-start my-[0.1rem] mx-2 text-blue-600">
        {id_for_number_of_questions} Questions
      </h3>
      <div className="w-full flex justify-start items-start lg:flex-col flex-row">
        {boxes.map((box) => {
          return (
            <div
              key={box.id}
              className="lg:w-11/12 w-full flex justify-start items-start lg:my-1 lg:mx-0 mx-2"
              draggable
              onDragStart={() => handleDragStart(box.id)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(box.id)}
              onClick={() => add_zIndex(box.id)}
            >
              <div className="w-1/12 h-full flex justify-center items-start">
                <p className="text-sm text-gray-500">{box.id}</p>
              </div>
              <div
                className="lg:w-11/12 w-full lg:h-20 h-12 flex justify-center items-center flex-col text-[0.6rem] border-2 border-gray-400 hover:border-2 hover:border-red-600 hover:cursor-pointer hover:shadow-md rounded-md"
                style={{
                  background: activeDiv === box.id ? "#d3d3d3" : "#f0f0f0",
                }}
              >
                <div
                  className="w-full h-full flex justify-center items-center hover:shadow-md rounded-md sidebar_background_image"
                  style={{
                    backgroundImage: `url(${box.image_for_question})`
                      ? `url(${box.image_for_question})`
                      : "",
                  }}
                >
                  <p>{box.question}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="lg:w-11/12 w-auto flex justify-end items-center">
        <button
          className="lg:w-11/12 w-auto lg:h-20 h-auto flex justify-center items-center lg:text-[#3872f0] text-white lg:bg-white bg-purple-700 my-1 lg:text-xl text-2xl p-2 lg:border-2 lg:border-gray-400 lg:hover:border-2 lg:hover:border-blue-600 hover:cursor-pointer hover:shadow-md lg:rounded-md rounded-sm"
          disabled={id_for_number_of_questions === 5} // Disable when count is 5
          onClick={addBox}
        >
          <FaPlus />
        </button>
      </div>
      <div className="w-full lg:flex hidden justify-end items-center flex-col absolute bottom-0 py-2">
        <button className="w-11/12 flex justify-center items-center rounded bg-white text-black p-2 mb-1 border border-black cursor-pointer">
          <span className="mr-2">
            <FaSearch />
          </span>{" "}
          search library
        </button>
        <button className="w-11/12 flex justify-center items-center rounded bg-purple-800 text-white p-2 border border-purple-800 cursor-pointer">
          <span className="mr-2">
            <FaSave />
          </span>{" "}
          Add Question
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
