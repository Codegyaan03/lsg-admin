import { Button, Card, Input } from "@material-tailwind/react";
import { useScrape } from "hooks/api-hooks/useScrape";
import moment from "moment";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";

const TableLoader = () => {
  return <></>;
};

const EditorialDataTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const { editorialCardDataQuery } = useScrape(page, limit, search);

  return (
    <Card className="p-2">
      <DataTable
        columns={[
          {
            name: "Id",
            center: true,
            selector: (row) => row.id,
            sortable: true,
          },

          {
            name: "Title",
            center: true,
            selector: (row) => row.title,
          },

          {
            name: "Source",
            center: true,
            selector: (row) => row.source.title.toUpperCase(),
            cell: (row) => (
              <Link to={row.source.link} target="_blank">
                {row.source.title.toUpperCase()}
              </Link>
            ),
          },

          {
            name: "Created At",
            center: true,
            selector: (row) => row.createdAt,
            format: (row) => moment(row.createdAt).format("YYYY-MM-DD HH:mm"),
            sortable: true,
          },

          {
            name: "Viewers Count",
            center: true,
            selector: (row) => row.viewersCount,
            sortable: true,
          },

          {
            name: "Action",
            center: true,
            cell: (props) => {
              return (
                <div className="flex gap-2 py-2">
                  <Link to={props.id}>
                    <Button variant="outlined" className="break-keep">
                      Edit
                    </Button>
                  </Link>

                  <Button variant="filled" className="break-keep">
                    Publish
                  </Button>
                </div>
              );
            },
          },
        ]}
        data={editorialCardDataQuery.data?.data.result.editorial || []}
        progressComponent={<TableLoader />}
        highlightOnHover
        pointerOnHover
        pagination
        paginationServer
        subHeader
        subHeaderComponent={
          <div className="">
            <Input
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              className="rounded-full !border-gray-300 focus:!border-gray-400 placeholder:!opacity-100"
              placeholder="Search..."
              containerProps={{
                className: "min-w-0",
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<IoSearchOutline />}
            />
          </div>
        }
        progressPending={editorialCardDataQuery.isFetching}
        paginationTotalRows={editorialCardDataQuery.data?.data.result.total}
        onChangeRowsPerPage={(rowPerPage) => {
          setLimit(rowPerPage);
        }}
        onChangePage={(page) => {
          setPage(page);
        }}
        selectableRows
      />
    </Card>
  );
};

export default EditorialDataTable;
