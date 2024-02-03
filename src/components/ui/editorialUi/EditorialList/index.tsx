import React from "react";
import EditorialCard from "../EditorialCard";

const EditorialCardList: React.FC = () => {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-8 py-2 px-4">
      {Array(6)
        .fill("")
        .map(() => {
          return <EditorialCard />;
        })}
    </div>
  );
};

export default EditorialCardList;
