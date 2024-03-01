import React from "react";
import { Select, Option } from "@material-tailwind/react";

interface ListProps {
  className?: string;
  label: string;
}

const List: React.FC<ListProps> = ({ className, label }) => {
  const versionOptions = [
    "Travel",
    "Education",
    "International Affairs",
    "Economy",
    "polity",
  ];

  return (
    <div className={className}>
      <div className="w-full">
        <Select label={label}>
          {versionOptions.map((option, index) => (
            <Option key={index}>{option}</Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default List;
