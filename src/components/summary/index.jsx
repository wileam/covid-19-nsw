import React from 'react';
import { Grid, Statistic, Table } from 'semantic-ui-react';
import { todaySummarys } from '../../data/todaySummary';
import { statistics } from '../../data/statistics';
import './index.scss';

export const Summary = () => {
  const {
    totalConfirmedNumber,
    totalRecoveredNumber,
    totalDeathNumber,
    totalRemianNumber,
    todayNewNumber,
  } = todaySummarys;
  const wip = statistics[0]['under investigation'];
  const excluded = statistics[0].excluded;
  const totalTested = statistics[0]['total tested'];
  return (
    <div className='summary'>
      <h2 className='ui small header'>Summary data:</h2>
      <Grid columns='equal'>
        <Grid.Column>
          <Statistic color='blue' label='Remain' value={totalRemianNumber} />
        </Grid.Column>
        <Grid.Column>
          <Statistic label='Total' value={totalConfirmedNumber} />
        </Grid.Column>
        <Grid.Column>
          <Statistic color='grey' label='Death' value={totalDeathNumber} />
        </Grid.Column>
        <Grid.Column>
          <Statistic color='green' label='Recover' value={totalRecoveredNumber} />
        </Grid.Column>
      </Grid>
      <Table unstackable compact>
        <Table.Body>
          <Table.Row negative>
            <Table.Cell>New cases today</Table.Cell>
            <Table.Cell>{todayNewNumber}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cases under investigation</Table.Cell>
            <Table.Cell>{wip}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cases tested and excluded</Table.Cell>
            <Table.Cell>{excluded}</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell>Total tested</Table.HeaderCell>
            <Table.HeaderCell>{totalTested}</Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};
