import React, { useState, useEffect } from 'react';
// import Disqus from 'disqus-react';
import {
  AusPage,
  Summary,
  Chart,
  DetailTable,
  Footer,
  ShareButton,
  // Feed,
  // Updates
} from './components';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { Segment, List } from 'semantic-ui-react';
import { Navbar } from './components/navbar/index.jsx';
import { default as states } from './states.json';
import * as moment from 'moment';

import 'semantic-ui-css/semantic.min.css';
import './App.scss';
import { Links } from './components/links';
import { checkStatus, parseJSON } from './utils';

// const disqusShortname = 'covid-19-wileam-com';
// const disqusConfig = {
//   url: 'https://covid-19.wileam.com/',
//   identifier: 'covid-19-wileam-com',
//   title: 'CoVid-19 Updates - Australia'
// };

// function removeHash() {
//   window.history.pushState(
//     '',
//     document.title,
//     window.location.pathname + window.location.search
//   );
// }

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'https://covid-19-au-staging.herokuapp.com/'
    : '/';

let lastestUpdatedAt;

function handleTodaySummary(todaySummary) {
  let ret = todaySummary;
  for (const key in todaySummary) {
    if (todaySummary.hasOwnProperty(key) && todaySummary[key] === -999) {
      // -999 means number not updated, due to db restriction, this is a required number field.
      ret[key] =  '';
    }
  }
  return ret
}

const convertData = responseData => {
  let suburbMapping = responseData[2];
  responseData = { ...responseData[0], ...responseData[1] };
  let apiData = {};
  let pages = ['AUS', ...states];
  for (
    let i = responseData.records.length - 9;
    i < responseData.records.length;
    i++
  ) {
    const record = responseData.records[i];

    const updatedAt = moment(record.updatedAt);
    if (!lastestUpdatedAt) {
      lastestUpdatedAt = updatedAt;
    } else {
      if (updatedAt.isAfter(lastestUpdatedAt)) {
        lastestUpdatedAt = updatedAt;
      }
    }
  }

  for (let i = 0; i < responseData.records.length; i++) {
    const record = responseData.records[i];
    const state = record.state;
    if (!apiData[state]) {
      apiData[state] = {};
      apiData[state].dailyHistorys = [];
    }
    if (record.totalConfirmed !== 0) {
      apiData[state].dailyHistorys.push(record);
    }
  }

  for (let i = 0; i < pages.length; i++) {
    const state = pages[i];
    const dailyHistorys = apiData[state].dailyHistorys;
    const todaySummarys = dailyHistorys[dailyHistorys.length-1];
    apiData[state].todaySummarys = handleTodaySummary(todaySummarys)
  }

  for (const key in responseData.tables) {
    if (
      responseData.tables.hasOwnProperty(key) &&
      key !== 'sponsors' &&
      key !== 'offset'
    ) {
      for (let i = 0; i < pages.length; i++) {
        const state = pages[i];
        apiData[state][key] = responseData.tables[key].filter(
          d => d.State === state
        );
      }
    }
  }

  for (let i = 0; i < pages.length; i++) {
    const state = pages[i];
    apiData[state].predicts = responseData.predicts[state];
  }

  apiData.offset = responseData.tables.offset;

  apiData.NSW.source = {
    casesBySource:
      responseData.nsw.confirmedCasesByLocationAndSource && responseData.nsw.confirmedCasesByLocationAndSource.casesBySource,
    casesBySourceAndDate: responseData.nsw.confirmedCasesByLocationAndSource && responseData.nsw.confirmedCasesByLocationAndSource.casesBySourceAndDate.reverse()
  };
  apiData.NSW.age = responseData.nsw.casesByAge;
  apiData.NSW.location =
  responseData.nsw.confirmedCasesByLocationAndSource && responseData.nsw.confirmedCasesByLocationAndSource.cases;
  apiData.NSW.totalTestedReport = responseData.nsw.totalTestedReport;
  apiData.NSW.confirmedCasesByLocationAndSource =
    responseData.nsw.confirmedCasesByLocationAndSource;
  apiData.NSW.suburbMapping = suburbMapping.nsw;

  return apiData;
};

