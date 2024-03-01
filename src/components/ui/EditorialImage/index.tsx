import { Button } from "@material-tailwind/react";
import React, { useState, ChangeEvent, DragEvent } from "react";

interface EditorialImageProps {
  setImage: (image: File | null) => void;
  image: File | null;
}

const EditorialImage: React.FC<EditorialImageProps> = ({ image, setImage }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setImage(e.dataTransfer.files[0]);
    setIsDragOver(false);
    e.dataTransfer.clearData();
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files ? e.target.files[0] : null);
  };

  return (
    <div className="w-full h-full mx-auto p-4 border rounded-md">
      <div
        className={`border-dashed border-2 h-full justify-center items-center flex flex-col ${
          isDragOver ? "border-blue-500" : "border-gray-300"
        } p-12 text-center`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {!image || isDragOver ? (
          <>
            <input
              type="file"
              className="hidden"
              onChange={handleFileInputChange}
              id="file-input"
              accept=".png, .jpg, .jpeg"
            />
            <label
              htmlFor="file-input"
              className="cursor-pointer text-blue-500 hover:underline"
            >
              {isDragOver ? "Drop here" : "Click or drag thumbnail to upload"}
            </label>
          </>
        ) : (
          <>
            <img
              className="mx-auto w-[40%]"
              src={URL.createObjectURL(image)}
              alt=""
            />
            <Button onClick={() => setImage(null)} className="mt-4">
              Remove
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default EditorialImage;
