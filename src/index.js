import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import WebFont from 'webfontloader';

const app = () => {
  render(<App />, document.getElementById('root'));
}

WebFont.load({
  google: {
    families: ['Cinzel', 'sans-serif']
  },
  timeout: 1000,
  active: app,
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
