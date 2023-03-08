import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Notifications } from 'react-push-notification';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { subscribeUser } from './subscription';

ReactDOM.render(
  <React.StrictMode>
    <Notifications />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
subscribeUser();
