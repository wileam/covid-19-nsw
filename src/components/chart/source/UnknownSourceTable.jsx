import React from 'react';
import { AgGridReact } from 'ag-grid-react';

export const UnknownSourceTable = ({
  id,
  confirmedCasesByLocationAndSource
}) => {
  const records =
    confirmedCasesByLocationAndSource.unknownSourceCasesByPostcode;
  let columnDefs = [
    {
      headerName: 'Postcode',
      flex: 1,
      field: 'postcode',
      sortable: true
    },
    {
      headerName: 'Count',
      flex: 1,
      field: 'count',
      filter: 'agNumberColumnFilter',
      floatingFilterComponentParams: { suppressFilterButton: false }
    },
    {
      headerName: 'Council',
      flex: 1.5,
      field: 'council'
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
      filter: 'agTextColumnFilter'
    },
    floatingFilter: true
  };

  return (
    <>
      <h3>Source unknown cases by location:</h3>
      <ul>
        <li>
          <small>You can filter by columns separately or combined.</small>
        </li>
        <li>
          <small>You can sort by click the column header</small>
        </li>
        <li>
          <small>
            Usage example: 1. search postcode=2000, 2. filter by council and
            sort by number of unknwon cases.
          </small>
        </li>
      </ul>
      <div
        className='ag-theme-balham'
        style={{ height: '400px', width: '100%' }}
      >
        <AgGridReact gridOptions={gridOptions} rowData={records} />
      </div>
    </>
  );
};
