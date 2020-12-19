import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
// import { TotalAgeChart } from './TotalAgeChart';
import { DailyAgeChart } from './DailyAgeChart';
import { AgeChart } from './AgeChart';
// import { default as nswAge } from './nswbyage.json';

export const Age = ({ pageId, age }) => {
  return (
    <Segment>
      {
        // eslint-disable-next-line
        <a id='age' className='target'></a>
      }
      <Header>Confirmed cases by Age: </Header>
      {/* {age && age.length > 3 && <TotalAgeChart id={id} age={age} />} */}
      {age && age.length > 3 && <DailyAgeChart pageId={pageId} age={age} />}
      {age && age[0] && <AgeChart pageId={pageId} age={age} />}
      {pageId === 'NSW' && (
        <small>
          Data source: always up to date from{' '}
          <a href='https://data.nsw.gov.au/data/dataset/nsw-covid-19-cases-by-age-range'>
            NSW Health open data.
          </a>
        </small>
      )}
    </Segment>
  );
};
