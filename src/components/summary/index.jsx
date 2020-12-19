import React from 'react';
import { Grid, Statistic, Segment } from 'semantic-ui-react';
import { NewNumber } from './NewNumber';
import './index.scss';

export const Summary = ({ pageId, todaySummarys }) => {
  const {
    totalConfirmed,
    totalRecovered,
    totalDeath,
    newConfirmed,
    newRecovered,
    newDeath
  } = todaySummarys;

  const totalRemianNumber = totalConfirmed - totalRecovered - totalDeath;

  return (
    <Segment>
      {
        // eslint-disable-next-line
        <a id='summary' className='target'></a>
      }
      <div className='summary'>
        <p>
          <strong>Summary data: </strong>
        </p>
        <Grid columns='equal'>
          <Grid.Column>
            <Statistic color='blue' label='Active' value={totalRemianNumber} />
          </Grid.Column>
          <Grid.Column>
            <NewNumber newNumber={newConfirmed} showDonut={true} />
            <Statistic color='red' label='Total' value={totalConfirmed} />
          </Grid.Column>
          <Grid.Column>
            <NewNumber newNumber={newDeath} />
            <Statistic color='grey' label='Death' value={totalDeath} />
          </Grid.Column>
          <Grid.Column>
            <NewNumber newNumber={newRecovered} showZero={false} />
            <Statistic color='green' label='Recovered' value={totalRecovered} />
          </Grid.Column>
        </Grid>
      </div>
    </Segment>
  );
};
