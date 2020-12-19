import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Header } from 'semantic-ui-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { sourceKeysMap } from '../source/const';

export const LocationTable = ({ id, location, suburbMapping }) => {
  const records = location;

  let columnDefs = [
    {
      headerName: 'Date',
      flex: 1,
      minWidth: 80,
      field: 'notification_date',
      sortable: true,
      sort: 'desc'
    },
    {
      headerName: 'Postcode',
      field: 'postcode',
      filter: 'agTextColumnFilter',
      flex: 1,
      minWidth: 80
    },
    {
      headerName: 'Suburb',
      flex: 2,
      valueGetter: ({ data }) =>
        suburbMapping[data.postcode] &&
        suburbMapping[data.postcode].join(', ').toLowerCase(),
      tooltipValueGetter: ({ value }) => value,
      tooltipShowDelay: 500,
      minWidth: 120
    },
    {
      headerName: 'Source',
      width: 50,
      flex: 1.5,
      valueGetter: ({ data }) =>
        sourceKeysMap.get(data.likely_source_of_infection),
      floatingFilterComponentParams: { suppressFilterButton: false },
      minWidth: 120
    },
    {
      headerName: 'Council',
      flex: 1.5,
      field: 'lga_name19',
      minWidth: 120
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
      <Header as='h4'>Case detail by date, source and location</Header>
      <small>You can filter by columns separately or combined.</small>
      <div
        className='ag-theme-balham'
        style={{ height: '300px', width: '100%' }}
      >
        <AgGridReact gridOptions={gridOptions} rowData={records} />
      </div>
    </>
  );
};
