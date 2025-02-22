import {
    Camera,
    Images,
    Check,
    ChevronRight ,
  } from 'lucide-react';
  
const UploadSection = ({ title, image, onUpload }) => {
  return (
    <div className="upload-section mb-8">
      <div className="flex items-center gap-2 mb-4">
        {image == null ? (
          <ChevronRight />
        ) : (
          <Check size={30} className="text-[#edff8d] check-icon" />
        )}
        <h3 className="section-title">{title}</h3>
      </div>

      <div>
        <div className="flex justify-center gap-[75px]">
          {/* Button for uploading from the camera */}
          <button
            onClick={() => onUpload("camera")}
            className="upload-button group"
          >
            <Camera size={28} className="mb-2 text-[#edff8d]" />
          </button>

          {/* Button for uploading from the gallery */}
          <button
            onClick={() => onUpload("gallery")}
            className="upload-button group"
          >
            <Images size={30} className="mb-2 text-[#edff8d]" />
          </button>
        </div>

        {/* Display the uploaded image */}
        {image && (
          <div className="mt-2 flex justify-center items-center">
            <img
              src={image}
              alt={title}
              width={250}
              height={300}
              className="rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadSection;
