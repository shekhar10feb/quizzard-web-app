import React, { useState } from "react";

function DragAndDrop() {
  const [items, setItems] = useState([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },
  ]);

  const [draggedItemId, setDraggedItemId] = useState(null);

  const handleDragStart = (id) => {
    setDraggedItemId(id); // Save the ID of the dragged item
  };

  const handleDrop = (targetId) => {
    const draggedIndex = items.findIndex((item) => item.id === draggedItemId);
    const targetIndex = items.findIndex((item) => item.id === targetId);

    // Swap items
    const updatedItems = [...items];
    const [draggedItem] = updatedItems.splice(draggedIndex, 1);
    updatedItems.splice(targetIndex, 0, draggedItem);

    setItems(updatedItems);
    setDraggedItemId(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow drop
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {items.map((item) => (
        <div
          key={item.id}
          draggable
          onDragStart={() => handleDragStart(item.id)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(item.id)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9",
            textAlign: "center",
            cursor: "grab",
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
}

export default DragAndDrop;
