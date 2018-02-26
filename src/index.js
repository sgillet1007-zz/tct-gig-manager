import React from 'react';
import ReactDOM from 'react-dom';
import GigManager from './GigManager';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
  <GigManager
    url='http://localhost:3001/api/gigs'
    pollInterval={700} />,
  document.getElementById('root')
);
