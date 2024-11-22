import React, { useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import SetCanvasPreview from "./SetCanvasPreview";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const ImageCropper = ({
  box,
  addImageRef,
  insertImageRef,
  setResultedImage,
}) => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState("");
  const [error, setError] = useState("");

  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        if (error) setError("");
        const { naturaWidth, naturalHeight } = e.currentTarget;
        if (naturaWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be atleast 150 x 150 pixels");
          return setImgSrc("");
        }
      });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  return (
    <div className="w-full h-full">
      <input
        type="file"
        ref={addImageRef}
        accept="image/*"
        onChange={onSelectFile}
        className="hidden"
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
      {imgSrc && (
        <div className="flex flex-col items-center">
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{ maxHeight: "40vh" }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <button
            ref={insertImageRef}
            className="hidden"
            onClick={() => {
              SetCanvasPreview(
                imgRef.current, // HTMLImageElement
                previewCanvasRef.current, // HTMLCanvasElement
                convertToPixelCrop(
                  crop,
                  imgRef.current.width,
                  imgRef.current.height
                )
              );
              const dataUrl = previewCanvasRef.current.toDataURL();
              if (dataUrl) {
                setResultedImage((box.image_for_question = dataUrl));
              }
            }}
          >
            Crop Image
          </button>
        </div>
      )}
      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150,
          }}
        />
      )}
    </div>
  );
};

export default ImageCropper;
