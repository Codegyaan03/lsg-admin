import React from "react";
import { Select, Option } from "@material-tailwind/react";

const EditorialCategory: React.FC = () => {
  const versionOptions = [
    "Travel",
    "Education",
    "International Affairs",
    "Economy",
    "polity",
  ];

  return (
    <div>
      <div className="w-72">
        <Select label="Select Category">
          {versionOptions.map((option, index) => (
            <Option key={index}>{option}</Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default EditorialCategory;
