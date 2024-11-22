import React from "react";
import "react-image-crop/dist/ReactCrop.css";
import { BoxProvider } from "./components/BoxContext/BoxContext";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import "./App.css";
import MainDiv from "./components/MainDiv/MainDiv";

const App = () => {
  return (
    <BoxProvider>
      <div className="w-full h-screen flex justify-start items-start flex-col z-10">
        <Header />
        <div className="w-full h-full flex justify-center items-center lg:flex-row flex-col-reverse">
          <Sidebar />
          <MainDiv />
        </div>
      </div>
    </BoxProvider>
  );
};

export default App;
