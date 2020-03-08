import React from 'react';
import { Summary, Chart, DetailTable } from './components';
import { Divider } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.scss';

function App() {
  return (
    <div className='ui container'>
      <h1 className='ui header'>NSW CoVid-19 data</h1>
      <Summary />
      <Divider />
      <Chart />
      <Divider />
      <DetailTable />

      <footer>
        <p>
          <small>
            Made by <a href='http://wileam.com/'>Joanna Wu</a>, data source:{' '}
            <a href='https://www.health.nsw.gov.au/Infectious/diseases/Pages/coronavirus.aspx'>
              NSW Health
            </a>
          </small>
        </p>
      </footer>
    </div>
  );
}

export default App;
