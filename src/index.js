import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import Main from './Main';

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
