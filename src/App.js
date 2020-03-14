import React, { useState } from 'react';
import Disqus from 'disqus-react';
import { Summary, Chart, DetailTable, Footer, ShareButton } from './components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from 'react-router-dom';
import { Divider, List } from 'semantic-ui-react';
import { dailyData, predictedData, summaryData } from './data.js';
import { updateTime } from './dateTime.js';

import 'semantic-ui-css/semantic.min.css';
import './App.scss';

const disqusShortname = 'covid-19-wileam-com';
const disqusConfig = {
  url: 'https://covid-19.wileam.com/',
  identifier: 'covid-19-wileam-com',
  title: 'CoVid-19 Updates - NSW'
};

const App = () => {
  const [active, setActive] = useState('Australia');
  const navList = ['Australia', 'NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'NT', 'ACT']
  return (
    <Router>
      <div className='ui container center aligned'>
        <List link horizontal>
          {navList.map(nav => (
            <List.Item as='a' active={active === nav} onClick={() => setActive(nav)}>
              <Link to={nav}>{nav}</Link>
              </List.Item>
          ))}
        </List>
      </div>
      <Switch>
        <Route path='/:id' children={<Child />} />
      </Switch>
      <Child />
    </Router>
  );
};

function getDataById(id) {
  return {
    chartData: {
      dailyData,
      predictedData
    },
    summaryData
  };
}

function Child() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();
  const data = getDataById(id);
  return (
    <div className='ui container'>
      <header>
        <h1 className='ui header'>CoVid-19 Updates - {id || 'Australia'}</h1>
        <small className='ui small'>Site updated: {updateTime} AEDT</small>
      </header>

      <ShareButton id={id} />
      <Page id={id} data={data} />
      <Divider />

      <DetailTable />

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

const Page = ({ data }) => (
  <>
    <Summary data={data.summaryData} />
    <Divider />
    <Chart data={data.chartData} />
  </>
);

export default App;
