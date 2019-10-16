import React from "react";
export default function FileUploader(props) {
  const [error, setError] = React.useState("");
  function handleFileUpload(event) {
    const fileList = event.target.files;
    if (fileList && fileList[0]) {
      const isError = validateFile(fileList[0]);
      if (!isError) {
        const reader = new FileReader();
        reader.onload = function(e) {
          props.handleUploadImage(e.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
      } else {
        props.clearImage();
        setError("Please input an image with size <= 1MB");
      }
    }
  }
  function validateFile(file) {
    if (file.type.indexOf("image/") === -1 || file.size > 1000000) return true;
    else return false;
  }
  return (
    <>
      <input
        type="file"
        className="input-element"
        onChange={handleFileUpload}
        accept="image/*"
      />
      <button className="clearFile" onClick={props.clearImage}>
        X
      </button>
      <div style={{ color: "red" }}>{error}</div>
    </>
  );
}
