import React, { useState, useRef } from "react";
import { iconCollective } from "../../Constant/Constant";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import TextIncreaseRoundedIcon from "@mui/icons-material/TextIncreaseRounded";
import TextDecreaseRoundedIcon from "@mui/icons-material/TextDecreaseRounded";
import styles from "./Home.module.css";
import jsPDF from "jspdf";
import ImageIcon from "@mui/icons-material/Image";
import html2canvas from "html2canvas";
import NavBar from "../../Components/Nav Bar/NavBar";

function Home() {
  // State
  const [title, setTitle] = useState("Untitled Document"); // Initializes "title" state variable with the value "Untitled Document"
  const [zoomLevel, setZoomLevel] = useState(100); // Initializes "zoomLevel" state variable with value 100 and "setZoomLevel" function to update "zoomLevel"
  const [image, setImage] = useState(null); // Initializes "image" state variable with value null and "setImage" function to update "image"

  // Refs
  const fileInputRef = useRef(null); // Initializes "fileInputRef" ref variable with null value

  // Functions

  // This function is called when the user clicks on the "Increase font size" button. It increases the font size of the selected text by executing the "fontSize" command with a value of "7".
  function handleIncreaseFontSize() {
    document.execCommand("fontSize", false, "7");
  }

  // This function is called when the user clicks on the "Decrease font size" button. It decreases the font size of the selected text by executing the "fontSize" command with a value of "3".
  function handleDecreaseFontSize() {
    document.execCommand("fontSize", false, "3");
  }

  // This function is called when the user clicks on any of the icons. It executes the command associated with the icon.
  function handleClick(element) {
    document.execCommand(`${element.iconFunctionality}`);
  }

  // This function is called when the user selects a color from the color picker. It changes the color of the selected text by executing the "foreColor" command with the selected color.
  function handleColorChange(color) {
    document.execCommand("foreColor", false, color);
  }

  // This function is called when the user selects a background color from the color picker. It changes the background color of the selected text by executing the "backColor" command with the selected color.
  function handleBackColorChange(color) {
    document.execCommand("backColor", false, color);
  }

  // This function is called when the user uploads an image. It reads the uploaded file using the "FileReader" API and creates an "img" element with the uploaded image. It then inserts the image at the current cursor position using the "insertNode" method of the "Range" API.
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = document.createElement("img");
      img.src = reader.result;
      img.className = styles.UploadedImageStyling;
      img.contentEditable = false;
      const range = window.getSelection().getRangeAt(0);
      range.insertNode(img);
      range.collapse(false);
    };
    reader.readAsDataURL(file);
  };

  // This function is called when the user clicks on the "Add Image" button. It triggers a click on the hidden "input" element used for uploading images.
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // This function is called when the user clicks on the "Download" button. It converts the content of the "TextSheet" element to an image using the "html2canvas" library. It then creates a PDF document using the "jsPDF" library and adds the image to the document. Finally, it downloads the document as a PDF file.
  async function handleDownload() {
    const sheetContent = document.querySelector(`.${styles.TextSheet}`); // Selects the HTML element with the class name "TextSheet" using document.querySelector() method and assigns it to the sheetContent variable.
    const canvas = await html2canvas(sheetContent, { dpi: 300 }); // Uses html2canvas library to convert sheetContent to an image with 300 DPI resolution
    const imageData = canvas.toDataURL("image/png", 1.0); // Converts the canvas image to a data URL with PNG format and 1.0 quality
    const pdfDoc = new jsPDF({
      // Creates a new jsPDF object with portrait orientation, A4 size and no compression
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: false,
    });
    pdfDoc.addImage(imageData, "PNG", 0, 0, 210, 297, "", "FAST"); // Adds the image to the PDF document with a width of 210mm and height of 297mm (A4 size)
    pdfDoc.save(`${title}.pdf`); // Saves saves the PDF document as a file with the filename being the same as the title of the document, which is passed to the save() method as an argument. The save() method downloads the file to the user's device.
  }

  return (
    <>
      <NavBar title={title} setTitle={setTitle} />
      <div className={styles.MainContainer}>
        {/* Icons and dropdowns */}
        <div className={styles.IconContainer}>
          {/* Map through icons and render buttons */}
          {iconCollective.map((element, index) => (
            <button
              onClick={() => handleClick(element)}
              key={index}
              className={styles.MappedIcons}
              title={element.iconTitle}
            >
              {element.iconName}
            </button>
          ))}
          {/* Zoom level dropdown */}
          <select
            value={zoomLevel}
            onChange={(e) => setZoomLevel(parseInt(e.target.value))}
            className={styles.ZoomDropdown}
          >
            {[50, 75, 90, 100, 125, 150].map((value) => (
              <option className={styles.ZoomOption} value={value} key={value}>
                {`${value}%`}
              </option>
            ))}
          </select>
          {/* Text size increase/decrease icons */}
          <div className={styles.TextSizeIconsContainer}>
            <TextIncreaseRoundedIcon
              className={styles.TextIncreaseIcon}
              onClick={handleIncreaseFontSize}
            />
            <TextDecreaseRoundedIcon
              className={styles.TextDecreaseIcon}
              onClick={handleDecreaseFontSize}
            />
          </div>
          {/* Text color input box */}
          <input
            type="color"
            onChange={(event) => handleColorChange(event.target.value)}
            className={styles.TextColorInputBox}
          />
          {/* Text fill input box */}
          <input
            type="color"
            onChange={(event) => handleBackColorChange(event.target.value)}
            className={styles.TextFillInputBox}
          />
          {/* Image icon */}
          <ImageIcon className={styles.ImageIcon} onClick={handleImageClick} />
          {/* Image upload input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            value=""
            hidden
          />
        </div>

        {/* Text sheet container */}
        <div
          className={styles.TextSheetContainer}
          style={{
            transform: `scale(${zoomLevel / 100})`,
            marginTop: `${zoomLevel > 125 ? 20 : zoomLevel > 100 ? 10 : 0}rem`,
          }}
        >
          <div
            className={styles.TextSheet}
            contentEditable={true}
            suppressContentEditableWarning={true}
            style={{ fontSize: "17px" }}
          >
            {/* Image container */}{" "}
            <div>
              {image ? (
                <img
                  className={styles.ImageContainer}
                  src={image}
                  alt="uploaded"
                />
              ) : (
                ""
              )}{" "}
            </div>
          </div>
        </div>

        {/* Download icon */}
        <div onClick={handleDownload} className={styles.DownloadIconContainer}>
          <DownloadRoundedIcon className={styles.DownloadIcon} />
        </div>
      </div>
    </>
  );
}

export default Home;
