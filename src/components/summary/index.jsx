import React from 'react';
import { Grid, Statistic, Table } from 'semantic-ui-react';
import './index.scss';

const SOURCE_BY_STATE = {
  NSW: 'https://www.health.nsw.gov.au/news/pages/2020-nsw-health.aspx',
  VIC: 'https://www2.health.vic.gov.au/about/media-centre/MediaReleases/',
  QLD: 'https://www.health.qld.gov.au/news-events/doh-media-releases',
  WA:
    'https://ww2.health.wa.gov.au/~/media/Files/Corporate/general%20documents/Infectious%20diseases/PDF/Coronavirus/COVID19-daily-snapshot.pdf',
  SA:
    'https://www.sahealth.sa.gov.au/wps/wcm/connect/public+content/sa+health+internet/about+us/news+and+media/all+media+releases/all+media+releases',
  NT: 'https://securent.nt.gov.au/alerts/coronavirus-covid-19-updates',
  TAS: 'https://www.dhhs.tas.gov.au/news/2020',
  ACT:
    'https://www.health.act.gov.au/public-health-alert/updated-information-about-covid-19'
};

export const Summary = ({ id, todaySummarys, statistics }) => {
  const {
    totalConfirmedNumber,
    totalRecoveredNumber,
    totalDeathNumber,
    totalRemianNumber,
    todayNewNumber,
    otherStateRecords
  } = todaySummarys;
  const statistic = statistics.filter(statistic => statistic.State === id)[0];
  let wip, excluded, totalTested;
  if (statistic) {
    wip = statistic['under investigation'];
    excluded = statistic.excluded;
    totalTested = statistic['total tested'];
  }

  return (
    <div className='summary'>
      <h2 className='ui small header'>Summary data:</h2>
      <Grid columns='equal'>
        <Grid.Column>
          <Statistic color='blue' label='Remain' value={totalRemianNumber} />
        </Grid.Column>
        <Grid.Column>
          <Statistic color='red' label='Total' value={totalConfirmedNumber} />
        </Grid.Column>
        <Grid.Column>
          <Statistic color='grey' label='Death' value={totalDeathNumber} />
        </Grid.Column>
        <Grid.Column>
          <Statistic
            color='green'
            label='Recover'
            value={totalRecoveredNumber}
          />
        </Grid.Column>
      </Grid>
      <Table unstackable compact>
        <Table.Body>
          {
            <Table.Row negative>
              <Table.Cell>New cases today</Table.Cell>
              <Table.Cell>
                {todayNewNumber === 0 ? <>Pending data</> : todayNewNumber}
              </Table.Cell>
            </Table.Row>
          }
          {wip && (
            <Table.Row>
              <Table.Cell>Cases under investigation</Table.Cell>
              <Table.Cell>{wip}</Table.Cell>
            </Table.Row>
          )}
          {excluded && (
            <Table.Row>
              <Table.Cell>Cases tested and excluded</Table.Cell>
              <Table.Cell>{excluded}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
        {totalTested && (
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell>Total tested</Table.HeaderCell>
              <Table.HeaderCell>{totalTested}</Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        )}
      </Table>
      <p>
        Data source:{' '}
        <a href={SOURCE_BY_STATE[id]} target='_blank' rel='noopener noreferrer'>
          {id} Health
        </a>
      </p>
      {otherStateRecords.length !== 0 && (
        <>
          <p className='ui small'>
            {otherStateRecords.length}{' '}
            {otherStateRecords.length === 1 ? (
              <>case is other state's resident</>
            ) : (
              <>cases are other state's residents</>
            )}
            , count in their number in national data.
          </p>
        </>
      )}
    </div>
  );
};
