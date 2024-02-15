import React, { useState, ChangeEvent, DragEvent } from "react";

interface FileWithPreview extends File {
  preview: string;
}

const EditorialImage: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files) as File[];

    const filesWithPreview: FileWithPreview[] = files.map((file) => {
      const fileWithPreview = Object.assign(file, {
        preview: URL.createObjectURL(file),
      }) as FileWithPreview;
      return fileWithPreview;
    });

    setSelectedFiles([...selectedFiles, ...filesWithPreview]);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
  
    const filesWithPreview: FileWithPreview[] = Array.from(files).map((file) => ({
      ...file,
      preview: URL.createObjectURL(file),
    }));
  
    setSelectedFiles([...selectedFiles, ...filesWithPreview]);
  };
  

  const handleRemoveFile = (index: number) => {
    const newFiles = [...selectedFiles];
    const removedFile = newFiles.splice(index, 1)[0];
    URL.revokeObjectURL(removedFile.preview);
    setSelectedFiles(newFiles);
  };

  const handleUpload = () => {
    // Implement your upload logic here
    console.log("Uploading files:", selectedFiles);
    // Reset selectedFiles state after upload
    setSelectedFiles([]);
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-md shadow-md">
      <div
        className={`border-dashed border-2 ${
          isDragOver ? "border-blue-500" : "border-gray-300"
        } p-8 text-center`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          className="hidden"
          multiple
          onChange={handleFileInputChange}
          id="file-input"
        />
        <label
          htmlFor="file-input"
          className="cursor-pointer text-blue-500 hover:underline"
        >
          {isDragOver ? "Drop here" : "Click or drag files to upload"}
        </label>
      </div>

      <div className="mt-4">
        {selectedFiles.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-100 p-2 rounded-md mb-2"
          >
            <div className="flex items-center">
              <span className="mr-2">{file.name}</span>
              <span className="text-gray-500 text-sm">
                {(file.size / 1024).toFixed(2)} KB
              </span>
            </div>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleRemoveFile(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {selectedFiles.length > 0 && (
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleUpload}
        >
          Upload
        </button>
      )}
    </div>
  );
};

export default EditorialImage;
