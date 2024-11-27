import React, {
  createContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";

export const BoxContext = createContext();

export const BoxProvider = ({ children }) => {
  // Array to store all the boxes data
  const [boxes, setBoxes] = useState([]);
  const [showsettitlebox, setShowTitlebox] = useState("none");
  const [id_for_number_of_questions, setId_for_number_of_questions] =
    useState("0");
  const [activeDiv, setActiveDiv] = useState("flex"); // Tracks the currently visible div in the main area
  const colors = ["#b89d07", "blue", "purple", "green", "#9b0614"];
  const colors_for_option = [
    "#ddbd0a",
    "#2929ec",
    "#b310b3",
    "#19ae19",
    "#d51426",
  ];
  const [counter, setCounter] = useState(1);
  const [color_of_checkbox, setColor_of_checkbox] = useState("gray");
  const [question, setQuestion] = useState(""); // Local state for the question input
  const [title, setTitle] = useState("Untitled");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [language, setLanguage] = useState();
  const [visibility, setVisibility] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // To store the image preview

  // TiptaoButtons.jsx
  const [resultedImage, setResultedImage] = useState(null); // State for ImageCropper.jsx

  // Function of chnaging color of checkbox
  const handle_setColor_of_checkbox = () => {
    if (color_of_checkbox === "gray") {
      setColor_of_checkbox("green");
    } else {
      setColor_of_checkbox("gray");
    }
  };

  // An object to store multiple refs
  const inputRef = useRef({});

  // Function to add a new box
  const addBox = useCallback(() => {
    const newBox = {
      id: counter,
      title: "",
      name: "",
      image: "",
      subject: "",
      grade: "",
      language: "",
      visibility: "",
      image_for_question: "",
      question: "",
      // Each box will have an array of options (each option has text and checkbox state)
      options: [],
    };
    setBoxes((prevBoxes) => [...prevBoxes, newBox]);
    setCounter(counter + 1);
    setActiveDiv(newBox.id); // Make the newly created div active
  }, [
    counter,
    title,
    name,
    selectedImage,
    subject,
    grade,
    language,
    visibility,
    resultedImage,
    setBoxes,
    setCounter,
    setActiveDiv,
  ]);

  // Total number of questions in the sidebar
  useEffect(() => {
    if (boxes.length < 6) {
      setId_for_number_of_questions(boxes.length);
    }
  }, [boxes, setId_for_number_of_questions]);

  // Function to update a box (e.g., adding an option or updating the question)
  const updateBox = useCallback((id, updatedBox) => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) => (box.id === id ? { ...box, ...updatedBox } : box))
    );
  }, []);

  const add_zIndex = (id) => {
    setActiveDiv(id); // Set the clicked div as active
  };

  const activeFunction = (id) => {
    setActiveDiv(id); // Set the clicked div as active
  };

  const handleQuizTitle = () => {
    setShowTitlebox("flex");
  };

  const closeUntitledSettings = () => {
    setShowTitlebox("none");
  };

  return (
    <BoxContext.Provider
      value={{
        boxes,
        setBoxes,
        colors,
        colors_for_option,
        add_zIndex,
        activeFunction,
        addBox,
        updateBox,
        inputRef,
        showsettitlebox,
        setShowTitlebox,
        handleQuizTitle,
        closeUntitledSettings,
        id_for_number_of_questions,
        color_of_checkbox,
        handle_setColor_of_checkbox,
        question,
        setQuestion,
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
        resultedImage,
        setResultedImage,
        activeDiv,
      }}
    >
      {children}
    </BoxContext.Provider>
  );
};
