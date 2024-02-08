import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Chip } from "@material-tailwind/react";
import { IoEyeOutline } from "react-icons/io5";
import { BiMessageAltDetail } from "react-icons/bi";
import { RxDot } from "react-icons/rx";
import { Article } from "types/editorial";
import moment from "moment";
import { Link } from "react-router-dom";
import { IoImageOutline } from "react-icons/io5";

interface EditorialCardDataProps {
  data: Article;
}

const EditorialCard: React.FC<EditorialCardDataProps> = ({ data }) => {
  return (
    <Link to={`/contents/editorials/${data.id}`}>
      <Card className="rounded-[18px] overflow-hidden hover:scale-[1.02] duration-300 h-full justify-between">
        <CardHeader
          color="blue-gray"
          className="m-0 shadow-none h-[220px] !rounded-none relative"
        >
          {data.thumbnail ? (
            <img
              className="h-full w-full"
              src={data.thumbnail}
              alt={data.title}
            />
          ) : (
            <div className="h-full w-full grid place-items-center bg-blue-gray-200">
              <IoImageOutline className="text-5xl" />
            </div>
          )}
          <Chip
            variant="ghost"
            value={`${Math.floor(
              (data.content.replace(/<[^>]*>/g, "").match(/\b[a-zA-Z]+\b/g)
                ?.length || 0) / 200,
            )} min read`}
            size="sm"
            className="rounded-full w-auto absolute right-6 bg-white bottom-2 font-medium"
          />
        </CardHeader>

        <CardBody>
          <div className="flex flex-col gap-4 top-[-45px] relative">
            <img
              className="w-12 h-12 rounded-full object-cover "
              src={"/profile.jpg"}
              width="32"
              height="32"
              alt="User"
            />
            <Chip
              variant="ghost"
              value={data.source.title}
              className="rounded-full px-2 w-fit text-xs border-0 font-medium"
            />
            <Typography
              variant="lead"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              {data.title}
            </Typography>
          </div>
        </CardBody>
        <CardFooter className="pt-0 flex gap-2 justify-between">
          <div className="flex items-center gap-2">
            <IoEyeOutline />
            <span>{data.viewersCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <BiMessageAltDetail />
            <span>3</span>
          </div>
          <div className="flex items-center gap-1">
            <RxDot />
            <span>{moment(data.createdAt).format("MMM, DD YYYY")}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default EditorialCard;
