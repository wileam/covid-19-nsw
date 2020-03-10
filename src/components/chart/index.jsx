import React from 'react';
import { Grid } from 'semantic-ui-react';
import { DailyConfirmedChart } from './DailyConfirmedChart';
import { StatisticsChart } from './StatisticsChart';

const SHOW_STATISTICS = true;

export const Chart = () => (
  <>
    <h2 className='ui small header'>Trending:</h2>
    <Grid columns='equal' stackable>
      <Grid.Column>
        <DailyConfirmedChart />
      </Grid.Column>

      {SHOW_STATISTICS && (
        <Grid.Column>
          <StatisticsChart />
        </Grid.Column>
      )}
    </Grid>
  </>
);
