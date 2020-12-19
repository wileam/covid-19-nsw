import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import * as moment from 'moment';

export const TestedTable = ({ id, statistics }) => {
  let columnDefs = [
    {
      headerName: 'Date',
      flex: 1,
      field: 'Date',
      sortable: true,
      // valueGetter: "moment(data.Date).format('MMM DD')"
      valueFormatter: ({ value }) => moment(value).format('MMM DD')
    },
    {
      headerName: 'Total',
      flex: 1,
      field: 'total tested',
      filter: 'agNumberColumnFilter',
      floatingFilterComponentParams: { suppressFilterButton: false }
    },
    {
      headerName: 'New',
      flex: 1,
      field: 'new tested',
      filter: 'agNumberColumnFilter',
      floatingFilterComponentParams: { suppressFilterButton: false }
    },
    {
      headerName: 'Total Positive %',
      flex: 1,
      valueGetter: "(data['positive rate'] * 100).toFixed(2) + '%'",
      filter: 'agNumberColumnFilter',
      floatingFilterComponentParams: { suppressFilterButton: false }
    },
    {
      headerName: 'Daily Positive %',
      flex: 1,
      valueGetter: "(data['daily positive rate'] * 100).toFixed(2) + '%'",
      filter: 'agNumberColumnFilter',
      floatingFilterComponentParams: { suppressFilterButton: false }
    }
  ];

  const gridOptions = {
    columnDefs,
    defaultColDef: {
      suppressMenu: true,
      floatingFilterComponentParams: { suppressFilterButton: true },
      flex: 1,
      minWidth: 50,
      sortable: true,
      resizable: true,
      filter: false
    },
    floatingFilter: false
  };

  return (
    <>
      <small>You can sort by click the column header.</small>
      <div
        className='ag-theme-balham'
        style={{ height: '200px', width: '100%' }}
      >
        <AgGridReact gridOptions={gridOptions} rowData={statistics} />
      </div>
    </>
  );
};
