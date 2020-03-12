import React from 'react';
import { Grid } from 'semantic-ui-react';
import { DailyConfirmedChart } from './DailyConfirmedChart';
import { StatisticsChart } from './StatisticsChart';
import { SourcePieChart } from './SourcePieChart';

export const Chart = () => (
  <>
    <h2 className='ui small header'>Trending:</h2>
    <Grid columns='equal' stackable>
      <Grid.Column>
        <DailyConfirmedChart />
      </Grid.Column>

      <Grid.Column>
        <SourcePieChart />
      </Grid.Column>

      <Grid.Column>
        <StatisticsChart />
      </Grid.Column>
    </Grid>
  </>
);
