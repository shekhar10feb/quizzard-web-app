import React, { useContext, useMemo } from "react";
import { BoxContext } from "../BoxContext/BoxContext";
import MainBox from "../MainBox/MainBox"; // Component for each main box

const MainDiv = () => {
  const { boxes, activeDiv } = useContext(BoxContext);

  // Memoize the rendering of boxes
  const memoizedMainBoxes = useMemo(() => {
    return boxes.map((box) => {
      if (box.id < 6) {
        return (
          <div
            className="w-full h-full flex"
            style={{ display: activeDiv === box.id ? "flex" : "none" }}
            key={box.id}
          >
            <MainBox key={box.id} box={box} />
          </div>
        );
      }
    });
  }, [boxes, activeDiv]);

  return (
    <div className="w-full h-full flex justify-center items-center flex-col border border-l border-r bg-white relative lg:overflow-y-auto">
      {memoizedMainBoxes}
    </div>
  );
};

export default MainDiv;
