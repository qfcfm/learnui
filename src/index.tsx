import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MainFrame from './components/mainfrm';
import reportWebVitals from './reportWebVitals';
import reducers from './store/reducers';

const store = createStore(reducers);
console.log(store.getState())
ReactDOM.render(
  <Provider store={store}>
    <MainFrame />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
