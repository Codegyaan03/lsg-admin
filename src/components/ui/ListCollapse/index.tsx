import {
  Card,
  CardBody,
  Collapse,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { TbArrowBadgeRight } from "react-icons/tb";

interface ListCollapseProps {
  idx: number;
  activeIdx: number;
  heading: React.ReactNode;
  collapse: React.ReactNode;
  setIdx: (idx: number) => void;
}
const ListCollapse: React.FC<ListCollapseProps> = ({
  idx,
  setIdx,
  activeIdx,
  heading,
  collapse,
}) => {
  return (
    <>
      <ListItem
        selected={idx === activeIdx}
        onClick={() => (idx === activeIdx ? setIdx(-1) : setIdx(idx))}
        className="p-2 hover:bg-gray-100 rounded-full flex justify-start items-center gap-1 !w-full"
      >
        {heading}
      </ListItem>
      <Collapse className="!basis-[unset]" open={activeIdx === idx}>
        {collapse}
      </Collapse>
    </>
  );
};

export default ListCollapse;
