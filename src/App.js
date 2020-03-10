import React from 'react';
import Disqus from 'disqus-react';
import { Summary, Chart, DetailTable, Footer } from './components';
import { Divider } from 'semantic-ui-react';
import { updateTime } from './dateTime.js';

import 'semantic-ui-css/semantic.min.css';
import './App.scss';

const disqusShortname = 'covid-19-wileam-com';
const disqusConfig = {
  url: 'https://covid-19.wileam.com/',
  identifier: 'covid-19-wileam-com',
  title: 'CoVid-19 Updates - NSW'
};

function App() {
  return (
    <div className='ui container'>
      <header>
        <h1 className='ui header'>CoVid-19 Updates - NSW</h1>
        <small className='ui small'>Site updated: {updateTime} AEDT</small>
      </header>
      <Summary />
      <Divider />
      <Chart />
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

export default App;
