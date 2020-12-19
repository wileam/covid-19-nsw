import React from 'react';
import { Segment, Header, Label } from 'semantic-ui-react';
import { LocationTable } from './Table';
import { TestsAndCasesByLocation } from './TestsAndCasesByLocation';

export const Location = ({
  pageId,
  location,
  totalTestedReport,
  suburbMapping
}) => {
  return (
    <Segment>
      {
        // eslint-disable-next-line
        <a id='location' className='target'></a>
      }
      <Label as='a' color='red' ribbon>
        New
      </Label>
      <Header as='span'>Data by location: </Header>
      {totalTestedReport && (
        <TestsAndCasesByLocation
          id={pageId}
          totalTestedReport={totalTestedReport}
          suburbMapping={suburbMapping}
        />
      )}
      {location && (
        <LocationTable
          id={pageId}
          location={location}
          suburbMapping={suburbMapping}
        />
      )}
      {pageId === 'NSW' && (
        <small>
          Data source: always up to date from{' '}
          <a href='https://data.nsw.gov.au/data/dataset/covid-19-cases-by-location'>
            NSW Health open data.
          </a>
        </small>
      )}
    </Segment>
  );
};
