import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './component/main/App';
import registerServiceWorker from './server/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
