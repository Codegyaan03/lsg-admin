import {
  Button,
  Card,
  Input,
  List,
  ListItem,
  ListItemPrefix,
  Radio,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import ListCollapse from "../ui/ListCollapse";
import { PiDotsSixVerticalLight } from "react-icons/pi";
import { TbArrowBadgeRight } from "react-icons/tb";
import { useScrape } from "../../hooks/api-hooks/useScrape";

const ScrapeCategoryList: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(-1);
  const { scrapeEditorialMutation } = useScrape();
  const [source, setSource] = useState<number>(0);

  const handleStart = () => {
    if (activeIdx === 0) {
      scrapeEditorialMutation.mutate({ option: source });
    }
  };

  const listItemForBlogAndEditorial = (
    <>
      <ListItem selected={source === 0} onClick={() => setSource(0)}>
        <ListItemPrefix>
          <PiDotsSixVerticalLight />
        </ListItemPrefix>
        The Hindu
      </ListItem>
      <ListItem selected={source === 1} onClick={() => setSource(1)}>
        <ListItemPrefix>
          <PiDotsSixVerticalLight />
        </ListItemPrefix>
        Drishti IAS
      </ListItem>
    </>
  );

  return (
    <div className="flex gap-1 flex-col w-full">
      <List className="my-2 p-0 flex-col !w-full !min-w-full">
        <ListCollapse
          activeIdx={activeIdx}
          setIdx={(idx) => setActiveIdx(idx)}
          idx={0}
          heading={
            <>
              <ListItemPrefix>
                <TbArrowBadgeRight className="text-lg text-[#00000088]" />
              </ListItemPrefix>
              Editorial
            </>
          }
          collapse={
            <>
              <Card className="!shadow-none px-2 w-full">
                <List className="!w-full !min-w-full">
                  {listItemForBlogAndEditorial}
                </List>
              </Card>
            </>
          }
        />

        <ListCollapse
          activeIdx={activeIdx}
          setIdx={(idx) => setActiveIdx(idx)}
          idx={1}
          heading={
            <>
              <ListItemPrefix>
                <TbArrowBadgeRight className="text-lg text-[#00000088]" />
              </ListItemPrefix>
              Blog
            </>
          }
          collapse={
            <>
              <Card className="!shadow-none px-2 w-full">
                <List className="!w-full !min-w-full">
                  {listItemForBlogAndEditorial}
                </List>
              </Card>
            </>
          }
        />

        <ListCollapse
          activeIdx={activeIdx}
          setIdx={(idx) => setActiveIdx(idx)}
          idx={2}
          heading={
            <>
              <ListItemPrefix>
                <TbArrowBadgeRight className="text-lg text-[#00000088]" />
              </ListItemPrefix>
              By Link
            </>
          }
          collapse={
            <>
              <Card className="!shadow-none px-2 w-full gap-2 py-2">
                <div className="flex flex-col">
                  <Typography variant="small" color="blue-gray">
                    Type
                  </Typography>
                  <Radio
                    name="type"
                    ripple={false}
                    className="hover:before:opacity-0"
                    label="Editorial"
                  />
                  <Radio
                    name="type"
                    ripple={false}
                    className="hover:before:opacity-0"
                    label="Blog"
                    defaultChecked
                  />
                </div>

                <div className="flex flex-col">
                  <Typography variant="small" color="blue-gray">
                    Source
                  </Typography>
                  <Radio
                    name="source"
                    ripple={false}
                    className="hover:before:opacity-0"
                    label="The Hindu"
                  />
                  <Radio
                    name="source"
                    ripple={false}
                    className="hover:before:opacity-0"
                    label="Drishti IAS"
                    defaultChecked
                  />
                </div>

                <Input
                  size="lg"
                  placeholder="Your Link"
                  type="text"
                  label="Link"
                  variant="outlined"
                />
              </Card>
            </>
          }
        />
      </List>
      <Button
        disabled={scrapeEditorialMutation.isPending}
        className="lg:mt-2"
        onClick={handleStart}
      >
        {scrapeEditorialMutation.isPending ? "Scraping..." : "Start Scrape"}
      </Button>
    </div>
  );
};

export default ScrapeCategoryList;
