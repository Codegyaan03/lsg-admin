import React, { useEffect, useState } from "react";
import Editor from "components/Editor";
import { useParams } from "react-router";

import {
  Card,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import EditorialImage from "components/ui/EditorialImage";
import List from "components/ui/Category";
import usePost from "hooks/api-hooks/usePost";

const PostCreate: React.FC = () => {
  const params = useParams();
  const { getSingleItem } = usePost(params.id ? params.id : "");

  const [open, setOpen] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);

  return (
    <div className="h-full flex flex-col gap-7">
      <Card className="h-full">
        <Editor content={getSingleItem.data?.data.result.content || ""} />
      </Card>
      <div className="flex flex-col gap-5 h-full">
        <Card className="p-4 flex gap-2 flex-row justify-start items-center">
          <Button color="indigo" onClick={() => setOpen(true)}>
            Choose Thumbnail
          </Button>
          {image?.name}
        </Card>
        <Card className="flex p-4 flex-1 flex-col items-center gap-4 justify-center">
          <List label="Category" />
          <List label="Tags" />
        </Card>
      </div>
      <div className="justify-start items-center flex">
        <Button color="indigo">Publish</Button>
      </div>

      <Dialog open={open} handler={() => setOpen(false)}>
        <DialogHeader>Select Thumbnail</DialogHeader>
        <DialogBody>
          <EditorialImage image={image} setImage={setImage} />
        </DialogBody>
        <DialogFooter className="gap-2">
          <Button
            variant="gradient"
            color="green"
            onClick={() => setOpen(false)}
          >
            Done
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default PostCreate;
