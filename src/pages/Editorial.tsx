import React from "react";
import EditorialCard from "../components/ui/editorialUi/EditorialCard";
import EditorialCardList from "../components/ui/editorialUi/EditorialList";

const Editorial = () => {
  return (
    <div className="h-full overflow-y-scroll">
      <EditorialCardList />
    </div>
  );
};

export default Editorial;
