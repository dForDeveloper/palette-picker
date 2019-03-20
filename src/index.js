import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import App from './containers/App/App';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';

const devTools = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(rootReducer, devTools);
const provider = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(provider, document.getElementById('root'));