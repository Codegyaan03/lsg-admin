import React, { useState } from "react";
import { Editor } from "../components";
import { useParams } from "react-router";
import { Card, Button } from "@material-tailwind/react";
import EditorialImage from "components/ui/EditorialImage";
import EditorialCategory from "components/ui/Category";

const PostCreate: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const params = useParams();
  console.log(params);
  return (
    <div className="h-full flex flex-col gap-7">
      <Card className="h-full">
        <Editor
          content={content}
          handleContent={(content) => setContent(content)}
        />
      </Card>
      <div className="flex gap-5 h-full">
        <Card className="h-full w-full p-12">
          <EditorialImage />
        </Card>
        <Card className="w-full h-full items-center justify-center">
          <EditorialCategory />
        </Card>
      </div>
      <div className="justify-center items-center flex">
        <Button color="blue">Publish</Button>
      </div>
    </div>
  );
};

export default PostCreate;
