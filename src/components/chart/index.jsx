import React from 'react';
import { Grid } from 'semantic-ui-react';
import { DailyConfirmedChart } from './DailyConfirmedChart';
import { StasticsChart } from './StasticsChart';

const SHOW_STASTICS = localStorage.getItem('SHOW_STASTICS') || false;

export const Chart = () => (
  <>
    <h2 className='ui small header'>Trending:</h2>
    <Grid columns='equal' stackable>
      <Grid.Column>
        <DailyConfirmedChart />
      </Grid.Column>

      {SHOW_STASTICS && (
        <Grid.Column>
          <StasticsChart />
        </Grid.Column>
      )}
    </Grid>
  </>
);
