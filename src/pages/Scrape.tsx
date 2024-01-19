import { Typography } from "@material-tailwind/react";
import React from "react";

const Scrape: React.FC = () => {
  return (
    <div className="card w-full">
      <div className="grid grid-cols-12">
        <div className="col-span-2 border border-r p-4">
          <div className="">
            <Typography variant="small" className="font-medium">
              Scrape by Category
            </Typography>

            <div>
                <ul>
                    <li>
                        
                    </li>
                </ul>
            </div>
          </div>
        </div>
        <div className="col-span-10 p-4">B</div>
      </div>
    </div>
  );
};

export default Scrape;
