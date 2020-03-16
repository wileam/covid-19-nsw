import React, { useState } from 'react';
import Disqus from 'disqus-react';
import {
  AusSummary,
  Summary,
  Chart,
  DetailTable,
  Footer,
  ShareButton
} from './components';
import { HashRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import { Divider, List } from 'semantic-ui-react';
import { updateTime } from './dateTime.js';
import { data } from './data/index';

import 'semantic-ui-css/semantic.min.css';
import './App.scss';

const disqusShortname = 'covid-19-wileam-com';
const disqusConfig = {
  url: 'https://covid-19.wileam.com/',
  identifier: 'covid-19-wileam-com',
  title: 'CoVid-19 Updates - NSW'
};

const SHOW_AUS_PAGE = localStorage.getItem('SHOW_AUS_PAGE') || true;

const App = () => {
  let defaultPage = SHOW_AUS_PAGE ? 'AUS' : 'NSW';
  let initPageFromURL = window.location.hash.slice(2);
  if (initPageFromURL === '') {
    window.location.hash = '#/' + defaultPage;
    initPageFromURL = defaultPage;
  }
  const [active, setActive] = useState(initPageFromURL);
  const navList = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'NT', 'ACT'];
  if (SHOW_AUS_PAGE) navList.unshift('AUS');
  return (
    <Router>
      <div className='ui container center aligned nav-wrapper'>
        <List link horizontal>
          {navList.map(nav => (
            <List.Item active={active === nav}>
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
      </div>
      <Switch>
        {navList.map(id => (
          <Route path={`${process.env.PUBLIC_URL}/${id}`}>
            <Child id={id} />
          </Route>
        ))}
      </Switch>
    </Router>
  );
};

function getDataById(id) {
  if (id === 'AUS') {
    return data;
  } else {
    return {
      ...data[id],
      source: data.source.filter(d => d.State === id)[0],
      statistics: data.statistics.filter(d => d.State === id)
    };
  }
}

function Child({ id }) {
  const data = getDataById(id);

  return (
    <div className='ui container'>
      <header>
        <h1 className='ui header'>CoVid-19 Updates - {id}</h1>
        <small className='ui small'>Site updated: {updateTime} AEDT</small>
      </header>
      <ShareButton />
      {id === 'AUS' ? (
        <AusSummary id={id} data={data} />
      ) : (
        <Summary
          id={id}
          todaySummarys={data.todaySummarys}
          statistics={data.statistics}
        />
      )}

      {id !== 'AUS' && data.dailyHistorys.length >= 5 && (
        <>
          <Divider />
          <Chart
            id={id}
            dailyHistorys={data.dailyHistorys}
            predicts={data.predicts}
            source={data.source}
            statistics={data.statistics}
          />
        </>
      )}
      <Divider />

      {id !== 'AUS' && <DetailTable id={id} />}

      <Disqus.DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
