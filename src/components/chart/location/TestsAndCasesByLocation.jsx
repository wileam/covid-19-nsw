import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Header, Responsive } from 'semantic-ui-react';

export const TestsAndCasesByLocation = ({
  id,
  totalTestedReport,
  suburbMapping
}) => {
  const records = totalTestedReport.testsAndCasesByPostcode;
  let columnDefsDesktop = [
    {
      headerName: 'Postcode',
      flex: 1,
      field: 'postcode',
      sortable: true,
      minWidth: 80
    },
    {
      headerName: 'Suburb',
      flex: 2,
      valueGetter: ({ data }) =>
        suburbMapping[data.postcode].join(', ').toLowerCase(),
      tooltipValueGetter: ({ value }) => value,
      tooltipShowDelay: 500,
      minWidth: 120
    },
    {
      headerName: 'Tested',
      flex: 1,
      field: 'total',
      sort: 'desc',
      filter: 'agNumberColumnFilter',
      floatingFilterComponentParams: { suppressFilterButton: false },
      minWidth: 80
    },
    {
      headerName: 'Confirmed',
      flex: 1,
      field: 'confirmed',
      filter: 'agNumberColumnFilter',
      floatingFilterComponentParams: { suppressFilterButton: false },
      minWidth: 80
    },
    {
      headerName: 'Unknown',
      flex: 1,
      field: 'unknown',
      filter: 'agNumberColumnFilter',
      floatingFilterComponentParams: { suppressFilterButton: false },
      minWidth: 80
    },
    {
      headerName: 'Positive %',
      flex: 1,
      valueGetter: "(data.confirmed/data.total * 100).toFixed(2) + '%'",
      minWidth: 80
    },
    {
      headerName: 'Council',
      flex: 1.5,
      field: 'council',
      minWidth: 120
    }
  ];
  let columnDefsMobile = [
    {
      headerName: 'Postcode',
      flex: 1.1,
      field: 'postcode',
      sortable: true
    },
    {
      headerName: 'Confirmed',
      flex: 1.1,
      field: 'confirmed'
    },
    {
      headerName: 'Unknown',
      flex: 1,
      field: 'unknown'
    },
    {
      headerName: 'Pos%',
      flex: 1,
      valueGetter: "(data.confirmed/data.total * 100).toFixed(2) + '%'",
      filter: false,
      floatingFilterComponentParams: { suppressFilterButton: false }
    }
  ];

  const gridOptionsDesktop = {
    columnDefs: columnDefsDesktop,
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

  const gridOptionsMobile = {
    columnDefs: columnDefsMobile,
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
      <Header as='h4'>Summary data by location</Header>

      <p>
        Number of tests/confirmed/source unknown(community transmission) cases
        by location. NSW has done{' '}
        <strong>{totalTestedReport.count.toLocaleString()}</strong> tests.
      </p>

      <small>
        * Filter by columns separately or combined, sort by click the column
        header.
      </small>

      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <div
          className='ag-theme-balham'
          style={{ height: '400px', width: '100%' }}
        >
          <AgGridReact gridOptions={gridOptionsDesktop} rowData={records} />
        </div>
      </Responsive>
      <Responsive maxWidth={Responsive.onlyTablet.minWidth - 1}>
        <strong>
          <small>
            Please use desktop to see more columns and better filter
            functionality.
          </small>
        </strong>
        <div
          className='ag-theme-balham'
          style={{ height: '300px', width: '100%' }}
        >
          <AgGridReact gridOptions={gridOptionsMobile} rowData={records} />
        </div>
      </Responsive>
      {id === 'NSW' && (
        <small>
          * Data source: always up to date from{' '}
          <a href='https://data.nsw.gov.au/nsw-covid-19-data/'>
            NSW Health open data
          </a>
          , data in table excluded{' '}
          {totalTestedReport.countNonNswCases.toLocaleString()} tests postcode
          doesn't have a valid nsw postcode, and{' '}
          {totalTestedReport.countNoLocationNswCases.toLocaleString()} tests has
          no location information.
        </small>
      )}
    </>
  );
};
