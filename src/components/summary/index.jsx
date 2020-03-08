import React from 'react';
import { Grid, Statistic, Table } from 'semantic-ui-react';
import { summaryData } from '../../data.js';
import './index.scss';

export const Summary = () => {
  const {
    updated,
    total,
    remain,
    recovered,
    death,
    wip,
    excluded
  } = summaryData;
  return (
    <div className='summary'>
      <h2 className='ui small header'>Summary Data(updated {updated}):</h2>
      <Grid columns={4}>
        <Grid.Column>
          <Statistic color='blue' label='Remain Cases' value={remain} />
        </Grid.Column>
        <Grid.Column>
          <Statistic label='Total Cases' value={total} />
        </Grid.Column>
        <Grid.Column>
          <Statistic color='grey' label='Death Cases' value={death} />
        </Grid.Column>
        <Grid.Column>
          <Statistic color='green' label='Recover Cases' value={recovered} />
        </Grid.Column>
      </Grid>
      <Table unstackable>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Cases under investigation</Table.Cell>
            <Table.Cell>{wip}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cases tested and excluded</Table.Cell>
            <Table.Cell>{excluded}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};
