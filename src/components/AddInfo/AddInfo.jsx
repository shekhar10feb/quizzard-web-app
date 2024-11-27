import React, { useRef, useState, useContext } from "react";
import { BoxContext } from "../BoxContext/BoxContext";
import { MdOutlineAddCircleOutline } from "react-icons/md";

const AddInfo = ({ box }) => {
  const [showImage, setShowImage] = useState("flex");

  const fileInputRef = useRef(null); // Create a ref for the checkbox file
  const {
    title,
    setTitle,
    name,
    setName,
    subject,
    setSubject,
    grade,
    setGrade,
    language,
    setLanguage,
    visibility,
    setVisibility,
    selectedImage,
    setSelectedImage,
    closeUntitledSettings,
  } = useContext(BoxContext);

  const handleTitleChange = (e) => {
    setTitle((box.title = e.target.value));
  };

  const handleNameChange = (e) => {
    setName((box.name = e.target.value));
  };

  const handleSubjectSelectionChange = (e) => {
    setSubject((box.subject = e.target.value));
  };

  const handleGradeSelectionChange = (e) => {
    setGrade((box.grade = e.target.value));
  };

  const handleLanguageSelectionChange = (e) => {
    setLanguage((box.language = e.target.value));
  };

  const handleVisibilitySelectionChange = (e) => {
    setVisibility((box.visibility = e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeUntitledSettings();
  };

  const handleImageChange = (e) => {
    setShowImage("none");
    const file = e.target.files[0]; // Access the first file selected by the user
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader(); // FileReader to convert image to base64 for preview
      reader.onloadend = () => {
        setSelectedImage((box.image = reader.result)); // Store the base64 image URL in state
      };
      reader.readAsDataURL(file); // Convert image to data URL
    } else {
      alert("Please select a valid image file");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click(); // Programmatically trigger a click on the file input
  };

  return (
    <div className="w-full h-5/6 flex justify-center items-start flex-col">
      <form
        className="w-full h-full flex justify-center items-start flex-col"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex justify-center items-center flex-col">
          <div className="w-full flex justify-center items-center sm:flex-row flex-col-reverse md:text-base text-sm sm:mt-0 mt-2">
            <div className="md:w-1/2 w-full h-[270px] flex flex-col space-y-3">
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter your title"
                className="w-full p-1 rounded border border-black focus:outline-none"
              />
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter your name"
                className="w-full p-1 rounded border border-black focus:outline-none"
              />
              <select
                name="subject"
                id="subject"
                value={subject}
                onChange={handleSubjectSelectionChange}
                className="w-full p-1 rounded border border-black"
              >
                <option value="Subject">Subject</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Computer">Computer</option>
                <option value="Science">Science</option>
                <option value="Physics">Physics</option>
                <option value="History">History</option>
              </select>
              <select
                name="grade"
                id="grade"
                value={grade}
                onChange={handleGradeSelectionChange}
                className="w-full p-1 rounded border border-black"
              >
                <option value="Grade">Grade</option>
                <option value="Grade 6">Grade 6</option>
                <option value="Grade 7">Grade 7</option>
                <option value="Grade 8">Grade 8</option>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
              </select>
              <select
                name="language"
                id="language"
                value={language}
                onChange={handleLanguageSelectionChange}
                className="w-full p-1 rounded border border-black"
              >
                <option value="Language">Language</option>
                <option value="Hindi">Hindi</option>
                <option value="English">English</option>
              </select>
              <select
                name="visibility"
                id="visibility"
                value={visibility}
                onChange={handleVisibilitySelectionChange}
                className="w-full p-1 rounded border border-black"
              >
                <option value="Visibility">Visibility</option>
                <option value="Physically Visible">Physically Visible</option>
                <option value="Restricted">Restricted</option>
              </select>
            </div>
            <div className="md:w-1/2 w-full sm:h-[270px] h-[150px] flex justify-center items-center sm:pl-1 sm:my-0 my-2">
              <div className="w-full h-full flex justify-center items-center rounded-md">
                <div
                  className="w-full h-full justify-center items-center flex-col bg-black text-white cursor-pointer"
                  style={{ display: showImage }}
                  onClick={triggerFileInput}
                >
                  <span className="lg:text-lg md:text-base text-sm font-bold">
                    <MdOutlineAddCircleOutline />
                  </span>
                  <p>Add Image</p>
                </div>
                <input
                  type="file"
                  accept="image/*" // Only allow image file types
                  ref={fileInputRef} // Reference the input with useRef
                  className="hidden"
                  onChange={handleImageChange} // Handle file selection
                />
                {selectedImage && (
                  <div className="w-full h-full flex justify-center items-center overflow-hidden">
                    <img
                      src={selectedImage} // Display selected image
                      alt="Selected"
                      className="w-full h-full sm:object-cover object-fill"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end items-center mt-2">
          <button
            type="submit"
            className="w-auto bg-green-600 text-white text-sm py-1 px-2 rounded-sm"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddInfo;
