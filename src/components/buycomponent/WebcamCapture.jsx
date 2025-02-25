import React from "react";
import Webcam from "react-webcam"; // Ensure you've installed the `react-webcam` package

const WebcamCapture = ({ capturePhoto }) => {
  return (
    <div className="webcam-capture-container">
      <Webcam
        audio={false}
        height={500}
        screenshotFormat="image/jpeg"
        width={500}
        className="text-center"
      >
        {({ getScreenshot }) => (
          <button
            onClick={() => {
              const imageSrc = getScreenshot();
              if (imageSrc) {
                capturePhoto(imageSrc); // Callback function to capture photo
              }
            }}
            className="mt-4 bg-[#edff8d] p-3 rounded-lg text-black"
          >
            Capture Photo
          </button>
        )}
      </Webcam>
    </div>
  );
};

export default WebcamCapture;
