import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ImageDialogContextProvider } from './hooks/imageDialogContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './components/basic/i18n';
import { Analytics } from '@vercel/analytics/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ImageDialogContextProvider>
        <I18nextProvider i18n={i18n}>
          <App />
          <Analytics />
        </I18nextProvider>
      </ImageDialogContextProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
