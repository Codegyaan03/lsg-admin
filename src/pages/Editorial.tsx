import React from "react";
import EditorialDataTable from "components/ui/editorialUi/EditorialDataTable";

const Editorial: React.FC = () => {
  return (
    <div className="h-full overflow-y-scroll">
      {/* <EditorialCardList /> */}
      <EditorialDataTable />
    </div>
  );
};

export default Editorial;
