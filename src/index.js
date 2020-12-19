import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

setTimeout(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
}, 300);
