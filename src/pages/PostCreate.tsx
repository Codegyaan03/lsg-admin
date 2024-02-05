import React, { useState } from "react";
import { Editor } from "../components";

const PostCreate: React.FC = () => {
  const [content, setContent] = useState<string>("");

  return (
    <div className="h-full">
      <Editor
        content={content}
        handleContent={(content) => setContent(content)}
      />
    </div>
  );
};

export default PostCreate;
