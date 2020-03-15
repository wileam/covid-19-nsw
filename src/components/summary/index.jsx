import React from 'react';
import { Grid, Statistic, Table } from 'semantic-ui-react';
import { statistics } from '../../data/statistics';
import './index.scss';

export const Summary = ({ id, data }) => {
  const {
    totalConfirmedNumber,
    totalRecoveredNumber,
    totalDeathNumber,
    totalRemianNumber,
    todayNewNumber,
  } = data;
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
          <Statistic label='Total' value={totalConfirmedNumber} />
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
          {<Table.Row negative>
            <Table.Cell>New cases today</Table.Cell>
            <Table.Cell>{todayNewNumber === 0 ? (<>Pending data</>) : todayNewNumber}</Table.Cell>
          </Table.Row>}
          {wip && <Table.Row>
            <Table.Cell>Cases under investigation</Table.Cell>
            <Table.Cell>{wip}</Table.Cell>
          </Table.Row>}
          {excluded && <Table.Row>
            <Table.Cell>Cases tested and excluded</Table.Cell>
            <Table.Cell>{excluded}</Table.Cell>
          </Table.Row>}
        </Table.Body>
        {totalTested && <Table.Footer>
          <Table.Row>
            <Table.HeaderCell>Total tested</Table.HeaderCell>
            <Table.HeaderCell>{totalTested}</Table.HeaderCell>
          </Table.Row>
        </Table.Footer>}
      </Table>
    </div>
  );
};
