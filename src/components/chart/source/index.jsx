import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { TotalSourceChart } from './TotalSourceChart';
import { DailySourceChart } from './DailySourceChart';
import { SourcePieChart } from './SourcePieChart';
// import { UnknownSourceTable } from './UnknownSourceTable';

export const Source = ({
  pageId,
  source,
  confirmedCasesByLocationAndSource
}) => {
  return (
    <Segment>
      {
        // eslint-disable-next-line
        <a id='community' className='target'></a>
      }
      <Header>Community Transmission / By Source: </Header>
      {source && source.length > 3 && pageId !== 'NSW' && pageId !== 'ACT' && (
        <TotalSourceChart id={pageId} source={source} />
      )}
      {(pageId === 'NSW' ||
        (pageId !== 'ACT' && source && source.length > 3)) && (
        <DailySourceChart id={pageId} source={source} />
      )}
      <SourcePieChart id={pageId} source={source} />
      {/* {confirmedCasesByLocationAndSource && <UnknownSourceTable id={id} confirmedCasesByLocationAndSource={confirmedCasesByLocationAndSource} />} */}
      {pageId === 'NSW' && (
        <small>
          Data source: always up to date from{' '}
          <a href='https://data.nsw.gov.au/data/dataset/nsw-covid-19-cases-by-likely-source-of-infection'>
            NSW Health open data.
          </a>
        </small>
      )}
    </Segment>
  );
};