// const isValid = hash => {
//   return [
//     'summary',
//     'detail',
//     'trending',
//     'community',
//     'tests',
//     'location',
//     'age'
//   ].includes(hash.slice(1));
// };

export const navList = ['AUS', ...states];

const App = () => {
  const [apiData, setApiData] = useState(null);
  // eslint-disable-next-line
  const [error, setError] = useState(null);
  const urls = [baseUrl + 'realtime', baseUrl + 'opendata', baseUrl + 'suburb'];

  useEffect(() => {
    Promise.all(
      urls.map(url =>
        fetch(url)
          .then(checkStatus)
          .then(parseJSON)
          .catch(e => console.error('something went wrong, ', e))
      )
    )
      .then(data => {
        if (data) {
          setApiData(convertData(data));
        }
      })
      // eslint-disable-next-line
  }, []);

  let defaultPage = 'AUS';
  let initPageFromURL = window.location.pathname.slice(1);
  if (initPageFromURL === '' || navList.indexOf(initPageFromURL) === -1) {
    initPageFromURL = defaultPage;
    window.location.pathname = '/' + defaultPage;
  }

  const [active, setActive] = useState(initPageFromURL);

  if (!apiData) {
    return error ? (
      <>
        {(error && error.message) || 'something went wrong'}, please try refresh
        the page.
      </>
    ) : (
      <div id='loading'>
        <div className='loading-icon'>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className='poster'>
          <p>Stay</p>
          <p>Safe</p>
          <p>
            <span>and</span>
          </p>
          <p>wash hands</p>
          <p>Don't panic</p>
        </div>
      </div>
    );
  }
  return (
    <BrowserRouter>
      <List link horizontal className='ui container center aligned navbar'>
        {navList.map(nav => (
          <List.Item active={active === nav} key={nav}>
            <NavLink
              exact
              activeClassName='active'
              to={nav}
              onClick={() => setActive(nav)}
            >
              {nav}
            </NavLink>
          </List.Item>
        ))}
      </List>
      <Switch>
        {navList.map(id => (
          <Route path={`${process.env.PUBLIC_URL}/${id}`} key={id}>
            <Navbar pageId={id}/>
            <Page
              id={id}
              apiData={apiData}
              active={active}
              setActive={setActive}
            />
          </Route>
        ))}
      </Switch>
    </BrowserRouter>
  );
};

function getDataById(id, apiData) {
  if (id === 'AUS') {
    return apiData;
  } else {
    return apiData[id];
  }
}

function Page({ id: pageId, apiData, active, setActive }) {
  useEffect(() => {
    window.document.title = `CoVid-19 in ${pageId}`;
  }, [pageId]);

  const data = getDataById(pageId, apiData);

  return (
    <div className='ui container' style={{ marginTop: '70px' }}>
      <header>
        <h1 className='ui header'>CoVid-19 Updates - {pageId}</h1>
        <small className='ui small'>
          Data updated: {lastestUpdatedAt.fromNow()}
        </small>
      </header>
      {/* <Updates pageId={pageId} active={active} setActive={setActive} /> */}
      <ShareButton />
      {pageId === 'AUS' ? (
        <AusPage
          pageId={pageId}
          data={data}
          active={active}
          setActive={setActive}
        />
      ) : (
        <Summary
          pageId={pageId}
          todaySummarys={data.todaySummarys}
          statistics={data.statistics}
        />
      )}

      {pageId !== 'AUS' && data.dailyHistorys.length >= 5 && (
        <>
          <Chart pageId={pageId} data={data} />
        </>
      )}

      {(pageId === 'NT' || pageId === 'AUS') && (
        <DetailTable id='detail' pageId={pageId} />
      )}

      {pageId !== 'AUS' && (
        <Segment>
          <Links pageId={pageId} />
        </Segment>
      )}

      {/* {id !== 'NT' && (
        <Segment>
          <Feed id={id} />
        </Segment>
      )} */}

      {/* <div style={{ paddingBottom: '70px' }} /> */}

      <Footer pageId={pageId} />

      {/* <div style={{height: '500px'}}>
        <Disqus.DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        />
      </div> */}
    </div>
  );
}

export default App;
