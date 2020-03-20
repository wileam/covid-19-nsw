import React from 'react';
import { Grid } from 'semantic-ui-react';
import { DailyConfirmedChart } from './DailyConfirmedChart';
import { StatisticsChart } from './StatisticsChart';
import { SourcePieChart } from './SourcePieChart';

export const Chart = ({ id, dailyHistorys, predicts, source, statistics }) => (
  <>
    <h2 className='ui small header'>Trending:</h2>
    <Grid columns='equal' stackable>
      <Grid.Row>
        <Grid.Column>
          <DailyConfirmedChart
            id={id}
            dailyHistorys={dailyHistorys}
            predicts={predicts}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        {source && (
          <Grid.Column>
            <SourcePieChart source={source} />
          </Grid.Column>
        )}

        {statistics && statistics.length >= 5 && (
          <Grid.Column>
            <StatisticsChart statistics={statistics} />
          </Grid.Column>
        )}
      </Grid.Row>
    </Grid>
  </>
);
