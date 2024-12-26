import React from 'react';
import { Provider } from 'react-redux';
import { blogStore } from './store';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppProvider } from './contexts/app.context';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={blogStore}>
    <AppProvider>
      <App />
    </AppProvider>
  </Provider>
);
