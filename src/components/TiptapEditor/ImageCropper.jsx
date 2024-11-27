import React, { useRef, useContext } from "react";
import { useDropzone } from "react-dropzone";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { BiImageAdd } from "react-icons/bi";
import { BoxContext } from "../BoxContext/BoxContext";

const ImageCropper = ({
  box,
  image,
  setImage,
  insertImageRef,
  resetButtonRef,
}) => {
  const cropperRef = useRef(null); // Reference to the Cropper instance
  const { setResultedImage } = useContext(BoxContext);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result); // Convert image to base64 URL
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] }, // Accept only image files
    maxFiles: 1,
  });

  const cropImage = () => {
    const cropper = cropperRef.current.cropper;

    if (cropper) {
      const croppedImage = cropper.getCroppedCanvas().toDataURL(); // Get cropped image as base64
      setResultedImage((box.image_for_question = croppedImage));
    }
  };

  return (
    <div
      className="w-full flex justify-between items-center"
      style={{ margin: "20px auto", textAlign: "center" }}
    >
      {/* Dropzone */}
      {!image && (
        <div
          {...getRootProps()}
          style={{
            transition: "background-color 0.3s",
          }}
          className="w-full border-2 border-dashed border-blue-600 lg:p-2 p-1 lg:rounded-md rounded-sm cursor-pointer"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drag image here...</p>
          ) : (
            <div className="w-full justify-start items-start flex-row md:text-xs text-[0.7rem]">
              <div className="w-full flex justify-between items-center flex-row">
                <span className="w-auto flex justify-start items-center flex-row">
                  <span className="md:text-xl text-lg lg:mr-2 mr-1">
                    <BiImageAdd />
                  </span>
                  <p className="text-gray-500">
                    <u className="cursor-pointer">Upload</u> or drop a file
                    right here
                  </p>
                </span>
                <span className="w-auto flex justify-start items-center">
                  <p className="text-xs text-gray-500">JPEG, JPG, PNG</p>
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Image Cropper */}
      {image && (
        <>
          <Cropper
            src={image}
            style={{ height: 400, width: "100%" }}
            aspectRatio={1} // Set aspect ratio (e.g., 1 for square cropping)
            guides={true} // Show grid lines
            ref={cropperRef} // Reference the Cropper instance
          />

          {/* Buttons */}
          <div className="hidden">
            <button ref={insertImageRef} onClick={cropImage}>
              Crop Image
            </button>
            <button ref={resetButtonRef} onClick={() => setImage(null)}>
              Reset
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCropper;
