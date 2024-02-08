import React from "react";
import EditorialCard from "../EditorialCard";
import { useScrape } from "hooks/api-hooks/useScrape";

const EditorialCardList: React.FC = () => {
  const { editorialCardDataQuery } = useScrape();

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 py-2 px-4">
      {editorialCardDataQuery.data?.data.result.map((item) => {
        return <EditorialCard data={item} key={item.id} />;
      })}
    </div>
  );
};

export default EditorialCardList;
