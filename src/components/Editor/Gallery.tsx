import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
} from "@material-tailwind/react";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { useGallery } from "hooks/api-hooks/useGallery";

interface GalleryProps {
  open: boolean;
  handleOpen: () => void;
  editorRef: React.RefObject<MDXEditorMethods>;
}

const images = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    alt: "image1",
  },
  {
    id: 2,
    url: "https://images.pexels.com/photos/4767578/pexels-photo-4767578.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    alt: "image2",
  },
];

const Gallery: React.FC<GalleryProps> = ({ open, handleOpen, editorRef }) => {
  const { galleryQuery } = useGallery();

  return (
    <Dialog open={open} size="lg" handler={handleOpen}>
      <DialogHeader>Your Uploads</DialogHeader>
      <DialogBody>
        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
          {galleryQuery.data?.data.result.resources.map(
            (item: any, key: any) => {
              return (
                <Card
                  key={key}
                  onClick={() => {
                    editorRef.current?.focus();
                    editorRef.current?.insertMarkdown(
                      `![](${item.secure_url})`,
                    );
                    handleOpen();
                  }}
                  className="p-2 cursor-pointer"
                >
                  <img
                    src={item.secure_url}
                    alt={item.alt}
                    className="rounded-md w-full h-full object-cover"
                  />
                </Card>
              );
            },
          )}
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Close</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default Gallery;
