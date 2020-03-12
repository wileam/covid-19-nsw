import React from 'react';
import { Grid, Statistic, Table } from 'semantic-ui-react';
import { summaryData } from '../../data.js';
import './index.scss';

export const Summary = () => {
  const {
    totalConfirmed,
    remain,
    recovered,
    death,
    wip,
    today,
    excluded,
    totalTested
  } = summaryData;
  return (
    <div className='summary'>
      <h2 className='ui small header'>Summary data:</h2>
      <Grid columns={4}>
        <Grid.Column>
          <Statistic color='blue' label='Remain' value={remain} />
        </Grid.Column>
        <Grid.Column>
          <Statistic label='Total' value={totalConfirmed} />
        </Grid.Column>
        <Grid.Column>
          <Statistic color='grey' label='Death' value={death} />
        </Grid.Column>
        <Grid.Column>
          <Statistic color='green' label='Recover' value={recovered} />
        </Grid.Column>
      </Grid>
      <Table unstackable compact>
        <Table.Body>
          <Table.Row className='new-cases'>
            <Table.Cell>New cases today</Table.Cell>
            <Table.Cell>{today}</Table.Cell>
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
