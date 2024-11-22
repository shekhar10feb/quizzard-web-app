import React from "react";

const QuestionTypes = ({ selectionMode, handleModeChange }) => {
  return (
    <div className="w-full h-auto lg:flex hidden justify-between items-center flex-row">
      <div>
        <select
          id="selectionMode"
          value={selectionMode}
          className="bg-white p-2 text-sm text-gray-400 border border-gray-500 rounded"
          onChange={handleModeChange}
        >
          <option value="single">Single Select</option>
          <option value="multi">Multi Select</option>
          <option value="Fill-in-the-blanks">Fill in the blanks</option>
          <option value="Poll">Poll</option>
          <option value="True-or-False">True/False</option>
          <option value="Guess Word">Guess Word</option>
        </select>
      </div>
      <div>
        <select
          name="select"
          id="select"
          className="bg-white p-2 text-sm text-gray-400 border border-gray-500 rounded mx-1"
        >
          <option value="">Select points</option>
          <option value="Single Select">Single Select</option>
          <option value="Multi Select">Multi Select</option>
          <option value="Fill in the blanks">Fill in the blanks</option>
          <option value="Poll">Poll</option>
          <option value="True/False">True/False</option>
          <option value="Guess Word">Guess Word</option>
        </select>
        <select
          name="select"
          id="select"
          className="bg-white p-2 text-sm text-gray-400 border border-gray-500 rounded mx-1"
        >
          <option value="">Select timing</option>
          <option value="Single Select">Single Select</option>
          <option value="Multi Select">Multi Select</option>
          <option value="Fill in the blanks">Fill in the blanks</option>
          <option value="Poll">Poll</option>
          <option value="True/False">True/False</option>
          <option value="Guess Word">Guess Word</option>
        </select>
        <select
          name="select"
          id="select"
          className="bg-white p-2 text-sm text-gray-400 border border-gray-500 rounded mx-1"
        >
          <option value="">Select easy/moderate/hard</option>
          <option value="Single Select">Single Select</option>
          <option value="Multi Select">Multi Select</option>
          <option value="Fill in the blanks">Fill in the blanks</option>
          <option value="Poll">Poll</option>
          <option value="True/False">True/False</option>
          <option value="Guess Word">Guess Word</option>
        </select>
      </div>
    </div>
  );
};

export default QuestionTypes;
