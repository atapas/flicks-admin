import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { GitHub, Book, Monitor } from "react-feather";

ReactDOM.render(
  <React.StrictMode>
    <header>
      <a style={{textDecoration: 'none'}} href="#/" className="logo">
        <Monitor color="#00ebff" size={28} />
        <span>Flicks Dashboard</span>
      </a>
      <ul style={{display: 'flex'}}>
        <a
            href="https://flicks.gatsbyjs.io/"
            target="_blank"
            rel="noreferrer"
            title="See flicks"
        >
          <Book color="#ffffff" size={28} />
        </a> { ' '}
        <a
            href="https://github.com/atapas/flicks-admin"
            target="_blank"
            rel="noreferrer"
            title="Browse code"
        >
          <GitHub color="#ffffff" size={28} />
        </a>
      </ul>
    </header>
    <App />
    <footer>Made with ❤️ by <a
            href="https://twitter.com/tapasadhikary"
            target="_blank"
            rel="noreferrer">Tapas Adhikary</a></footer>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
