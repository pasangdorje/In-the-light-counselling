import React from "react";

function useTablePagination() {
  const [page, setPage] = React.useState(0);
  const [totalRows, setTotalRows] = React.useState();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return {
    page,
    setPage,
    totalRows,
    setTotalRows,
    rowsPerPage,
    setRowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  };
}

export default useTablePagination;
