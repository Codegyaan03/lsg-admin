import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { IoIosImages } from "react-icons/io";
import Gallery from "./Gallery";
import { MDXEditorMethods } from "@mdxeditor/editor";

type GalleryInsertProps = {
  editorRef: React.RefObject<MDXEditorMethods>;
};

export const GalleryInsert: React.FC<GalleryInsertProps> = ({ editorRef }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        variant="text"
        className="p-1 rounded-sm"
      >
        <IoIosImages className="text-2xl text-[#60646c]" />
      </Button>

      <Gallery
        editorRef={editorRef}
        open={open}
        handleOpen={() => setOpen(!open)}
      />
    </>
  );
};
