import React from 'react';
import ReactDOM from 'react-dom';
import Router from './routes/Router';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import './styles/style.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
