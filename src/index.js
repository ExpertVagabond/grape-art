import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { hydrate, render } from "react-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import i18n (needs to be bundled)
import './i18n';

const sanitizeError = (e) => {
  const msg = e instanceof Error ? e.message : String(e);
  return msg.replace(/\/[^\s]+/g, '[path]').replace(/[A-Za-z0-9]{20,}/g, '[redacted]').slice(0, 200);
};

// Global error boundary for uncaught rendering errors
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.error('Application error:', sanitizeError(error));
  }
  render() {
    if (this.state.hasError) {
      return React.createElement('div', { style: { padding: '2rem', textAlign: 'center' } },
        React.createElement('h2', null, 'Something went wrong'),
        React.createElement('p', null, 'Please refresh the page.')
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<ErrorBoundary><App /></ErrorBoundary>, rootElement);
} else {
  render(<ErrorBoundary><App /></ErrorBoundary>, rootElement);
}
/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
