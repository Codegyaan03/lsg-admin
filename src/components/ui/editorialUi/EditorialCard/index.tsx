import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Chip } from "@material-tailwind/react";
import { IoEyeOutline } from "react-icons/io5";
import { BiMessageAltDetail } from "react-icons/bi";
import { RxDot } from "react-icons/rx";

const EditorialCard: React.FC = () => {
  return (
    <Card className="rounded-[18px] overflow-hidden">
      <CardHeader
        color="blue-gray"
        className="m-0 shadow-none !rounded-none relative"
      >
        <img
          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
          alt="card-image"
        />
        <Chip
          variant="ghost"
          value=" 2 min read"
          className="rounded-full w-auto absolute right-6 bg-white bottom-2 font-body"
        />
      </CardHeader>

      <CardBody>
        <div className="flex flex-col gap-4 top-[-40px] relative">
          <img
            className="w-8 h-8 rounded-full object-cover "
            src={"/profile.jpg"}
            width="32"
            height="32"
            alt="User"
          />
          <Chip
            variant="ghost"
            value="Lifestyle"
            className="rounded-full px-2 w-2/6 font-body text-xs border-0 text-ellipsis overflow-hidden text-center"
          />
          <Typography variant="h5" color="blue-gray" className="mb-2 font-body">
            As yen tumbles, gadget-loving Japan goes for secondhand iPhones
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="pt-0 flex gap-2 justify-between">
        <div className="flex items-center gap-2">
          <IoEyeOutline />
          <span>7316</span>
        </div>
        <div className="flex items-center gap-2">
          <BiMessageAltDetail />
          <span>3</span>
        </div>
        <div className="flex items-center gap-2">
          <RxDot />
          <span>Sun,Jan28</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EditorialCard;
