import React from 'react';
import { Summary, Chart, DetailTable, Footer } from './components';
import { Divider } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.scss';

function App() {
  return (
    <div className='ui container'>
      <header>
        <h1 className='ui header'>CoVid-19 Updates - NSW</h1>
      </header>
      <Summary />
      <Divider />
      <Chart />
      <Divider />
      <DetailTable />

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
