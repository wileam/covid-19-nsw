import React from 'react';
import { Grid, Statistic, Table, Responsive } from 'semantic-ui-react';
import { ResponsiveDiv } from '../common';
import { default as states } from '../../states.json';
import { NavLink } from 'react-router-dom';
import { NewNumber } from '../summary/NewNumber';

const getActualNumber = (OFFSET, state, field, todaySummary) => {
  return OFFSET[state] && OFFSET[state][field]
    ? todaySummary[field] + OFFSET[state][field]
    : todaySummary[field];
};

export const AusSummary = ({ pageId, data, setActive }) => {
  let OFFSET = {};
  let offsetText = '';
  try {
    OFFSET = JSON.parse(data.offset[1].config);
    for (const key in OFFSET) {
      if (OFFSET.hasOwnProperty(key)) {
        const stateOffset = OFFSET[key];
        if (
          stateOffset.totalConfirmed &&
          stateOffset.totalConfirmed !== 0 &&
          key !== 'AUS'
        ) {
          if (offsetText) {
            offsetText += ', ';
          }
          offsetText += `${key} State ${
            data[key].dailyHistorys[data[key].dailyHistorys.length - 1]
              .totalConfirmed
          }`;
        }
      }
    }
    if (offsetText) {
      offsetText += '.';
    }
  } catch (error) {
    OFFSET = {};
    console.error(error);
  }
  const dailyHistorys = data[pageId].dailyHistorys;
  const todaySummary = dailyHistorys[dailyHistorys.length - 1];
  const totalRemianNumber =
    todaySummary.totalConfirmed -
    todaySummary.totalDeath -
    todaySummary.totalRecovered;
  const totalConfirmed = getActualNumber(
    OFFSET,
    pageId,
    'totalConfirmed',
    todaySummary
  );
  const totalRecovered = getActualNumber(
    OFFSET,
    pageId,
    'totalRecovered',
    todaySummary
  );
  const totalDeath = getActualNumber(
    OFFSET,
    pageId,
    'totalDeath',
    todaySummary
  );
  let totalTested = 0;
  states.forEach(state => {
    totalTested += data[state].statistics[0]['total tested'];
  });
  return (
    <div className='summary'>
      {
        // eslint-disable-next-line
        <a id='summary' className='target'></a>
      }
      <h2 className='ui small header'>Summary data:</h2>
      <Grid columns='equal'>
        <Grid.Column>
          <Statistic color='blue' label='Active' value={totalRemianNumber} />
        </Grid.Column>
        <Grid.Column>
          <NewNumber newNumber={todaySummary.newConfirmed} showDonut={true} />
          <Statistic color='red' label='Total' value={totalConfirmed} />
        </Grid.Column>
        <Grid.Column>
          <NewNumber newNumber={todaySummary.newDeath} />
          <Statistic
            color='grey'
            label='Death'
            value={getActualNumber(OFFSET, pageId, 'totalDeath', todaySummary)}
          />
        </Grid.Column>
        <Grid.Column>
          <NewNumber newNumber={todaySummary.newRecovered} showZero={false} />
          <Statistic color='green' label='Recovered' value={totalRecovered} />
        </Grid.Column>
      </Grid>
      <Table unstackable compact>
        <Table.Header>
          <Table.Row textAlign='center'>
            <Table.HeaderCell>State</Table.HeaderCell>
            <Responsive as='th' minWidth={Responsive.onlyTablet.minWidth}>
              Active
            </Responsive>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.HeaderCell>Death</Table.HeaderCell>
            <Table.HeaderCell>
              Recovered
              <ResponsiveDiv>
                <small>(%)</small>
              </ResponsiveDiv>
            </Table.HeaderCell>
            <Table.HeaderCell>
              Tested
              <ResponsiveDiv>
                <small>(positive %)</small>
              </ResponsiveDiv>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {states.map(state => {
            const dailyHistorys = data[state].dailyHistorys;
            const todaySummary = dailyHistorys[dailyHistorys.length - 1];
            const statistic = data[state].statistics[0];
            const totalTested = statistic
              ? statistic['total tested']
              : 'pending';
            const totalTestedReport = data[state].totalTestedReport;
            const totalConfirmed = getActualNumber(
              OFFSET,
              state,
              'totalConfirmed',
              todaySummary
            );
            const totalRecovered = getActualNumber(
              OFFSET,
              state,
              'totalRecovered',
              todaySummary
            );
            const totalDeath = getActualNumber(
              OFFSET,
              state,
              'totalDeath',
              todaySummary
            );

            return (
              <Table.Row textAlign='center' key={state}>
                <Table.Cell>
                  <NavLink
                    exact
                    activeClassName='active'
                    to={state}
                    onClick={() => setActive(state)}
                  >
                    {state}
                  </NavLink>
                </Table.Cell>
                <Responsive as='td' minWidth={Responsive.onlyTablet.minWidth}>
                  {todaySummary.totalConfirmed -
                    todaySummary.totalRecovered -
                    todaySummary.totalDeath}
                </Responsive>
                <Table.Cell>
                  <strong>{totalConfirmed}</strong>
                  {OFFSET[state] &&
                    typeof OFFSET[state].totalConfirmed === 'number' &&
                    OFFSET[state].totalConfirmed !== 0 && <span>*</span>}
                  <ResponsiveDiv>
                    <NewNumber
                      newNumber={todaySummary.newConfirmed}
                      showDonut={true}
                      className='new-number'
                    />
                  </ResponsiveDiv>
                </Table.Cell>
                <Table.Cell>
                  {totalDeath}{' '}
                  <ResponsiveDiv>
                    <NewNumber
                      newNumber={todaySummary.newDeath}
                      className='new-number'
                    />
                  </ResponsiveDiv>
                </Table.Cell>
                <Table.Cell>
                  {totalRecovered}
                  <ResponsiveDiv>
                    <small className='new-number'>
                      {((totalRecovered / totalConfirmed) * 100).toFixed(0)}%
                    </small>
                  </ResponsiveDiv>
                </Table.Cell>
                <Table.Cell>
                  {totalTestedReport && totalTestedReport.count
                    ? Math.max(
                        totalTestedReport.count,
                        totalTested
                      ).toLocaleString()
                    : totalTested.toLocaleString()}
                  <ResponsiveDiv>
                    <small>
                      ({((totalConfirmed / totalTested) * 100).toFixed(1)}
                      %)
                    </small>
                  </ResponsiveDiv>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
        <Table.Footer>
          <Table.Row textAlign='center'>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Responsive as='th' minWidth={Responsive.onlyTablet.minWidth}>
              {totalRemianNumber.toLocaleString()}
            </Responsive>
            <Table.HeaderCell>
              <strong>{totalConfirmed.toLocaleString()}</strong>
              <ResponsiveDiv>
                <NewNumber
                  newNumber={todaySummary.newConfirmed}
                  showDonut={true}
                  className='new-number'
                />
              </ResponsiveDiv>
            </Table.HeaderCell>
            <Table.HeaderCell>
              {totalDeath.toLocaleString()}
              <ResponsiveDiv>
                <NewNumber
                  newNumber={todaySummary.newDeath}
                  className='new-number'
                />
              </ResponsiveDiv>
            </Table.HeaderCell>
            <Table.HeaderCell>
              {totalRecovered.toLocaleString()}
              <ResponsiveDiv>
                <small className='new-number'>
                  {((totalRecovered / totalConfirmed) * 100).toFixed(0)}%
                </small>
              </ResponsiveDiv>
            </Table.HeaderCell>
            <Table.HeaderCell>
              {totalTested.toLocaleString()}
              <ResponsiveDiv>
                <small>
                  ({((totalConfirmed / totalTested) * 100).toFixed(1)}%)
                </small>
              </ResponsiveDiv>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
      {offsetText && (
        <p style={{ marginTop: '10px' }}>
          <small>
            * Numbers in this national summary page reconciles with{' '}
            <a href='https://www.health.gov.au/resources/publications/coronavirus-covid-19-at-a-glance'>
              Feds number
            </a>
            , states with different number: {offsetText}
          </small>
          <br />
          <small>
            * Reason for that is the federal government reports cases according
            to residency while states generally report cases diagnosed in the
            state.
          </small>
          <br />
          <small>
            * On 3 July, 189 historic cases reported in crew members on board a
            ship were classified as Australian cases and included in national
            NSW totals, dated 15 April.
          </small>
        </p>
      )}
    </div>
  );
};
