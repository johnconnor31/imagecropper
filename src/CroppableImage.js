import React from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default function CroppableImage(props) {
  const { image, crop, setCrop } = props;
  return (
    image && (
      <ReactCrop
        src={image}
        crop={crop}
        onChange={newCrop => setCrop(newCrop)}
        imageStyle={{ width: "1000px", height: "700px" }}
        maxHeight="100"
        maxWidth="800"
      />
    )
  );
}
