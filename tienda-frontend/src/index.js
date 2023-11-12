import React from 'react';
import ReactDOM from 'react-dom';
// Cargar las variables de entorno desde el archivo .env
import { BrowserRouter  } from 'react-router-dom';
import './assets/base.css';
import Main from './DemoPages/Main';
import configureStore from './config/configureStore';
import { Provider } from 'react-redux';


const store = configureStore();
const rootElement = document.getElementById('root');

const renderApp = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter >
        <Component />
      </BrowserRouter >
    </Provider>,
    rootElement
  );
};

renderApp(Main);


