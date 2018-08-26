import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './components/App';
import registerServiceWorker from './sw';

ReactDOM.render(<App></App>, document.getElementById('root'));
registerServiceWorker();