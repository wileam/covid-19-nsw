
import React from 'react';
import { Grid, Statistic, Table } from 'semantic-ui-react';
import { default as states } from '../../states.json';


export const AusSummary = ({ id, data }) => {
  const {
    totalConfirmedNumber,
    totalRecoveredNumber,
    totalDeathNumber,
    totalRemianNumber,
    todayNewNumber,
    otherStateNumber
  } = data[id].todaySummarys;
  return (
    <div className='summary'>
      <h2 className='ui small header'>Summary data:</h2>
      <Grid columns='equal'>
        <Grid.Column>
          <Statistic
            color='blue'
            label='Active'
            value={totalRemianNumber - otherStateNumber.active}
          />
        </Grid.Column>
        <Grid.Column>
          {todayNewNumber !== 0 && (
            <span className='small ui today-new-number'>+{todayNewNumber}</span>
          )}
          <Statistic
            color='red'
            label='Total'
            value={totalConfirmedNumber - otherStateNumber.all}
          />
        </Grid.Column>
        <Grid.Column>
          <Statistic
            color='grey'
            label='Death'
            value={totalDeathNumber - otherStateNumber.death}
          />
        </Grid.Column>
        <Grid.Column>
          <Statistic
            color='green'
            label='Recovered'
            value={totalRecoveredNumber - otherStateNumber.discharged}
          />
        </Grid.Column>
      </Grid>
      <Table unstackable compact>
        <Table.Header>
          <Table.Row textAlign='center'>
            <Table.HeaderCell>State</Table.HeaderCell>
            <Table.HeaderCell>Active</Table.HeaderCell>
            <Table.HeaderCell>Total(+New)</Table.HeaderCell>
            <Table.HeaderCell>Total death</Table.HeaderCell>
            <Table.HeaderCell>Total recovered</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {states.map(state => {
          const todaySummary = data[state].todaySummarys;
          const otherStateTotalNumber = todaySummary.otherStateNumber.all;
          const otherStateActiveNumber = todaySummary.otherStateNumber.active;
          const otherStateRecoverNumber =
            todaySummary.otherStateNumber.discharged;
          const otherStateDeathNumber = todaySummary.otherStateNumber.death;

          return (
            <Table.Body>
              <Table.Row textAlign='center'>
                <Table.Cell>{state}</Table.Cell>
                <Table.Cell>
                  {todaySummary.totalRemianNumber - otherStateActiveNumber}
                  {otherStateActiveNumber !== 0 && <>*</>}
                </Table.Cell>
                <Table.Cell>
                  <strong>
                    {todaySummary.totalConfirmedNumber - otherStateTotalNumber}
                    {otherStateTotalNumber !== 0 && <>*</>}
                  </strong>
                  {todaySummary.todayNewNumber !== 0 && (
                    <>
                      (+
                      {todaySummary.todayNewNumber})
                    </>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {todaySummary.totalDeathNumber - otherStateDeathNumber}
                  {otherStateDeathNumber !== 0 && <>*</>}
                </Table.Cell>
                <Table.Cell>
                  {todaySummary.totalRecoveredNumber - otherStateRecoverNumber}
                  {otherStateRecoverNumber !== 0 && <>*</>}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          );
        })}
      </Table>
      <p className='ui small'>
        * Note that under NNDSS(National Notifiable Diseases Surveillance
        System) reporting requirements, cases are reported based on their
        Australian jurisdiction of residence rather than where they were
        detected.
      </p>
    </div>
  );
};
