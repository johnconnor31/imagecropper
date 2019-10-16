import React from "react";
import CroppableImage from "./CroppableImage";
import FileUploader from "./FileUploader";
import "./App.css";

const initialCrop = {
  width: 100,
  height: 100,
  x: 20,
  y: 20
};
function App() {
  const [image, setImage] = React.useState("");
  const [crop, setCrop] = React.useState(initialCrop);
  const [previewImage, setPreviewImage] = React.useState("");

  function handleSaveImage() {
    const fullImage = document.getElementsByTagName("img")[0];
    let croppedImage;
    if (fullImage) {
      const ratioX = fullImage.naturalWidth / image.width;
      const ratioY = fullImage.naturalHeight / image.height;
      const canvas = document.createElement("canvas");
      const canvasContext = canvas.getContext("2d");
      canvasContext.drawImage(
        fullImage,
        crop.x * ratioX,
        crop.y * ratioY,
        crop.width * ratioX,
        crop.height * ratioY,
        0,
        0,
        crop.width,
        crop.height
      );
      croppedImage = canvas.toDataURL("image/png");
    }
    saveImageToAPI(croppedImage).then(imgSrc => setPreviewImage(imgSrc));
  }

  function saveImageToAPI(imageFile) {
    return Promise.resolve("http://lorempixel.com/800/100/cats/");
  }
  function handlePrint() {
    const printWindow = window.open("", "_blank");
    const img = printWindow.document.createElement("img");
    img.src = previewImage;
    printWindow.document.body.style = "text-align: center";
    printWindow.document.body.appendChild(img);
    img.onload = function() {
      printWindow.print();
    };
    printWindow.onafterprint = function() {
      printWindow.close();
    };
  }
  function handleUploadImage(image) {
    setPreviewImage("");
    setImage(image);
    setCrop(initialCrop);
  }
  function clearImage() {
    setImage("");
    setPreviewImage("");
    clearFile();
  }
  function clearFile() {
    document.getElementsByClassName("input-element")[0].value = "";
  }
  return (
    <div className="App">
      <h3>Welcome to Image Editor</h3>
      <table>
        <thead>
          <tr>
            <td>
              {!previewImage ? (
                <button className="saveBtn" onClick={handleSaveImage}>
                  Save Image
                </button>
              ) : (
                <button className="printBtn" onClick={handlePrint}>
                  Print Preview
                </button>
              )}
              <button className="clearBtn" onClick={clearImage}>
                Clear Image
              </button>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr className="imageSection">
            <td>
              {" "}
              {previewImage ? (
                <img id="previewImage" src={previewImage} alt="abc" />
              ) : (
                <CroppableImage image={image} crop={crop} setCrop={setCrop} />
              )}
            </td>
          </tr>
          <tr className="fileSection">
            <td>
              <FileUploader
                handleUploadImage={handleUploadImage}
                clearImage={clearImage}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
