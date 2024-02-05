import React from "react";
import EditorialCardList from "../components/ui/editorialUi/EditorialList";

const Editorial: React.FC = () => {
  return (
    <div className="h-full overflow-y-scroll">
      <EditorialCardList />
    </div>
  );
};

export default Editorial;
